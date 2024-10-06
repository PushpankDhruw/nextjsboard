"use client";
import { useRouter } from "next/navigation";
import {
  handleAcceptInvitation,
  handleRejectInvitation,
} from "@/server-actions/InvitationServerActions";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

export default function InvitationButtons({
  token,
  userId,
  boardId,
}: {
  token: string;
  userId: string;
  boardId: string;
}) {
  const router = useRouter();

  const handleAccept = async () => {
    try {
      const response = await handleAcceptInvitation({ token, userId });
      if (response.success) {
        toast.success(response.message);
        router.push(`/board/${boardId}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to accept the invitation.");
    }
  };

  const handleReject = async () => {
    try {
      const response = await handleRejectInvitation({ token, userId });
      if (response.success) {
        toast.success(response.message);
        router.push(`/board`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to reject the invitation.");
      console.error("Error rejecting invitation:", error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-3 my-5">
      <Button color="primary" onClick={handleAccept}>
        Accept
      </Button>
      <Button onClick={handleReject}>Reject</Button>
    </div>
  );
}
