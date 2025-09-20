import { useContext} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { AppContext } from "./Context";
import { Link } from "react-router";
import { LuDot } from "react-icons/lu";
import { FaSave } from "react-icons/fa";
const Saved = () => {
    const {savedData,lightmode} = useContext(AppContext)
    
    const renderFailureView = () => {
        return (
            <div className="no-saved-video-container">
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="" className="no-saved-video" />
            </div>
        )
    }
    const renderSavedVideos = () => {
        return(
            <div className={`trending-main-video-container ${lightmode?null:"darkMode"}`}>
                <div>
                    <h1 className="trending-heading-logo"><FaSave className="save-icon-trending"/>Saved Videos</h1>
                </div>
                {savedData.map(items=>(
                     <>
                     <Link className="link" to={`/videos/${items.id}`}>
                     <div className={`trending-video-container ${lightmode?null:"darkMode"}` }>
                        <img className='video-thumbnail video-thumbnail-saved' src={items.thumbnailUrl} alt="" />
                        <div className='trending-video-title'>
                            <div>
                                <p className="trending-video-heading">{items.title}</p>
                                <p>{items.channels.name}</p>
                                <div className='views-container'>
                                    <p>{items.viewCount} views</p>
                                    <LuDot/>
                                    <p>{items.publishedAt}</p>
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
        return(
            <div className="trending-vedio-container">
                <Header/>
                <div className="home-page">
                    <Sidebar/>
                    {savedData.length===0 ? renderFailureView() :renderSavedVideos()}   
                </div>
            </div>
        )
}

export default Saved
