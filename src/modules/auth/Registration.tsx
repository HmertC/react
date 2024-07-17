import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import './Auth.css';
import { authService } from "../shared/services/auth.service";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { LanguageContext } from "../shared/LanguageContext";
import Translate from "../shared/components/Translate";
const Registration: React.FC = () => {
  const {lang,setLang} = useContext(LanguageContext);
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const handlerUsernameChange = (value: string) => {
    setName(value);
  }

  const handlerPasswordChange = (value: string) => {
    setPassword(value);
  }

  const handleSave = async () => {
    setIsDisabled(true);
    const response = await authService.register({
      username: username,
      password: password
    }).catch(e => {
      return {success : false};
    })
    if(response.success){
      toast.success('Başarıyla kayıt oldunuz');
      navigate('/girisekran')
    }
    else{
      toast.error('Kayıt İşlemi hatalı...');
      setIsDisabled(false);
    }
  }

  const changeLang = (str: string) => {
    setLang(str);
  }

  return (
    <div>
      <button onClick={() => changeLang("tr-TR")}>TR</button>
      <button onClick={() => changeLang("en-EN")}>EN</button>
      <Fragment>
        <div className="cover" style={{ backgroundColor: "orange" }}>
          <h2><Translate langkey="Register"></Translate></h2>
          <label><Translate langkey="UserName"></Translate></label>
          <input className="inp" onChange={(e) => handlerUsernameChange(e.target.value)} type="text" id="txtName" />
          <br></br>
          <label><Translate langkey="Password"></Translate></label>
          <input className="inp" onChange={(e) => handlerPasswordChange(e.target.value)} type="password" id="txxpassword" />
          <br></br>
          <button onClick={(e) => handleSave()} disabled={isDisabled || !username || !password} className="btn btn-primary"><Translate langkey="Save"></Translate></button>
        </div>
      </Fragment>
    </div>
  );
}
export default Registration;