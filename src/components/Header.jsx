import { FaMoon, FaSun } from "react-icons/fa";
import "../index.css"
import { useNavigate ,NavLink } from "react-router";
import Cookies from "js-cookie"
import { AppContext } from "./Context";
import { useContext, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { IoReorderThree } from "react-icons/io5";

const Header = () => { 
  const navigate = useNavigate()
  const {setAuthenticated} = useContext(AppContext)
  const [showList,setShowList] = useState(false)
  const showListBtn = () => {
    setShowList(!showList)
  }

  const logoutHomePage = () => {
    navigate("/login",{replace:true})
    Cookies.remove("jwt_token")
    setAuthenticated(false)
  }

  return (
    <div className={`header-container-main`} >
      <div className='header-main-container'>
        <div>
          <img className='header-logo logo ' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="next-logo" />
        </div>
        <div className='profile-button-container'>
            <img className='profile-image logout-btn' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" />
            <button className='button-logout logout-btn ' onClick={logoutHomePage}>Logout</button> 
            <IoReorderThree size={26} className="list-sm" onClick={showListBtn} />           
            <LuLogOut className="logout-sm"  onClick={logoutHomePage}/>
        </div>
    </div>
    <div className={`${showList ? null : "hidelist"} list-md`}>
        <ul className={`ul`}>
            <NavLink to="/" className={`link`}><li>Home</li></NavLink>
            <NavLink to="/trending" className={`link`}><li>Trending</li></NavLink>
            <NavLink to="/gaming" className={`link`}><li>Gaming</li></NavLink>
            <NavLink to="/saved" className={`link`}><li>Saved Videos</li></NavLink>
          </ul>
        </div>
    </div>
  )
}

export default Header