import { useRef, useState, useEffect } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { BACKEND_URL } from "../config"
import axios from "axios"

enum ContentType{
  Youtube = "youtube",
  Twitter = "twitter"
}

export interface EditData {
  contentId: string;
  title: string;
  link: string;
  type: string;
}

type Props = {
  open: boolean;
  onClose: () => void;
  editData?: EditData | null;
}; 

export const CreateContentModal=({open , onClose, editData}:Props)=>{
    const titleRef = useRef<any>("")
    const linkRef = useRef<any>("")
    const [type,setType] = useState("youtube");

    // Pre-fill fields when editing
    useEffect(() => {
      if (open && editData) {
        setType(editData.type);
        // Set ref values after a tick so the DOM inputs are mounted
        setTimeout(() => {
          if (titleRef.current) titleRef.current.value = editData.title;
          if (linkRef.current) linkRef.current.value = editData.link;
        }, 0);
      }
      if (open && !editData) {
        setType("youtube");
        setTimeout(() => {
          if (titleRef.current) titleRef.current.value = "";
          if (linkRef.current) linkRef.current.value = "";
        }, 0);
      }
    }, [open, editData]);

    const handleSubmit = async()=>{
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        if (editData) {
          // Update existing content
          await axios.put(`${BACKEND_URL}/api/v1/content/${editData.contentId}`,{
              link,
              title,
              type
          },{
              headers:{
                  "Authorization":localStorage.getItem("token")
              }
          })
        } else {
          // Create new content
          await axios.post(`${BACKEND_URL}/api/v1/content`,{
              link,
              title,
              type
          },{
              headers:{
                  "Authorization":localStorage.getItem("token")
              }
          })
        }
        onClose();
    }

    return <div>
         {open && 
         <div>
         <div className="h-screen w-screen top-0 fixed left-0 bg-slate-500 opacity-90 flex justify-center">
         </div>
         <div className="h-screen w-screen top-0 fixed left-0 flex justify-center">
            <div className="flex flex-col justify-center opacity-100 ">
                    {/* <CrossIcon/> */}
                <span className="bg-white p-6 rounded">
                    <div className="flex justify-end cursor-pointer" onClick={onClose}>
                    <CrossIcon/>
                    </div>
                    <div>
                       <Input  placeholder="Title" refrence={titleRef}/>
                       <Input placeholder="Link" refrence={linkRef} />
                    </div>
                    <div>
                        <h1>Type</h1>
                        <div className="flex gap-4 p-4 ">
                        <Button text="Youtube" 
                        size="md" variant={type===ContentType.Youtube?"primary":"secondary"} onClick={()=>setType(ContentType.Youtube)}/> 
                        <Button text="Twitter" 
                        size="md" variant={type===ContentType.Twitter?"primary":"secondary"} onClick={()=>setType(ContentType.Twitter)}/> 
                        </div>
                    </div>
                    <div className="flex justify-center">   
                    <Button size="sm" variant="primary" text={editData ? "Update" : "Submit"} onClick={handleSubmit}/>
                    </div>
                </span>
            </div>
        </div> 
         </div>
        }
        </div>
}
