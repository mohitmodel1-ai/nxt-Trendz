import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import Cookies from "js-cookie"
import ReactPlayer from "react-player"
import "../index.css"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { LuDot } from "react-icons/lu";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { AppContext } from "./Context"


const VideoDetails = () => {
  const {setSavedData,savedData,lightmode} = useContext(AppContext)
  const {id} = useParams()
  const [date,setDate] = useState("")
  const [videosData,setVideosData] = useState({})
  const [likeActive,setLikeActive] = useState(false)
  const [DislikeActive,setDisLikeActive] = useState(false)
  const saveVedio = (item) => {
    let presentData = false
    savedData.map((prodect)=>{
      if(prodect.id===item.id){
        presentData = true
      }
    })
    if(!presentData){
      setSavedData(prev=>[...prev,item])
      presentData = false
      
    }
  }

  const onConvertObjectCase = async (data) => {
    const datas = data.video_details
    const updatedVideoDatas = {
      channels:{
        name:datas.channel.name,
        profileImageUrl:datas.channel.profile_image_url,
        subscriberCount:datas.channel.subscriber_count,
    },
    description:datas.description,
    id:datas.id,
    publishedAt:datas.published_at,
    thumbnailUrl:datas.thumbnail_url,
    title:datas.title,
    videoUrl:datas.video_url,
    viewCount:datas.view_count
    }
    setVideosData(updatedVideoDatas)
  }

  useEffect(()=>{
    const getData = async () => {
                const jwtToken = Cookies.get("jwt_token") 
                const url = `https://apis.ccbp.in/videos/${id}`
                const options = {
                    headers:{
                        Authorization:`Bearer ${jwtToken}`,
                    },
                    method:"GET",
                }
                const response = await fetch(url,options)
                const data = await response.json()
                const duration = await data.video_details.published_at
                if(response.ok){
                  onConvertObjectCase(data)
                  setDate(duration)
                }
            }
            getData()
  },[id])

  const onViewVideoDetals = () => {
    const setLike = () => {
      if(DislikeActive===true){
        setDisLikeActive(false)
      }
      setLikeActive(true)
    }
    const setDislike = () => {
      if(likeActive===true){
        setLikeActive(false)
      }
      setDisLikeActive(true)
    }
    
    return (
      <div className={`video-details-container ${lightmode ? null:"darkMode"}`}>
        <div className="player-xl">
        <ReactPlayer  url={videosData.videoUrl} controls={true} width="100%" height="100%" />
        </div>
        <div className="player-md">
        <ReactPlayer  url={videosData.videoUrl} controls={true} width="100%" height="96%" />
        </div>
        <div className="video-container">
          <p>{videosData.title}</p>
          <div className='like-container'>
            <div className="like-info-container">
            <p>{videosData.viewCount} views</p>
            <LuDot/>
            <p>{date}</p>
            </div>
            <div className="like-info-container">
              <p className={`like-para ${likeActive?"active-like":null}`} onClick={setLike}>Like <AiOutlineLike className="like "/></p>
              <p className={`like-para ${DislikeActive?"active-like":null}`}  onClick={setDislike}>Dislike <AiTwotoneDislike className="like" /></p>
              <p className="like-para save" onClick={()=>saveVedio(videosData)}>Save <FaRegSave className="like"/></p>
            </div>
          </div>
          <hr />
          
        </div>
      </div>
    )
  }

  return (
    <div className="trending-vedio-container">
                <Header/>
                
                <div className="home-page">
                    <Sidebar/>
                    {onViewVideoDetals()}
                </div>
                
            </div>
  )
}

export default VideoDetails