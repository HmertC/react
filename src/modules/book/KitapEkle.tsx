import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookService } from "../shared/services/book.service";
import { useTranslation } from "react-i18next";
import {toast} from 'react-toastify';

const KitapEkle: React.FC<{ onCloseClick: () => void }> = ({ onCloseClick }) => {
    const {t} = useTranslation();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [validation, setValidation] = useState<boolean>(false);
    const { kitid } = useParams();
    useEffect(() => {
        const fetchBook = async () => {
            const response = await bookService.getBook(+kitid!).catch(e => null);
            if (!response || !response.data) {
                return navigate('/kitap');
            }
            setName(response.data.name);
            setDescription(response.data.description);
            setCategory(response.data.category);
        }
        if (!!kitid && !isNaN(+kitid)) {
            try {
                fetchBook();
            } catch (error) {
                toast.error('Kitap bulunamadı');
                navigate('/kitap');
            }
        }
    }, []);
    const navigate = useNavigate();

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement> | null) => {
        if(e){
            e.preventDefault();
        }

        const response = await bookService.addBook({
            name: name,
            description,
            category: category
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
                                                <h2 style={{ textAlign: "center" }}>{t('bookCreate')}</h2>
                                            </div>
                                            <div className="card-body">

                                                <div >
                                                    <div className="form-group">
                                                        <label>{t('bookName')}</label>
                                                        <input required value={name} onMouseDown={e => setValidation(true)} onChange={e => setName(e.target.value)} className="form-control"></input>
                                                        {name.length == 0 && validation && <span className="text-danger">{t('bookValidation')}</span>}
                                                    </div>
                                                </div>

                                                <div >
                                                    <div className="form-group">
                                                        <label>{t('bookDescription')}</label>
                                                        <input value={description} onChange={e => setDescription(e.target.value)} className="form-control"></input>
                                                    </div>
                                                </div>
                                                <div >
                                                    <div className="form-group">
                                                        <label>{t('bookCategory')}</label>
                                                        <input value={category} onChange={e => setCategory(e.target.value)} className="form-control"></input>
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <div className="form-group">
                                                        <button className="btn btn-success me-3" type="submit">{t('save')}</button>
                                                        <button type="button" onClick={onCloseClick} className="btn btn-danger">{t('back')}</button>
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
export default KitapEkle;