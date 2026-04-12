import { useState } from "react";
import SideBar from "../components/ui/SideBar";
import { CreateContentModal } from "../components/CreateContentModal";
import { Button } from "../components/ui/Button";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/ui/Card";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Logo } from "../icons/Logo";
import LogOutIcon from "../icons/LogOutIcon";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [sharing, setSharing] = useState(false);
  const { contents, refresh } = useContent();
  const navigate = useNavigate();

  const handleShare = async () => {
    try {
      setSharing(true);

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      await navigator.clipboard.writeText(shareUrl);

      alert("Share link copied to clipboard!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate share link");
    } finally {
      setSharing(false);
    }
  };
const handleLogoutButton=()=>{
       localStorage.removeItem("token");
       navigate("/signin");
  }
  return (
    <div className="flex flex-col">
      
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <SideBar />
      </div>
      {/* {side bar mobile nav} */}
      <div className="flex items-center justify-center gap-2 bg-gray-200 md:hidden p-3">
        <div className='text-[#5046e4]'><Logo si={6}/></div>
        <h1 className="font-bold text-[#5046e4] text-xl">Brainly</h1>
        <div className="text-[#5046e4]" onClick={handleLogoutButton}>
          <LogOutIcon/>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-72 min-h-screen bg-gray-200">
        
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            refresh();
          }}
        />

        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:justify-end gap-3 mb-4">
          
          <Button
            variant="primary"
            startIcon={<PlusIcon size="md" />}
            size="sm"
            text="Add Content"
            onClick={() => setModalOpen(true)}
          />

          <Button
            onClick={handleShare}
            variant="secondary"
            startIcon={<ShareIcon size="lg" />}
            size="sm"
            text={sharing ? "Sharing..." : "Share Brain"}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contents.map(({ title, type, link, _id }) => (
            <Card
              contentId={_id}
              key={_id}
              title={title}
              type={type}
              link={link}
            />
          ))}
        </div>

      </div>
    </div>
  );
};