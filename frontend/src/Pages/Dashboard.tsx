import { useState } from "react";
import SideBar from "../components/ui/SideBar";
import { CreateContentModal } from "../components/CreateContentModal";
import type { EditData } from "../components/CreateContentModal";
import { Button } from "../components/ui/Button";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/ui/Card";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Logo } from "../icons/Logo";
import LogOutIcon from "../icons/LogOutIcon";
import { useNavigate, useOutletContext } from "react-router-dom";

type ContextType = {
  showCard: string;
};


export const Dashboard = () => {
  const {showCard} = useOutletContext<ContextType>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<EditData | null>(null);
  const [sharing, setSharing] = useState(false);
  const { contents, refresh } = useContent();
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
      const hash = response.data.hash.trim();
      const shareUrl = `${window.location.origin}/share/${hash}`;
      await navigator.clipboard.writeText(shareUrl);

      alert("Share link copied to clipboard!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate share link");
    } finally {
      setSharing(false);
    }
  };

  const handleEdit = (data: EditData) => {
    setEditData(data);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditData(null);
    refresh();
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-4 md:ml-72 min-h-screen bg-gray-200">
        <CreateContentModal
          open={modalOpen}
          onClose={handleModalClose}
          editData={editData}
        />

        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:justify-end gap-3 mb-4">
          
          <Button
            variant="primary"
            startIcon={<PlusIcon size="md" />}
            size="sm"
            text="Add Content"
            onClick={() => {
              setEditData(null);
              setModalOpen(true);
            }}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 mx-full lg:grid-cols-4 gap-4">
          {contents
            .filter((content) => {
              if (showCard === "all" || showCard === "") {
                return true;
              }
              return content.type === showCard;
            })
            .map(({ title, type, link, _id}) => (
              <Card
                contentId={_id}
                key={_id}
                title={title}
                type={type}
                link={link}
                onEdit={handleEdit}
              />
            ))}
        </div>

      </div>
    </div>
  );
};