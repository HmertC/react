import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentService } from "../shared/services/student.service";
import { useTranslation } from "react-i18next";
import {toast} from 'react-toastify';
import Calendar from "react-calendar";
import { format } from "date-fns";
import Translate from "../shared/components/Translate";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const StudentCreate: React.FC<{ onCloseClick: () => void }> = ({ onCloseClick }) => {
    const today = new Date().toISOString().split("T")[0];
    const {t} = useTranslation();
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [studentNo, setstudentNo] = useState<number>(0);
    const [birtday, setbirtday] = useState<Value>(new Date());
    const [calendarOpen, setcalenderOpen] = useState<boolean>(false);
    const [validation, setValidation] = useState<boolean>(false);

    const navigate = useNavigate();

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement> | null) => {
        if(e){
            e.preventDefault();
        }
        // if (e) {
        //     const selected: string = e.target.value;
        //     if (selected < today) {
        //       setbirtday(today);
        //     } else {
        //       setbirtday(selected);
        //     }
        //   }
        const response = await studentService.addStudent({
            name: name,
            surname:surname,
            studentNo: studentNo,
            birtday:format(birtday as Date, "yyyy-MM-dd")
        });
        console.log(response);
        onCloseClick();
    }
    return (
        <div>
            <div className="modal fade show" role="dialog" style={{display:'block'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="offset-lg-3 col-lg-6">
                                    <form onSubmit={handlesubmit}>
                                        <div className="card" style={{ "textAlign": "left" ,border:'none'}}>
                                            <div className="card-title">
                                                <h2 style={{ textAlign: "center" }}><Translate langkey='StudentCreate' /></h2>
                                            </div>
                                            <div className="card-body">

                                                <div >
                                                    <div className="form-group">
                                                        <label><Translate langkey='StudentName'/></label>
                                                        <input required maxLength={30} value={name} onMouseDown={e => setValidation(true)} onChange={e => setName(e.target.value)} className="form-control"></input>
                                                        {name.length == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
                                                    </div>
                                                </div>

                                                <div >
                                                    <div className="form-group">
                                                        <label><Translate langkey="StudentSurname" /></label>
                                                        <input value={surname} maxLength={30} onChange={e => setSurname(e.target.value)} className="form-control"></input>
                                                        {surname.length == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
                                                    </div>
                                                </div>
                                                <div >
                                                    <div className="form-group">
                                                        <label><Translate langkey="StudentNo"/></label>
                                                        <input type="number" value={studentNo} onChange={e => setstudentNo(parseInt(e.target.value))} className="form-control"></input>
                                                        {/* {studentNo == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>} */}
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
    );
}
export default StudentCreate;