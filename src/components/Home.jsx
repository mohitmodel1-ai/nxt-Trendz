import "../index.css"
import Cookies from "js-cookie"
import Header from "./Header";
import Sidebar from "./Sidebar";
import Video from "./Video";
import { useEffect, useState } from "react";
const Home = () => {
    const [videoDatas,setVideoDatas] = useState([])
    const [searchInputs,setSearchInput] = useState("")

    const searchInput = (value) => {
        setSearchInput(value)
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
    setVideoDatas(updatedVideoDatas)
    }
 
    useEffect(()=>{
        
        let getData = async () => {
            const jwtToken = Cookies.get("jwt_token") 
            const url = `https://apis.ccbp.in/videos/all?search=${searchInputs}`
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
    },[searchInputs])
        return(
            <div>
                <Header/>
                <div className="home-video-sidebar-container">
                    <Sidebar />
                    <Video videoDatas={videoDatas} searchInput={searchInput}/>
                </div>
            </div>
        )
}

export default Home
