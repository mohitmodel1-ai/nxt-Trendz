import { useContext, useEffect, useState } from "react";
import "../index.css"
import Cookies from "js-cookie"
import { formatDistanceToNow } from "date-fns";
import { LuDot } from "react-icons/lu";
import { MdLocalFireDepartment } from "react-icons/md";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router";
import { AppContext } from "./Context";

const Trending = () => {
    const [trendingvediosdata,setTrendingvediosdata] = useState([])
    const {lightmode} = useContext(AppContext)
    const onTrendingVedios = () => {
            return(
                <div className={`trending-main-video-container  ${lightmode?null:"darkMode"}`}>
                    <div>
                        <h1 className="trending-heading-logo"><MdLocalFireDepartment className="fire-icon-trending"/>Trending</h1>
                    </div>
                    {trendingvediosdata.map(items=>(
                     <>
                     <Link className="link" to={`/videos/${items.id}`}>
                     <div className={`trending-video-container  ${lightmode?null:"darkMode"}`}>
                        <img className='video-thumbnail' src={items.thumbnailUrl} alt="" />
                        <div className='trending-video-title trending-video-content'>
                            <div>
                                <p className="trending-video-heading">{items.title}</p>
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

    const onConvertObjectCase = (data) => {
        const updatedVideoDatas = data.videos.map(eachItems=>({
            channels:{
                name:eachItems.channel.name,
                profileImageUrl:eachItems.channel.profile_image_url
            },
            id:eachItems.id,
            publishedAt:eachItems.published_at,
            thumbnailUrl:eachItems.thumbnail_url,
            title:eachItems.title,
            viewCount:eachItems.view_count

    }))
    setTrendingvediosdata(updatedVideoDatas)
}
    useEffect(()=>{
        const getData = async () => {
            const jwtToken = Cookies.get("jwt_token") 
            const url = `https://apis.ccbp.in/videos/trending`
            const options = {
                headers:{
                    Authorization:`Bearer ${jwtToken}`,
                },
                method:"GET",
    
            }
            const response = await fetch(url,options)
            const data = await response.json()
            if(response.ok===true){
                onConvertObjectCase(data)
            }
            
        }
        getData()
    },[])
    
        return(
            <div className="trending-vedio-container">
                <Header/>
                <div className="home-page">
                    <Sidebar/>
                    {onTrendingVedios()}
                </div>
                
            </div>
        )
}

export default Trending

