import { Link, useParams } from "react-router-dom";
import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentService } from "../shared/services/student.service";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import { FormGroup } from '@mui/material';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button'
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Stuiedit: React.FC = () => {
    // const today = new Date().toISOString().split("T")[0];
    const { t } = useTranslation();
    const [name, setName] = useState<string>("");
    const [surName, setSurname] = useState<string>("");
    const [studentNo, setstudentNo] = useState<number>(0);
    const [birtday, setbirtday] = useState<Value>(new Date());
    const [validation, setValidation] = useState<boolean>(false);
    const [calendarOpen, setcalenderOpen] = useState<boolean>(false);
    const [student, setStudent] = useState<any>({
        id: "-"
    });

    const { kitid } = useParams();
    useEffect(() => {
        const fetchStudent = async () => {
            const response = await studentService.getStudent(+kitid!).catch(e => null);
            if (!response || !response.data) {
                return navigate('/student');
            }
            setName(response.data.name);
            setSurname(response.data.surName);
            setstudentNo(response.data.studentNo);
            setbirtday(new Date(response.data.birtday));
            setStudent(response.data);
        }
        if (!!kitid && !isNaN(+kitid)) {
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
            name: name,
            surname: surName,
            studentNo: studentNo,
            birtday: format(birtday as Date, "yyyy-MM-dd")
        });
        console.log(response);
        navigate('/studentui')
    }
    // const DatePickerButton = forwardRef<any, any>(({ value, onClick }, ref) => (
    //     <button className="btn btn-block btn-light w-100" style={{ textAlign: "left" }} type="button" onClick={onClick} ref={ref}>
    //         {value}
    //     </button>
    // ));
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form onSubmit={handlesubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2 style={{ textAlign: "center" }}>Student Update</h2>
                            </div>
                            <div className="card-body">
                                <div >
                                    <div className="form-group">
                                    <TextField type="string" label="ID" defaultValue={student.id} value={student.id} disabled className="form-control" />
                                        {/* <label>ID</label>
                                        <input value={student.id} disabled className="form-control"></input> */}
                                    </div>
                                </div>

                                <div >
                                    <div className="form-group">
                                        <label>Student Name</label>
                                    <TextField id="outline-required" required type="string" onMouseDown={e => setValidation(true)} onChange={e => setName(e.target.value)} value={student.name} className="form-control" />
                                        {/* <label>Student Name</label>
                                        <input required value={name} onMouseDown={e => setValidation(true)} onChange={e => setName(e.target.value)} className="form-control"></input> */}
                                        {name.length == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
                                    </div>
                                </div>

                                <div >
                                    <div className="form-group">
                                    <label>Student Surname</label>
                                    <TextField type="string"required onMouseDown={e => setValidation(true)} onChange={e => setSurname(e.target.value)} value={student.surName} className="form-control" />
                                        {/* <label>Student Surname</label>
                                        <input required value={surName} onMouseDown={e => setValidation(true)} onChange={e => setSurname(e.target.value)} className="form-control"></input> */}
                                        {surName.length == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
                                    </div>
                                </div>
                                <div >
                                    <div className="form-group">
                                    <label>Student Number</label>
                                    <TextField type="number"  required onMouseDown={e => setValidation(true)} onChange={e => setstudentNo(parseInt(e.target.value))} value={student.studentNo} className="form-control mt-2" />
                                        {/* <label>Student Number</label>
                                        <input type="number" required value={studentNo} onMouseDown={e => setValidation(true)} onChange={e => setstudentNo(parseInt(e.target.value))} className="form-control"></input>
                                        {studentNo == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>} */}
                                    </div>
                                </div>
                                <div >
                                    <div className="form-group mt-2">
                                        <label>Student Birtday</label>
                                        <Button type="button" color="primary"  onClick={() => setcalenderOpen(x => !x)}>{format(birtday as Date, "dd-MM-yyyy")}</Button>
                                        <div style={{ width: 300, maxHeight: calendarOpen ? 1000 : 0, overflowY: "hidden" }}>
                                            <Calendar value={birtday} onChange={(date) => {
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
                                        <Button color="success" className="me-3" type="submit">{t('save')}</Button>
                                        <Button color="error" href="/student/studentui">{t('back')}</Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Stuiedit;