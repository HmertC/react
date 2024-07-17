import React, { useContext } from 'react'
import { LanguageContext } from '../LanguageContext'

function Translate(params:{langkey:string}) {
    const {langData} = useContext(LanguageContext)
    const value = langData && langData.find((y:any) => y.string_Id === params.langkey);

  return (
    <>{value?value.description:""}</>
  )
}

export default Translate