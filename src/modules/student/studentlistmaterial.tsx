import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../shared/services/student.service';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Button, Link, Pagination } from '@mui/material';
import { FiRefreshCw } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';
import { BiDetail } from 'react-icons/bi';
import { styled, alpha } from '@mui/material/styles'
import TextField from '@mui/material/TextField';
import StudentCreate from './StudentCreate';
import Translate from '../shared/components/Translate';

const Studentlistmaterial: React.FC = () => {
  const [searchInput, setSearchInput] = useState<any>('');
  const { t } = useTranslation();
  const [studentData, setStudentData] = useState<any[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState<any>();
  const [sortColumn, setSortedColumn] = useState('a');
    const [sortOrder, setSortOrder] = useState('a');
  const [pagenum, setPagenum] = useState<number>(1);
  const [pagesi, setPagesi] = useState<number>(10);

  const LoadDetail = (id: number) => {
    navigate("/student/detail/" + id);
  };

  const LoadEdit = (id: number) => {
    navigate("/student/editui/" + id);
  }

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
  //SEARCH FUNCTION
  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = studentData?.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
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
  const fetchData = async () => {
    const studentResponse = await studentService.list(pagenum,pagesi,sortColumn,sortOrder);
    setStudentData(studentResponse.data.map((student: any, i: number) => ({
      ...student,
      order: i + 1
    })));
    setTotalPages(Math.ceil(studentResponse.data.length / 10))
  }
  // console.table(kitapdata);
  useEffect(() => {
    fetchData();
  }, [pagenum,pagesi,sortColumn,sortOrder]);
  if (!studentData) {
    return null;
  }
  const skip = (page - 1) * 10;
  const take = skip + 10;
  
  const nextPage = () => {
    if (pagenum <= 10) {
      setPagenum(pagenum + 1);
    }
  }
  const prevPage = () => {
    if (pagenum >= 0) {
      setPagenum(pagenum - 1);
    }
  }
  //   const prevPage = () => {

  //   }

  //SEARCH ICONNNNN
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));


  return (
    <TableContainer className="container p-0 m-0">
      <div className="card">
        <div className="card-title">
          <h2 className="p-3"><Translate langkey="StudentList"/></h2>
        </div>
        <TextField id="standard-basic" label="Search..." variant="standard" style={{ position: "absolute", right: "0px" }} onChange={(e) => searchItems(e.target.value)} />
        {/* <input  style={{position:"absolute",right:"0px"}} onChange={(e) => searchItems(e.target.value)}
                placeholder='Search...'
            /> */}
        <div className="card-body">
          <div className="divbtn">
            <Button color="success" onClick={() => setShowModal(true)} className="btn btn-success mb-3" style={{ textAlign: "left" }}>
            <Translate langkey="AddNew"/> (+)
            </Button>
          </div>
          <Table id="example" className="table table-bordered">
            <TableHead>
              <TableRow>
                <TableCell colSpan={12} style={{ textAlign: 'left' }}>        
                  {pagenum > 1 && (
                  <span onClick={prevPage} style={{ cursor: 'pointer' }} className="me-2">{'<'}</span>)}
                  <span className='bg-primary'>{pagenum}/{pagenum+1}</span>
                  {(<span onClick={nextPage} style={{ cursor: 'pointer' }} className="ms-2">{'>'}</span>)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Id</TableCell>
                <TableCell><Translate langkey="StudentName"/></TableCell>
                <TableCell><Translate langkey="StudentSurname"/></TableCell>
                <TableCell><Translate langkey="StudentNo"/> </TableCell>
                <TableCell><Translate langkey="StudentBirt"/></TableCell>
                <TableCell><Translate langkey="ACtion"/></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {filteredData.slice(skip, take).map((item: any, i: any) => (
                <TableRow key={item.id} style={{ verticalAlign: 'middle' }}>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.surName}</TableCell>
                  <TableCell>{item.studentNo}</TableCell>
                  <TableCell>{item.birtday}</TableCell>
                  <TableCell>
                    <Button
                      color="success"
                      onClick={() => {
                        LoadEdit(item.id);
                      }}
                      className=" me-3"
                    >
                      <Translate langkey="Update"/> <FiRefreshCw />
                    </Button>
                    <Button
                      color="error"
                      onClick={() => {
                        removefunction(item.id);
                      }}
                      className="me-3"
                    >
                      <Translate langkey="Delete"/> <BsFillTrashFill />
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        LoadDetail(item.id);
                      }}

                    >
                      <Translate langkey="Detail"/> <BiDetail />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                {/* <TableCell colSpan={12} style={{ textAlign: 'right' }}>
                  <Button onClick={prevPage} style={{ cursor: 'pointer' }} className="me-2">{'<'}</Button>
                  {page}/{totalPages}
                  <Button onClick={nextPage} style={{ cursor: 'pointer' }} className="ms-2">{'>'}</Button>
                </TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      {showModal && <StudentCreate onCloseClick={() => { setShowModal(false); fetchData() }} />}
    </TableContainer>
  )
}
export default Studentlistmaterial;