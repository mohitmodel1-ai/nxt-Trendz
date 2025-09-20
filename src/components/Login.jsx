import {useContext, useState } from "react"
import "../index.css"
import Cookies from "js-cookie"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router"
import { AppContext } from "./Context"

const Login = () => {
    const {setAuthenticated} = useContext(AppContext)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [showpassword,setShowPassword] = useState(false)
    const [showerror,setShowError] = useState("")
    const navigate = useNavigate()
    const onShowPassword = () => {
        setShowPassword(prev=>!prev)
    }
    const onUsername = (event) => {
        setUsername(event.target.value)
    }
    const onPassword = (event) => {
        setPassword(event.target.value)
    }
    const onSuccess = (jwt_token) =>{
        navigate("/",{replace:true})
        Cookies.set('jwt_token',jwt_token, { expires: 30 })
        setAuthenticated(true)
    }
    const LoginUser = async () => {
        const userDetails = {username, password}
        const LoginApiUrl = 'https://apis.ccbp.in/login'
        const options = {
          method: 'POST',
          body: JSON.stringify(userDetails),
        }
        const response = await fetch(LoginApiUrl, options)
        const data = await response.json()

        if(response.ok===false){
            setShowError("**"+data.error_msg)
        }

        if(response.ok===true){
            setShowError("")
            onSuccess(data.jwt_token)
        }
    }
        return (
            <div className="main-container-login">
                <div className="login-container">
                    <div className="image-container">
                        <img src={logo} alt="Logo" className="logo-image"/>
                    </div>
                    <div>
                        <label className="label" htmlFor="username">Username</label><br/>
                        <input className="input" type="text" placeholder="Username" id="username" onChange={onUsername} /><br/>
                        <label className="label" htmlFor="password">Password</label><br/>
                        <input className="input" type={showpassword?"text":"password"} placeholder="Password" id="password" onChange={onPassword}/>
                    </div>
                    <div >
                        <input className="show-password" type="checkbox" id="showpassword" onChange={onShowPassword}/>
                        <label htmlFor="showpassword">show password</label>
                    </div>
                    <div className="login-button-container">
                        <button onClick={LoginUser} className="login-button">
                            Login
                        </button>
                    </div>
                    <div>
                        <p className="error-message">{showerror}</p>
                    </div>
                </div>
            </div>
        )
    }

export default Login

