import { useNavigate } from "react-router-dom";
import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Button } from "./Button";
import SidebarItem from "./SidebarItem";
import LogOutIcon from "../../icons/LogOutIcon";

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogoutButton=()=>{
       localStorage.removeItem("token");
       navigate("/signin");
  }
  return (
    <div className='h-screen bg-white border-r border-white shadow-xl w-72 fixed left-0 top-0 pl-4'>
      <div className="flex text-2xl pt-4 items-center">
        <div className="pr-2 p-4 text-purple-600">
        <Logo si={6}/>
        </div>
        <p className="text-2xl font-semibold ">
        Brainly
        </p>
      </div>
        <div className="p-4 ">
          <div className="ml-1">
          <SidebarItem text="Twitter" icon={<TwitterIcon/>}/>
          </div>
          <div>
          <SidebarItem text="Youtube" icon={<YoutubeIcon/>}/>
          </div>
        </div>
          <Button variant="primary" text="Log out" size="md" onClick={handleLogoutButton}/>
    </div>
  )
}

export default SideBar;