import axios from "axios"
import { DeleteIcon } from "../../icons/DeleteIcon"
import { EditIcon } from "../../icons/EditIcon"
import { ShareIcon } from "../../icons/ShareIcon"
import { BACKEND_URL } from "../../config"

interface CardProps{
    contentId:string,
    title:string,
    link:string,
    type:string
}
export const Card = ({title,link , type , contentId}:CardProps) =>{

    const handleDeletePostButton=async()=>{    
        await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`,{
         headers:{
            authorization:`${localStorage.getItem("token")}`
        }
    }
    )   
    }
    const handleShareLinkButton = async()=>{
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`)
    }
    return <div>
        <div className="p-8 bg-white rounded-md border border-gray-200 max-w-72 min-h-48 transition-all ">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-500 cursor-pointer  hover:text-purple-600">
                    <EditIcon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                <div className="pr-2 text-gray-500 hover:text-purple-600">
                    <a href="">
                    <ShareIcon size="lg"/>
                    </a>
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