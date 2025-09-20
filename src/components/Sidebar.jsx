import "../index.css"
import { AiFillHome } from "react-icons/ai";
import { MdLocalFireDepartment } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { NavLink } from 'react-router';
import { useContext } from "react";
import { AppContext } from "./Context";

const Sidebar = () => {
  const {lightmode} = useContext(AppContext)
    return (
      <div className={`sidebar-main-container hide-sidebar ${lightmode?null:"darkMode"}`}>
        <div className={`${lightmode?null:"darkMode"}`}>
            <ul className='ul-list'>
              <NavLink to="/" className={`${lightmode?null:"darkMode"} link`}><li><AiFillHome className='sidebar-icon'/> Home</li></NavLink>
              <NavLink to="/trending" className={`${lightmode?null:"darkMode"} link`}><li><MdLocalFireDepartment className='sidebar-icon'/>Trending</li></NavLink>
              <NavLink to="/gaming" className={`${lightmode?null:"darkMode"} link`}><li><SiYoutubegaming className='sidebar-icon'/>Gaming</li></NavLink>
              <NavLink to="/saved" className={`${lightmode?null:"darkMode"} link`}><li><MdOutlinePlaylistAdd className='sidebar-icon'/>Saved</li></NavLink>  
            </ul>
        </div>
        <div className='contact-container'>
            <h1 className='heading-sidebar'>Contact Us</h1>
            <div className='contact-logos'>
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="facebook" />
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt="twitter" />
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" alt="linkedin" />
            </div>
            <p className='contact-para'>Enjoy! Now to see your channels and recommendations!</p>
        </div>
      </div>
    )
}

export default Sidebar