import React, { useEffect, useState } from 'react'
import { languageservice } from './services/language.service';

export const LanguageContext = React.createContext<any>({});

export const LanguageContextProvider = ({children}:any) => {
    const [lang, setLang] = useState("tr-TR");
    const [langData, setLangData] = useState<any>(null);

    useEffect(() => {
      languageservice.getlanguage(lang).then(response => {
        setLangData(response.data)
      })   
    }, [lang])


    return(
        <LanguageContext.Provider value={{langData,setLang,lang}}>
            {children}
        </LanguageContext.Provider>
    );
}