import {createContext, useState } from "react";
import Cookies from "js-cookie"

export const AppContext = createContext()

const ContextProvider = (props) =>{
    const auth = Cookies.get("auths")
    const [authenticated,setAuthenticated] = useState(auth)
    const [savedData,setSavedData] = useState([])
    const [lightmode,setLightMode] = useState(true)
    Cookies.set("auths",authenticated,{expires:12212})
    return(
        <AppContext.Provider value={{lightmode,setLightMode,setSavedData,savedData,setAuthenticated,authenticated}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default ContextProvider

