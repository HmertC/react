import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentDetail from "../../student/StudentDetail";
import StudentEdit from "../../student/StudentEdit";
import StudentList from "../../student/StudentList";
import { ProtectedRoute } from "../ProtectedRoute";
import { Leftmenu } from "./left-menu";
import { Navbar } from "./navbar";
import StudentCard from "../../student/studentcard";
import { HomeComent } from "./homecoment";
import Studentlistmaterial from "../../student/studentlistmaterial";
import Stuiedit from "../../student/ui-edit";
import Student_Card from "../../student/components/student-card";
import { LanguageContextProvider } from "../LanguageContext";


export const StudentLayout: React.FC<{}> = () => {
    
    return (
        <LanguageContextProvider>
        <>
            <div className="row p-0">
                <div className="col-12"><Navbar/></div>
                <div className="col-3 bg-white"><Leftmenu/></div>
                <div className="col-9 bg-light">
                    
                    <Routes>
                        
                    <Route path='' element={
                           
                                <HomeComent/>
                    
                        } />    
                        <Route path='/studentlist' element={
                           <ProtectedRoute> <StudentList /> </ProtectedRoute>
                               
                          
                        } />    
                         <Route path='/studentui' element={
                        
                                <Studentlistmaterial />
                          
                        } />    
                         <Route path='/studentcard' element={
                            <ProtectedRoute>
                                <Student_Card />
                            </ProtectedRoute>
                        } />    
                        <Route path="detail/:kitid" element={
                        
                                <StudentDetail />
                           
                        } />
                        {/* <Route path='edit/:kitid' element={
                            <ProtectedRoute>
                                <StudentEdit />
                            </ProtectedRoute>
                        } /> */}
                         <Route path='editui/:kitid' element={
                            <ProtectedRoute>
                                <Stuiedit />
                            </ProtectedRoute>
                        } />
                      
                        </Routes>
                        

                </div>
            </div>
        </>
        </LanguageContextProvider>
    )
}
