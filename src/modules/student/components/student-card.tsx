import React, { useEffect, useState } from 'react';
// import myimage from '../../../img/resim.jpg';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../../shared/services/student.service';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FiRefreshCw } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';
import cardConfig from '../configcard.json'
import { Button } from '@mui/material';
import Card from './cardlist'
import Translate from '../../shared/components/Translate';
import './cardcontainerstyle.css'

const Student_Card: React.FC = () => {
    const [studentData, setStudentData] = useState<any[] | null>(null);
    const [showCount, setshowCount] = useState();
    const [count , setCount] = useState();
    const [numColums,setNumColumns] = useState(4);
    const [pagenum, setPagenum] = useState<number>(1);
    const [pagesi, setPagesi] = useState<number>(12);

    const updateNumColumns = () => {
        if (window.innerWidth < 200) {
            setNumColumns(1);
          }
        else if (window.innerWidth < 400) {
            setNumColumns(2);
          }
       else if (window.innerWidth < 600) {
            setNumColumns(2);
          }
       else if (window.innerWidth < 950) {
          setNumColumns(3);
        } else {
          setNumColumns(4); 
        }
      };

    const cardContainerStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${numColums}, 1fr)`,
        gap: '10px',
      };

    const navigate = useNavigate();

    // const LoadDetail = (id: number) => {
    //     navigate("/student/detail/" + id);
    //   };

    const LoadEdit = (id: number) => {
        navigate("/student/editui/" + id);
    }

    // const setshowCount = (value) => {
    //    setshowCount(value);
    // }
    useEffect(() => {
        window.addEventListener('resize', updateNumColumns);
        // config.json dosyasını oku
        axios.get("/db.json")
          .then(response => {
            const { count } = response.data;
            setCount(count);
          })
          .catch(error => {
            console.error('Config dosyası okunurken bir hata oluştu:', error);
          });
      }, [numColums]);

    const removefunction = async (id: number) => {
        if (window.confirm("Silmek İstiyor Musun ? ")) {
            try {
                await studentService.deleteStudent(id);
                toast.warning("Başarılı bir Şekilde Silindi");
                fetchData(pagenum,pagesi);

            } catch (error) {
                toast.error("Student silinemedi");
            }
        }
    };
    // console.log(studentData);
    const fetchData = async (pagenum:number,pagesi:number) => {
        const studentResponse = await studentService.list(pagenum,pagesi);
        setStudentData(studentResponse.data);

    }
    // console.table(kitapdata);
    useEffect(() => {
        fetchData(pagenum,pagesi);
    }, [pagenum,pagesi]);
    if (!studentData) {
        return null;
    }

    const loadmore = () => {
        setPagesi(pagesi + 12);
        fetchData(pagenum,pagesi);
    }

    return (
     <div className='row'>
        <div style={cardContainerStyle}>
            {studentData.map((item: any) => (
                <Card 
                key={item.id}
                item={item}
                onEdit={LoadEdit}
                onRemove={removefunction}
                />
            ))}
            </div>
            <div style={{textAlign:"center"}}>
                <Button className='mt-2' variant='contained' onClick={loadmore}><Translate langkey='LoadMore' /></Button>
            </div>
        </div>

    );
  };
export default Student_Card;





            //    <div className=''>
            //    <div className="card mt-3" style={{ textAlign: "center" }}>
            //        <img src={myimage} className="card-img-top w-25 rounded-circle mx-auto d-block mt-2" alt="..." />
            //        <div className="card-body">
            //            <h5 className="card-title">{item.name} {item.surName} </h5>
            //            <p className="card-text">{item.birtday}</p>
            //            <p className="card-text">{item.studentNo}</p>
            //            <div style={{ textAlign: "right" }}>
            //                <a onClick={() => LoadEdit(item.id)} className="btn btn-warning"><FiRefreshCw/> </a>
            //                <a onClick={() => removefunction(item.id)} href="#" className="btn btn-danger"><BsFillTrashFill/></a>
            //            </div>
            //        </div>
            //    </div>
            // </div> 
