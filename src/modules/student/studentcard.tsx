import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { studentService } from '../shared/services/student.service';
import { toast } from 'react-toastify';
import myimage from '../../img/resim.jpg';
import {BsFillTrashFill } from "react-icons/bs";
import {FiRefreshCw } from "react-icons/fi";


const StudentCard: React.FC = () => {

    const [studentData, setStudentData] = useState<any[] | null>(null);
    const [pagenum, setPagenum] = useState<number>(1);
    const [pagesi, setPagesi] = useState<number>(10);
    // const [showModal, setShowModal] = useState(false);
    // const [page, setPage] = useState(1);
    const [sortColumn, setSortedColumn] = useState('a');
    const [sortOrder, setSortOrder] = useState('name');
    const [showCount, setshowCount] = useState(4);
    const navigate = useNavigate();

    // const LoadDetail = (id: number) => {
    //     navigate("/student/detail/" + id);
    //   };

    const LoadEdit = (id: number) => {
        navigate("/student/edit/" + id);
    }

    // const setshowCount = (value) => {
    //    setshowCount(value);
    // }

    const removefunction = async (id: number) => {
        if (window.confirm("Silmek İstiyor Musun ? ")) {
            try {
                await studentService.deleteStudent(id);
                toast.warning("Başarılı bir Şekilde Silindi");
                fetchData();

            } catch (error) {
                toast.error("Student silinemedi");
            }
        }
    };
    // console.log(studentData);
    const fetchData = async () => {
        const studentResponse = await studentService.list(pagenum,pagesi,sortOrder,sortColumn);
        setStudentData(studentResponse.data);
    }
    // console.table(kitapdata);
    useEffect(() => {
        fetchData();
    }, [pagenum,pagesi,sortOrder,sortColumn]);
    if (!studentData) {
        return null;
    }

    return (
        <div >
            <div style={{ display: "inline-block",textAlign:"right" }} >
                <input type='number' value={showCount} onChange={e => setshowCount(parseInt(e.target.value))} className="form-control"></input>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${showCount},1fr)` }}>
                {studentData.map((item: any, i) => (
                    <div className="card ml-2 mt-2 mr-2 mb-2" style={{ width: "12rem;"}}>
                        {/* <img  src={myimage} className="card-img-top w-25 rounded-circle mx-auto d-block mt-2" alt="..." /> */}
                        <div className="card-body">
                            <h5 className="card-title">{item.name} {item.surName} </h5>
                            <p className="card-text">{item.birtday}</p>
                            <p className="card-text">{item.studentNo}</p>
                            <div>
                            <a onClick={() => LoadEdit(item.id)} className="btn btn-warning"><FiRefreshCw/> </a>
                            <a onClick={() => removefunction(item.id)} href="#" className="btn btn-danger"><BsFillTrashFill/> <i className='fas fa-trash'></i></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default StudentCard;
