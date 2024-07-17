import { Link, useNavigate} from "react-router-dom"
import logo from './logo.svg';
import { useContext, useEffect, useState } from "react";
import { languageservice } from "./modules/shared/services/language.service";
import { LanguageContext } from "./modules/shared/LanguageContext";
import Translate from "./modules/shared/components/Translate";
import changeLang from './App';
  
const Anasayfa:React.FC=()=>{
const {lang,setLang} =  useContext(LanguageContext);

    const navigate = useNavigate();

    const changeLang = (str:string) => {
        setLang(str);
      }

    const girisekran = () => {
        navigate("/girisekran");
    };

    return(
        <div className="container">
            <header>
                <button onClick={()=>changeLang("tr-TR")}>TR</button>
                <button onClick={()=>changeLang("en-EN")}>EN</button>
            <h2 style={{color:"limegreen"}}>
                <Translate langkey={"Hello"}></Translate>
            </h2>
            <br></br>
            <hr></hr>
            <br></br>
                <a  onClick={()=>girisekran()} className="btn btn-success">
                <Translate langkey={"Login"}></Translate>
                </a>
                <img src={logo} />
               
            </header>
        </div>
    );
}
export default Anasayfa;