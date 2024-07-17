import { Link, useParams } from "react-router-dom";
import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentService } from "../shared/services/student.service";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import Translate from "../shared/components/Translate";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const StudentEdit: React.FC<{ onCloseClick: () => void, studentId: number }> = ({ onCloseClick,studentId }) => {
    // const today = new Date().toISOString().split("T")[0];
    const { t } = useTranslation();
    const [name, setName] = useState<string>("");
    const [surName, setSurname] = useState<string>("");
    const [studentNo, setstudentNo] = useState<number>(0);
    const [birtday, setbirtday] = useState<Value>(new Date());
    const [validation, setValidation] = useState<boolean>(false);
    const [calendarOpen, setcalenderOpen] = useState<boolean>(false);
    const [student, setStudent] = useState<any>({
        id:"-"
    });

    
    useEffect(() => {
        const fetchStudent = async () => {
            const response = await studentService.getStudent(+studentId!).catch(e => null);
            if (!response || !response.data) {
                return navigate('/student');
            }
            setName(response.data.name);
            setSurname(response.data.surName);
            setstudentNo(response.data.studentNo);
            setbirtday(new Date(response.data.birtday));
            setStudent(response.data);
        }
        if (!!studentId && !isNaN(+studentId)) {
            try {
                fetchStudent();
            } catch (error) {
                toast.error('Öğrenci bulunamadı');
                navigate('/student');
            }
        }
    }, []);

    const navigate = useNavigate();

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const response = await studentService.updateStudent({
            id: student?.id,
            name: student.name,
            surname: student.surName,
            studentNo: student.studentNo,
            birtday: format(student.birtday as Date, "yyyy-MM-dd")
        });
        console.log(response);
        navigate('/student')
    }
    // const DatePickerButton = forwardRef<any, any>(({ value, onClick }, ref) => (
    //     <button className="btn btn-block btn-light w-100" style={{ textAlign: "left" }} type="button" onClick={onClick} ref={ref}>
    //         {value}
    //     </button>
    // ));
    return (

        <div>
            <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="offset-lg-3 col-lg-6">
                                    <form onSubmit={handlesubmit}>
                                        <div className="card" style={{ "textAlign": "left" }}>
                                            <div className="card-title">
                                                <h2 style={{ textAlign: "center" }}><Translate langkey="StudentUpdate"/></h2>
                                            </div>
                                            <div className="card-body">
                                                <div >
                                                    <div className="form-group">
                                                        <label>ID</label>
                                                        <input value={student.id} disabled className="form-control"></input>
                                                    </div>
                                                </div>
                                                <div >
                                                    <div className="form-group">
                                                        <label><Translate langkey="StudentName"/></label>
                                                        <input required value={student.name} onMouseDown={e => setValidation(true)} onChange={e => setName(e.target.value)} className="form-control"></input>
                                                        {name.length == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
                                                    </div>
                                                </div>
                                                <div >
                                                    <div className="form-group">
                                                        <label><Translate langkey="StudentSurname"/></label>
                                                        <input required value={student.surName} onMouseDown={e => setValidation(true)} onChange={e => setSurname(e.target.value)} className="form-control"></input>
                                                        {surName.length == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
                                                    </div>
                                                </div>
                                                <div >
                                                    <div className="form-group">
                                                        <label><Translate langkey="StudentNo"/></label>
                                                        <input type="number" required value={studentNo} onMouseDown={e => setValidation(true)} onChange={e => setstudentNo(parseInt(e.target.value))} className="form-control"></input>
                                                        {studentNo == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
                                                    </div>
                                                </div>
                                                <div >
                                                    <div className="form-group mt-2">
                                                        <label><Translate langkey="StudentBirt"/></label>
                                                        <button type="button" className="btn btn-light" onClick={() => setcalenderOpen(x => !x)}>{format(birtday as Date, "dd-MM-yyyy")}</button>
                                                        <div style={{ width: 300, maxHeight: calendarOpen ? 1000 : 0, overflowY: "hidden" }}>
                                                            <Calendar maxDate={new Date()} value={birtday} onChange={(date) => {
                                                                setbirtday(date);
                                                                setcalenderOpen(false)
                                                            }} />
                                                        </div>
                                                        {/* <input type="date"  required value={birtday} onChange={e => setbirtday(e.target.value)} className="form-control"></input> */}
                                                        {/* <DatePicker endDate={new Date()} customInput={<DatePickerButton/>} className="form-control" dateFormat="dd-MM-yyyy" selected={birtday} onChange={(date)=>setbirtday(date!)}/> */}
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <div className="form-group">
                                                        <button className="btn btn-success me-3" type="submit"><Translate langkey="Save"/></button>
                                                        <button type="button" onClick={onCloseClick} className="btn btn-danger"><Translate langkey="Back"/></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        // <div>
        //     <div className="row">
        //         <div className="offset-lg-3 col-lg-6">
        //             <form onSubmit={handlesubmit}>
        //                 <div className="card" style={{ "textAlign": "left" }}>
        //                     <div className="card-title">
        //                         <h2 style={{ textAlign: "center" }}>Student Update</h2>
        //                     </div>
        //                     <div className="card-body">
        //                         <div >
        //                             <div className="form-group">
        //                                 <label>ID</label>
        //                                 <input value={student.id} disabled className="form-control"></input>
        //                             </div>
        //                         </div>

        //                         <div >
        //                             <div className="form-group">
        //                                 <label>Student Name</label>
        //                                 <input required value={name} onMouseDown={e => setValidation(true)} onChange={e => setName(e.target.value)} className="form-control"></input>
        //                                 {name.length == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
        //                             </div>
        //                         </div>

        //                         <div >
        //                             <div className="form-group">
        //                                 <label>Student Surname</label>
        //                                 <input required value={surName} onMouseDown={e => setValidation(true)} onChange={e => setSurname(e.target.value)} className="form-control"></input>
        //                                 {surName.length == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
        //                             </div>
        //                         </div>
        //                         <div >
        //                             <div className="form-group">
        //                                 <label>Student Number</label>
        //                                 <input type="number" required value={studentNo} onMouseDown={e => setValidation(true)} onChange={e => setstudentNo(parseInt(e.target.value))} className="form-control"></input>
        //                                 {studentNo == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
        //                             </div>
        //                         </div>
        //                         <div >
        //                             <div className="form-group mt-2">
        //                                 <label>Student Birtday</label>
        //                                 <button type="button" className="btn btn-light" onClick={() => setcalenderOpen(x => !x)}>{format(birtday as Date, "dd-MM-yyyy")}</button>
        //                                 <div style={{ width: 300, maxHeight: calendarOpen ? 1000 : 0, overflowY: "hidden" }}>
        //                                     <Calendar value={birtday} onChange={(date) => {
        //                                          setbirtday(date);
        //                                          setcalenderOpen(false)
        //                                     }} />
        //                                 </div>
        //                                 {/* <input type="date"  required value={birtday} onChange={e => setbirtday(e.target.value)} className="form-control"></input> */}
        //                                 {/* <DatePicker endDate={new Date()} customInput={<DatePickerButton/>} className="form-control" dateFormat="dd-MM-yyyy" selected={birtday} onChange={(date)=>setbirtday(date!)}/> */}
        //                             </div>
        //                         </div>

        //                         <div className="mt-3">
        //                             <div className="form-group">
        //                                 <button className="btn btn-success me-3" type="submit">{t('save')}</button>
        //                                 <Link to="/student/studentlist" className="btn btn-danger">{t('back')}</Link>
        //                             </div>
        //                         </div>

        //                     </div>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    );
}
export default StudentEdit;