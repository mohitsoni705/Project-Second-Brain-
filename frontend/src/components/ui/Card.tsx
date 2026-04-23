import axios from "axios"
import { DeleteIcon } from "../../icons/DeleteIcon"
import { EditIcon } from "../../icons/EditIcon"
import { ShareIcon } from "../../icons/ShareIcon"
import { BACKEND_URL } from "../../config"
import { useState } from "react"
import type { EditData } from "../CreateContentModal"

interface CardProps{
    contentId:string,
    title:string,
    link:string,
    type:string,
    onEdit?: (data: EditData) => void
}

export const Card = ({title,link , type , contentId, onEdit}:CardProps) =>{
    const [toggle , setToggle]= useState(false);

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
        <div className="p-8 bg-white rounded-md border border-gray-200 max-w-72 min-h-48 transition-all items-center ">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    {onEdit && <div className="pr-2 text-gray-500 cursor-pointer  hover:text-purple-600" onClick={handleEditButton}>
                    <EditIcon />
                    </div>}
                    {title}
                </div>
                <div className="flex items-center">
                <div className="pr-2 text-gray-500 hover:text-purple-600">
                    <div onClick={handleShareButton}>
                    <ShareIcon size="lg"/>
                    </div>
                </div>
                <div className="pr-2 text-gray-500 cursor-pointer hover:text-purple-600" onClick={handleDeletePostButton}>
                    <DeleteIcon />
                </div>
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