import "../index.css"
import { IoCloseSharp, IoSearchOutline } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import {formatDistanceToNow} from "date-fns"
import { Link } from "react-router";
import {useContext, useState } from "react";
import { AppContext } from "./Context";
    
const Video = (props) => {
    const {videoDatas} = props
    const {lightmode} = useContext(AppContext)
    const [close,setClose] = useState(false)
    console.log(close)
    const onSearchValue = (event) => {
        const {searchInput} = props
      searchInput(event.target.value)
        
    }

    const onemty =  () => {
        return(
            <div className="no-data-container"> 
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" className="home-no-data-available" alt="" />
                <h1>Videos Not Available</h1>
            </div>
        )
    }
    
    const closeBanner = () => {
        setClose(true)
    }
    const onHomeVideos = () => {
        const {videoDatas} = props
        
        return(
            <div className={`main-video-container ${lightmode?null:"darkMode"} ${close? "video-home":null}`}>
                {videoDatas.map(items=>(
                 <>
                 <Link to={`/videos/${items.id}`} className="link" > 
                 <div className={`video-container  ${lightmode?null:"darkMode"}`} key={items.id} >
                 <img className='video-thumb' src={items.thumbnailUrl} alt="" />
                 <div className='video-title'>
                    <img className="video-profile-image" src={items.channels.profileImageUrl} alt="" />
                    <div>
                    <p>{items.title}</p>
                    <p>{items.channels.name}</p>
                    <div className='views-container'>
                        <p>{items.viewCount} views</p>
                        <LuDot/>
                        <p>{formatDistanceToNow(new Date(items.publishedAt))}</p>
                    </div>
                    </div>
                 </div>
                 </div>
                 </Link>
                 </>                      
                ))}
            </div>
        )
    }
    return (

      <div className={`video-main-container  ${lightmode?null:"darkMode"}`}>
        <div className={`bannar-container banner hide-sidebar ${lightmode?"dark":"dark"} ${close? "hide-banner":null}`}>
            <div>
            <img className='bannar-logo' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo" />
            <h1 className='bannar-para'>But NXT Watch Premium prepaid plans with UPI</h1>
            <button className='banner-button'>GET IT NOW</button>
            </div>
            <div>
            <h1 onClick={closeBanner}><IoCloseSharp/></h1>
            </div>
        </div>
        
        <div className='video-search-container videos'>
            <div className='search-container'>
            <input type="search" className={` ${lightmode?null:"darkMode"}`} placeholder='Search' onChange={onSearchValue}/><IoSearchOutline className={`search-icon  ${lightmode?null:"darkMode"}`} />
            </div>
            <div>
                {videoDatas.length===0 ? onemty() :onHomeVideos()}
            </div>
        </div>  
      </div>
    )
}

export default Video