import type { ReactElement } from "react";

// type Variants = 'primary' | 'secondary';
export interface ButtonProps{
    variant: 'primary' | 'secondary';
    size: 'sm' | 'md' | 'lg';
    text : string;
    startIcon ?: ReactElement;
    endIcon ?:ReactElement;
    onClick ?:()=>void;
    fullWidth ?: boolean;
    loading?:boolean;
}

const variantStyles= {
    "primary":"bg-[#5046e4] text-white active:bg-blue-900 ",
    "secondary":"bg-[#e0e7fe] text-[#5046e4] " ,   
}
const sizeStyles ={
    "sm":"p-2",
    "md":"p-4",
    "lg":"p-6"
}
const defaultStyles = "rounded-md flex px-4 py-2 font-normal justify-center cursor-pointer items-center"

   
export const Button = (props:ButtonProps) =>{
    return<button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.fullWidth ? " w-full" : ""} ${props.loading ? ' opacity-40':""}`} disabled={props.loading} onClick={props.onClick}>
        {props.startIcon ?<div className="pr-2">{props.startIcon}</div>:null}{props.text}{props.endIcon}
        </button>
}
<Button variant="primary" size="md" onClick={()=>{}} text=""/>