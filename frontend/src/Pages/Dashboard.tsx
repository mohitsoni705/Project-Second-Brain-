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

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
            Authorization: `  ${localStorage.getItem("token")}`,
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

  return (
    <div>
      <SideBar />

      <div className="p-4 ml-72 min-h-screen bg-gray-200">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            refresh();
          }}
        />

        <div className="flex justify-end gap-4 mb-4">
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

        <div className="flex gap-4 flex-wrap">
          {contents.map(({ title, type, link, _id }) => (
            <Card contentId={_id} key={_id} title={title} type={type} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};