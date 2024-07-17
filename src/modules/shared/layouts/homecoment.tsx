import { KeyObject } from "crypto"
import { isValue } from "react-calendar/dist/cjs/shared/propTypes"
import Translate from "../components/Translate"
import { useContext } from "react"
import { LanguageContext } from "../LanguageContext"

export const HomeComent : React.FC<{}>  = () => {

   return (
    <div>
      <Translate langkey="Hello"></Translate> {localStorage.getItem("token-info")?.replace(/"/g, '').toUpperCase()}
    </div>
   )
 }
 