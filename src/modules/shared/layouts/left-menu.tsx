import React from 'react'
import { useNavigate } from 'react-router-dom'
import Translate from '../components/Translate';

export const Leftmenu : React.FC<{}>  = () => {
   const navigate = useNavigate();

   const OpenStudentCard =() => {
      navigate("studentcard/");
   };

   const OpenStudentList =() => {
    navigate("studentlist/");
 };
 const OpenStudentMaterial = () => {
  navigate("studentui/");
 };

  return (
    <div>
        <div className="list-group">
            <button onClick={()=>OpenStudentList()} className='btn btn-light'><Translate langkey='StudentList'></Translate></button>
            <button onClick={()=>OpenStudentCard()} className='btn btn-light mt-2'><Translate langkey='StudentCard'></Translate></button>
            <button onClick={()=>OpenStudentMaterial()} className='btn btn-light mt-2'><Translate langkey="StudentList"/> Material-UI</button>
        </div>
    </div>
  )
}

