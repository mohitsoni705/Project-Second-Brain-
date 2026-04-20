import type { ReactElement } from "react"
interface SideBarItemProps{
    text:string,
    icon:ReactElement,
    onClick?:()=>void
}
const SidebarItem = ({icon , text , onClick}:SideBarItemProps) => {
  return (
    <div onClick={onClick} className="flex text-gray-700 items-center cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150">
        <div className="p-2">
            {icon}
        </div>
        <div className="p-2">
        {text}
        </div>
    </div>
  )
}

export default SidebarItem
