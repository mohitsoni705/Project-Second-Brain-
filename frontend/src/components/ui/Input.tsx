import type { ReactElement } from "react";


export const Input = ({placeholder, refrence , startIcon }:{ placeholder:string; refrence:any; startIcon?:ReactElement})=>{
    return <div>
        <div className="">
            <input type={"text"} ref={refrence} placeholder={placeholder} className="px-4 py-2 border rounded m-2 border-[#5046e4] focus:outline-blue-300 w-full "/>
        </div>
    </div>
} 