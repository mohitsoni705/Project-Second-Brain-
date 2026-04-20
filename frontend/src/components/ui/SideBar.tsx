import { useNavigate } from "react-router-dom";
import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Button } from "./Button";
import SidebarItem from "./SidebarItem";
import { UserIcon } from "../../icons/LockIcon";
import { AllIcon } from "../../icons/AllIcon";

const SideBar = ({ onFilterChange }: { onFilterChange?: (type: string) => void }) => {
  const navigate = useNavigate();
  const handleLogoutButton=()=>{
       localStorage.removeItem("token");
       navigate("/signin");
  }
  return (
    <div className='h-screen bg-white border-r border-white shadow-xl w-72 fixed left-0 top-0 pl-4'>
      <div className="flex text-2xl pt-4 items-center">
        <div className="pr-2 p-4 text-[#5046e4]">
        <Logo size="6"/>
        </div>
        <p className="text-2xl font-semibold ">
        Brainly
        </p>
      </div>
        <div className="p-4 ">
          <div className="ml-1">
          <SidebarItem text="All" icon={<AllIcon/>} onClick={() => onFilterChange?.("all")} />
          </div>
          <div className="ml-1">
          <SidebarItem text="Twitter" icon={<TwitterIcon/>} onClick={() => onFilterChange?.("twitter")} />
          </div>
          <div>
          <SidebarItem text="Youtube" icon={<YoutubeIcon/>} onClick={() => onFilterChange?.("youtube")} />
          </div>
        </div>
          <Button variant="primary" text="Log out" size="md" onClick={handleLogoutButton}/>
    </div>
  )
}

export default SideBar;