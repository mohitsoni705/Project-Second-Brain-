import { useState } from "react";
import SideBar from "../components/ui/SideBar"
import { Logo } from "../icons/Logo"
import LogOutIcon from "../icons/LogOutIcon"
import { Outlet, useNavigate } from "react-router-dom";

export const AppLayout=()=>{
    const [showCard , setShowCard] = useState("");
    const navigate = useNavigate();
    const handleLogoutButton=()=>{
       localStorage.removeItem("token");
       navigate("/signin");
  }
    return(
        <>
        <div className="hidden md:block">
        <SideBar onFilterChange={(type) => setShowCard(type)} />
      </div>
      <div className="flex items-center justify-center gap-2 bg-gray-200 md:hidden p-3">
        <div className='text-[#5046e4]'><Logo size="6"/></div>
        <h1 className="font-bold text-[#5046e4] text-xl">Brainly</h1>
        <div className="text-[#5046e4]" onClick={handleLogoutButton}>
          <LogOutIcon/>
        </div>
      </div>
      <Outlet/>
        </>
    )
}