import React, { useContext, useState } from "react";
import './Auth.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../shared/services/auth.service";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { LanguageContext } from "../shared/LanguageContext";
import Translate from "../shared/components/Translate";

const Login: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { lang, setLang } = useContext(LanguageContext);


  const changeLang = (str: string) => {
    setLang(str);
  }

  const navigate = useNavigate();
  const handlerUsernameChange = (value: string) => {
    setUsername(value);
  };
  const handlerPasswordChange = (value: string) => {
    setPassword(value);
  };
  const handleLogin = async () => {
    const loginResponse = await authService.login({
      username: username,
      password: password
    }).catch(e => {
      return { success: false }
    });
    console.log(loginResponse);
    if (loginResponse.success) {
      toast.success('Başarıyla giriş yaptınız');
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('token-info', JSON.stringify(username));
      navigate('/student')
    } else {
      toast.error('Kullanıcı adı/şifrenizi kontrol ediniz.');
    }

  }


  const Kayitol = () => {
    navigate("/kayitol");
  }


  return (
    <div>
      <button onClick={() => changeLang("tr-TR")}>TR</button>
      <button onClick={() => changeLang("en-EN")}>EN</button>
      <div className="cover">
        <h1 style={{ textAlign: 'center' }}><Translate langkey="LoginPage"></Translate></h1>
        <label><Translate langkey="UserName"></Translate></label>
        <input type="text" onChange={(e) => handlerUsernameChange(e.target.value)} />
        <label ><Translate langkey="Password"></Translate></label>
        <input type="password" onChange={(e) => handlerPasswordChange(e.target.value)} />

        <button disabled={!username || !password} onClick={() => handleLogin()} className="btn btn-success">
          <Translate langkey={"Login"}></Translate>
        </button>
        <a onClick={() => Kayitol()} className="btn btn-warning">
          <Translate langkey={"Register"}></Translate>
        </a>
      </div>
    </div>
  );
}
export default Login;