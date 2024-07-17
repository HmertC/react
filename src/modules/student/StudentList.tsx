import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { studentService } from "../shared/services/student.service";
import StudentCreate from "./StudentCreate";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { BsFillTrashFill } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { BiDetail } from 'react-icons/bi';
import StudentEdit from "./StudentEdit";
import Translate from "../shared/components/Translate";


const StudentList: React.FC = () => {
  const [searchInput, setSearchInput] = useState<any>('');
  const { t } = useTranslation();
  const [studentData, setStudentData] = useState<any[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState<any>();
  const [sortColumn, setSortedColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [pagenum, setPagenum] = useState<number>(1);
  const [pagesi, setPagesi] = useState<number>(10);

  const LoadDetail = (id: number) => {
    navigate("/student/detail/" + id);
  };

  const LoadEdit = (id: number) => {
    setSelectedStudentId(id);
    setEditModalOpen(true);
  }

  const removefunction = async (id: number) => {
    if (window.confirm("Silmek İstiyor Musun ? ")) {
      try {
        await studentService.deleteStudent(id);
        toast.warning("Başarılı bir Şekilde Silindi");
        fetchData(1, 10, "", "");

      } catch (error) {
        toast.error("Student silinemedi");
      }
    }
  };

  //SEARCH FUNCTION
  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue)
    if (searchInput !== '' && searchValue.length >= 3) {
      // const filteredData = studentData?.filter((item) => {
      //     return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      // })
      // setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(studentData);
    }
  };
  //DATA FİLTER
  const filteredData: any = studentData?.filter((item) => {
    return Object.values(item).join(' ').toLowerCase().includes(searchInput.toLowerCase());
  });

  // console.log(studentData);
  const fetchData = async (pagenum: number, pagesi: number, sortOrder?: string, sortColumn?: string) => {
    const studentResponse = await studentService.list(pagenum, pagesi, sortOrder, sortColumn);
    setStudentData(studentResponse.data.map((student: any, i: number) => ({
      ...student,
      order: i + 1
    })));
    setTotalPages(Math.ceil(studentResponse.data.length / pagesi + 1));
  }
  // console.table(kitapdata);
  useEffect(() => {
    fetchData(pagenum, pagesi, sortOrder, sortColumn);
  }, [pagenum, pagesi, sortOrder, sortColumn]);


  if (!studentData) {
    return null;
  }
  const skip = (page - 1) * 10;
  const take = skip + 10;

  const nextPage = () => {
    if (pagenum <= 10) {
      setPagenum(pagenum + 1);
      fetchData(pagenum, pagesi, sortOrder, sortColumn);
    }
  }
  const prevPage = () => {
    if (pagenum >= 0) {
      setPagenum(pagenum - 1);
      fetchData(pagenum, pagesi, sortOrder, sortColumn);
    }
  }

  const handlerSort = (col: string, str: string) => {
    setSortedColumn(str);
    setSortOrder(col);
  };


  // const handlerSort = (col: string) => {
  //   if (sortOrder === "ASC") {
  //     const sort = [...filteredData].sort((a: any, b: any) => a[col] > b[col] ? 1 : -1);
  //     setFilteredResults(sort);
  //     setSortOrder("DSC");
  //   }
  //   if (sortOrder === "DSC") {
  //     const sort = [...filteredData].sort((a: any, b: any) => a[col] < b[col] ? 1 : -1);
  //     setFilteredResults(sort);
  //     setSortOrder("ASC");
  //   }
  // };

  return (
    <div className="container p-0 m-0">
      <div className="card">
        <div className="card-title">
          <h2 className="p-3"> <Translate langkey="StudentList"></Translate></h2>
        </div>
        <input style={{ position: "absolute", right: "0px" }} onChange={(e) => searchItems(e.target.value)}
          placeholder='Search...'
        />
        <div className="card-body">
          <div className="divbtn">
            <a onClick={() => setCreateModalOpen(true)} className="btn btn-success mb-3" style={{ textAlign: "left" }}>
              <Translate langkey="AddNew" /> (+)
            </a>
          </div>
          <table>
          </table>
          <table id="example" className="table table-bordered">
            <thead>
              <tr>
                <td colSpan={12} style={{ textAlign: 'right' }}>
                  {pagenum > 1 && (
                    <span onClick={prevPage} style={{ cursor: 'pointer' }} className="me-2">{'<'}</span>)}
                  {pagenum}/{pagenum+1}
                  {(<span onClick={nextPage} style={{ cursor: 'pointer' }} className="ms-2">{'>'}</span>)}
                </td>
              </tr>
              <tr>
                <td>#</td>
                <td>Id</td>
                <td><Translate langkey="StudentName" />
                  {sortColumn === '' && (
                    <a type="button" onClick={() => { handlerSort('ASC', 'name') }} style={{ width: 1, height: 1 }}>
                      &#8679;
                    </a>
                  )}
                  {sortOrder == 'DESC' && (<a type="button" onClick={() => { handlerSort('ASC', 'name') }} style={{ width: 1, height: 1 }}>
                     &#8679;
                     </a>)}
                  {sortOrder == 'ASC' && (<a type="button" onClick={() => { handlerSort('DESC', 'name') }} style={{ width: 1, height: 1 }}>
                     &#8681;
                     </a>)}
                </td>
                <td>
                  <Translate langkey="StudentSurname" />
                  {sortColumn === '' && (
                    <a type="button" onClick={() => { handlerSort('ASC', 'surname') }} style={{ width: 1, height: 1 }}>
                      &#8679;
                    </a>
                  )}
                  {sortOrder == 'DESC' && (<a type="button" onClick={() => { handlerSort('ASC', 'surname') }} style={{ width: 1, height: 1 }}>
                     &#8679;
                     </a>)}
                  {sortOrder == 'ASC' && (<a type="button" onClick={() => { handlerSort('DESC', 'surname') }} style={{ width: 1, height: 1 }}>
                     &#8681;
                     </a>)}
                </td>
                <td><Translate langkey="StudentNo" /></td>
                <td><Translate langkey="StudentBirt" /></td>
                <td><Translate langkey="Action" /></td>
              </tr>
            </thead>
            <tbody>

              {filteredData.slice(skip, take).map((item: any, i: any) => (
                <tr key={item.id} style={{ verticalAlign: 'middle' }}>
                  <td>{item.order}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.surName}</td>
                  <td>{item.studentNo}</td>
                  <td>{item.birtday}</td>
                  <td>
                    <a
                      onClick={() => {
                        LoadEdit(item.id);
                      }}
                      className="btn btn-success me-3"
                    >
                      <Translate langkey="Update" /><FiRefreshCw />
                    </a>
                    <a
                      onClick={() => {
                        removefunction(item.id);
                      }}
                      className="btn btn-danger me-3"
                    >
                      <Translate langkey="Delete" /> <BsFillTrashFill />
                    </a>
                    <a
                      onClick={() => {
                        LoadDetail(item.id);
                      }}
                      className="btn btn-primary"
                    >
                      <Translate langkey="Detail" /><BiDetail />
                    </a>
                  </td>
                </tr>
              ))}
              {/* <tr>
                <td colSpan={12} style={{ textAlign: 'right' }}>
                  <span onClick={prevPage} style={{ cursor: 'pointer' }} className="me-2">{'<'}</span>
                  {page}/{totalPages}
                  <span onClick={nextPage} style={{ cursor: 'pointer' }} className="ms-2">{'>'}</span>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      {createModalOpen && <StudentCreate onCloseClick={() => { setCreateModalOpen(false); fetchData(pagenum, pagesi, sortOrder, sortColumn) }} />}
      {editModalOpen && <StudentEdit studentId={selectedStudentId} onCloseClick={() => { setEditModalOpen(false); fetchData(pagenum, pagesi, sortOrder, sortColumn) }} />}
    </div>
  );


};

export default StudentList;