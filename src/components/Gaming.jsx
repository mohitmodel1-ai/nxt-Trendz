import { useContext, useEffect, useState } from 'react'
import Cookies from "js-cookie"
import Sidebar from './Sidebar'
import Header from './Header'
import { SiYoutubegaming } from "react-icons/si";
import { Link } from 'react-router';
import { AppContext } from './Context';

const Gaming = () => {
    const [gamingdata, setGamingdata] = useState([])
    const {lightmode} = useContext(AppContext)
    
    const convertDataCase = (data) => {
        const updateddata = data.map(items=>({
            id:items.id,
            thumbnailUrl:items.thumbnail_url,
            title:items.title,
            viewCount:items.view_count
        }))

        setGamingdata(updateddata)
    }
    useEffect(()=>{
        
    const apiCallForGamingDatas = async () => {
        const jwtToken = Cookies.get("jwt_token") 
        const url = `https://apis.ccbp.in/videos/gaming`
        const options = {
            headers:{
                Authorization:`Bearer ${jwtToken}`,
            },
            method:"GET",

        }
        const response = await fetch(url,options)
        const data = await response.json()
        if(response.ok===true){
            convertDataCase(data.videos)
        }
    }
    apiCallForGamingDatas()

    },[])
    const renderGamingView = () => {
        return(
            <div className={`gaming-side-container ${lightmode?null:"darkMode"}`}>
                <div className='gaming-logo-container'>
                    <h1 className="trending-heading-logo"><SiYoutubegaming className="fire-icon-trending"/>Gaming</h1>
                </div>
                {
                    gamingdata.map(items=>(
                        <>
                            <Link to={`/videos/${items.id}`}  className="link">
                            <div className={`gaming-card-container ${lightmode?null:"darkMode"}`}>
                                <img className='gaming-image' src={items.thumbnailUrl} alt={items.thumbnailUrl} />
                                <div className='gaming-content'>
                                    <h3>{items.title}</h3>
                                    <p>{items.viewCount} Watcing Worldwide</p>
                                </div>
                            </div>
                            </Link>
                        </>
                    ))
                }
            </div>
        )
    }

    return (
      <div>
        <Header/>
        <div className="gaming-cotainer">
            <Sidebar/>
            {renderGamingView()}
        </div>
      </div>
    )
  
}

export default Gaming
