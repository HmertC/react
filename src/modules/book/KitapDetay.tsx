import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Prope } from "../../Prope";
import { bookService } from "../shared/services/book.service";
import { useTranslation } from "react-i18next";

const KitapDetay: React.FC = () => {
    const {t} = useTranslation();
    const { kitid } = useParams<string>();

    const [book, setBook] = useState<Prope>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBook = async () => {
            const response = await bookService.getBook(+kitid!).catch(e => null);
            if (!response || !response.data) {
                return navigate('/kitap');
            }
            setBook(response.data);
        }
        fetchBook();
    }, [kitid]);

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container">
                        <div className="card" style={{ "textAlign": "center" }}>
                            <div className="card-title">
                                <h2 style={{ textAlign: "center" }}>{t('bookDetail')}</h2>
                            </div>
                            <div className="card-body">
                                {book && (<div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID : {book.id}</label>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>{t('bookName')} : {book.name}</label>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>{t('bookDescription')} : {book.description}</label>

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>{t('bookCategory')} : {book.category}</label>
                                        </div>
                                    </div>





                                </div>
                                )}
                                <div className="col-lg-12 mt-3">
                                    <div className="form-group">
                                        <Link to="/kitap" className="btn btn-danger">{t('back')}</Link>
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

export default KitapDetay;