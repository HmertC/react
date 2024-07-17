import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bookService } from "../shared/services/book.service";
import KitapEkle from "./KitapEkle";
import { useTranslation } from "react-i18next";
import {toast} from 'react-toastify';

const KitapListe: React.FC = () => {
  const { t } = useTranslation();
  const [kitapdata, setKitapData] = useState<any[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  // const [currentPage, setCurrentPage] = useState(1);
  // const recordsPerPage = 10;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = kitapdata?.slice(firstIndex,lastIndex);

  const LoadDetail = (id: number) => {
    navigate("/kitap/detail/" + id);
  };

  const LoadEdit = (id: number) => {
    navigate("/kitap/edit/" + id);
  }

  const removefunction = async (id: number) => {
    if (window.confirm("Silmek İstiyor Musun ? ")) {
      try {
        await bookService.deleteBook(id);
        toast.warning("Başarılı bir Şekilde Silindi");
        fetchData();

      } catch (error) {
        toast.error("Kitap silinemedi");
      }
    }
  };
  const fetchData = async () => {
    const booksResponse = await bookService.list();
    setKitapData(booksResponse.data.map((book: any, i: number) => ({
      ...book,
      order: i + 1
    })));
    setTotalPages(Math.ceil(booksResponse.data.length / 10))
  }
  // console.table(kitapdata);
  useEffect(() => {
    fetchData();
  }, []);
  if (!kitapdata) {
    return null;
  }
  const skip = (page - 1) * 10;
  const take = skip + 10;
  const nextPage = () => {
    if (page !== totalPages) {
      setPage(p => p + 1)
    }
  }
  const prevPage = () => {
    if (page !== 1) {
      setPage(p => p - 1)
    }
  }
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2 className="p-3">{t('bookList')}</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <a onClick={() => setShowModal(true)} className="btn btn-success mb-3" style={{ textAlign: "left" }}>
              {t('addNew')}
            </a>
          </div>
          <table id="example" className="table table-bordered">
            <thead>
              <tr>
                <td colSpan={6} style={{ textAlign: 'right' }}>
                  <span onClick={prevPage} style={{ cursor: 'pointer' }} className="me-2">{'<'}</span>
                  {page}/{totalPages}
                  <span onClick={nextPage} style={{ cursor: 'pointer' }} className="ms-2">{'>'}</span>
                </td>
              </tr>
              <tr>
                <td>#</td>
                <td>Id</td>
                <td>{t('bookName')}</td>
                <td>{t('bookDescription')}</td>
                <td>{t('bookCategory')}</td>
                <td>{t('actions')}</td>
              </tr>
            </thead>
            <tbody>

              {kitapdata.slice(skip, take).map((item: any, i) => (
                <tr key={item.id} style={{ verticalAlign: 'middle' }}>
                  <td>{item.order}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>
                    <a
                      onClick={() => {
                        LoadEdit(item.id);
                      }}
                      className="btn btn-success me-3"
                    >
                      {t('update')}
                    </a>
                    <a
                      onClick={() => {
                        removefunction(item.id);
                      }}
                      className="btn btn-danger me-3"
                    >
                      {t('delete')}
                    </a>
                    <a
                      onClick={() => {
                        LoadDetail(item.id);
                      }}
                      className="btn btn-primary"
                    >
                      {t('detail')}
                    </a>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} style={{ textAlign: 'right' }}>
                  <span onClick={prevPage} style={{ cursor: 'pointer' }} className="me-2">{'<'}</span>
                  {page}/{totalPages}
                  <span onClick={nextPage} style={{ cursor: 'pointer' }} className="ms-2">{'>'}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <KitapEkle onCloseClick={() => { setShowModal(false); fetchData() }} />}
    </div>
  );


};

export default KitapListe;