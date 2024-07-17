import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { stud } from "../../Prope";
import { studentService } from "../shared/services/student.service";
import { useTranslation } from "react-i18next";
import Translate from "../shared/components/Translate";

const StudentDetail: React.FC = () => {
    const {t} = useTranslation();
    const { kitid } = useParams<string>();

    const [student, setstudent] = useState<stud>();
    const navigate = useNavigate();

    // console.log(student);

    useEffect(() => {
        const fetchStudent = async () => {
            const response = await studentService.getStudent(+kitid!).catch(e => null);
            if (!response || !response.data) {
                return navigate('/studentlist');
            }
            setstudent(response.data);
        }
        fetchStudent();
    }, [kitid]);

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container">
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2 style={{ textAlign: "center" }}>Student Detay</h2>
                            </div>
                            <div className="card-body">
                                {student && (<div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID : {student.id}</label>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label><Translate langkey="StudentName"/> : {student.name}</label>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label><Translate langkey="StudentSurname"/> : {student.surName}</label>

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label><Translate langkey="StudentNo"/> : {student.studentNo}</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label><Translate langkey="StudentBirt"/> : {student.birtday}</label>
                                        </div>
                                    </div>
                                </div>
                                )}
                                <div className="col-lg-12 mt-3">
                                    <div className="form-group">
                                        <Link to="/student/studentlist" className="btn btn-danger"><Translate langkey="Back"/></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>




        // -------------------------------------------------------------
        // <div>
        //   <div className="card" style={{ textAlign: "left" }}>
        //     <div className="card-title">
        //       <h2>Kitap Detayları</h2>
        //     </div>
        //     <div className="card-body">
        //     {kitapdata && (
        //     <div>
        //       <h2>
        //         Kitap Adı : {kitapdata.name} ({kitapdata.id})
        //       </h2>
        //       <h3>Diğer Detaylar</h3>
        //       <h5>Açıklama : {kitapdata.description}</h5>
        //       <h5>Statu : {kitapdata.status}</h5>
        //       <Link to="/" className="btn btn-danger">Listeye Geri Dön</Link>
        //     </div>
        //   )}
        //     </div>
        //   </div>


        // </div>
    );
};

export default StudentDetail;