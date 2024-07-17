import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { LanguageContext } from "../LanguageContext";
import Translate from "../components/Translate";

export const Navbar: React.FC<{}> = () => {
    const {lang,setLang} = useContext(LanguageContext);
    const navigate = useNavigate();


    const OpenHome = () => {
        navigate("/student")
    }
    const changeLang = (str:string) => {
        setLang(str);
    }

    const ClickLogOut = () => {
        localStorage.clear();
        navigate("/girisekran")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-success">
                <a onClick={() => OpenHome()} className="navbar-brand text-white" href="#">Student API</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div>
                    <button onClick={()=> changeLang("tr-TR")}>
                        TR
                    </button>
                    <button onClick={()=> changeLang("en-EN")}>
                        EN
                    </button>
                </div>
                <div style={{ justifyContent: "flex-end" }} className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link text-white" href="#">{localStorage.getItem("token-info")?.replace(/"/g, '').toLocaleUpperCase()}</a>
                        </li>
                        <li className="nav-item" >
                            <a onClick={() => ClickLogOut()} className="nav-link text-white" href="#"><Translate langkey='LogOut'/></a>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )

}