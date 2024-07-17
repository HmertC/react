import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, RouterProvider, Outlet } from 'react-router-dom';
import Anasayfa from './Anasayfa';
import Login from './modules/auth/Login';
import KitapDetay from './modules/book/KitapDetay';
import KitapEdit from './modules/book/KitapEdit';
import Registration from './modules/auth/Registration';
import KitapListe from './modules/book/KitapListe';
import KitapEkle from './modules/book/KitapEkle';
import { ProtectedRoute } from './modules/shared/ProtectedRoute';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentList from './modules/student/StudentList';
import StudentDetail from './modules/student/StudentDetail';
import StudentEdit from './modules/student/StudentEdit';
import { StudentLayout } from './modules/shared/layouts/student-layout';
import Studentlistmaterial from './modules/student/studentlistmaterial';
import Studentand from './modules/student/materialui/studentantlist';
import AndTable from './modules/student/materialui/studenand-table';
import { LanguageContext, LanguageContextProvider } from './modules/shared/LanguageContext';

function App() {

  return (
    <BrowserRouter>
    <LanguageContextProvider>
    <div className="App">
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Anasayfa/>}></Route>
          <Route path='/girisekran' element={<Login />}></Route>
          <Route path='/kayitol' element={<Registration />} />
          <Route path='/and' element={<Studentand/>} />
          <Route path='/andtable1' element={<AndTable/>} />

          <Route path='/student/*' element={
   
             <StudentLayout/>

          } />
          <Route path='/kitap' element={
            <ProtectedRoute>
              <KitapListe />
            </ProtectedRoute>
          } />
          <Route path="/kitap/detail/:kitid" element={
            <ProtectedRoute>
              <KitapDetay />
            </ProtectedRoute>
          } />
          <Route path='/kitap/edit/:kitid' element={
            <ProtectedRoute>
              <KitapEdit />
            </ProtectedRoute>
          } />
          {/* <Route path='/kitap/create' element={<KitapEkle />}/> */}
        </Routes>
      
    </div>
    </LanguageContextProvider>
      </BrowserRouter>
  );
}

export default App;
