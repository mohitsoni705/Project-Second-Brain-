import axios from "axios"
import { DeleteIcon } from "../../icons/DeleteIcon"
import { EditIcon } from "../../icons/EditIcon"
import { ShareIcon } from "../../icons/ShareIcon"
import { BACKEND_URL } from "../../config"
import { useState } from "react"
import type { EditData } from "../CreateContentModal"
import Loader, { Loader2 } from "../Loader"
import CopyIcon from "../../icons/CopyIcon"

interface CardProps{
    contentId:string,
    title:string,
    link:string,
    type:string,
    onEdit?: (data: EditData) => void
    onDelete?:()=>void
}

export const Card = ({title,link , type , contentId, onEdit , onDelete}:CardProps) =>{
    const [toggle , setToggle]= useState(false);
    const [loading , setLoading] = useState(false);
    const handleDeletePostButton=async()=>{    
        await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`,{
         headers:{
            authorization:`${localStorage.getItem("token")}`
        }
    }
    )   
    }
    const handleShareButton = ()=>{
        navigator.clipboard.writeText(link);
        alert("Video Link is copied to your board")
    }
    const handleEditButton = ()=>{
        if (onEdit) onEdit({ contentId, title, link, type });
    }
    
    return <div className="flex justify-center items-center">
        <div className="p-8 bg-white rounded-md border border-gray-200 w-full md:max-w-72 min-h-48 transition-all items-center ">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    {onEdit && <div className="pr-2 text-gray-500 cursor-pointer  hover:text-[#5046e4]" onClick={handleEditButton}>
                    <EditIcon />
                    </div>}
                    {title}
                </div>
                <div className="flex items-center">
                <div className="pr-2 text-gray-500 hover:text-[#5046e4]">
                    <div onClick={handleShareButton}>
                    <CopyIcon/>
                    </div>
                </div>
                {onDelete && 
                <div className="pr-2 text-gray-500 cursor-pointer hover:text-[#5046e4]" onClick={handleDeletePostButton}>
                    <span onClick={()=>{setLoading(true)}}>
                    {loading?<Loader2/>:<DeleteIcon/>}
                    </span>
                </div>
                }
                </div>
            </div>
            <div className="pt-4 ">
                {type === "youtube" && <iframe className="w-full" src={link.replace("https://youtu.be/","https://www.youtube.com/embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }
                {type ==="twitter" &&<blockquote className="twitter-tweet">
                <a href={link.replace("x.com","twitter.com")}></a>
                </blockquote>}
        </div>
        </div>
    </div>
}