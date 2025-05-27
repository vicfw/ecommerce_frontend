import { getClientSideCookie } from "@/lib/utils";
import { useState } from "react";
import { useGlobalStore } from "@/store/globalStore";

export const useCommentSection = () => {
  const { handleUpdateAddCommentModal } = useGlobalStore();
  const [openLoginSheet, setOpenLoginSheet] = useState(false);
  const token = getClientSideCookie("jwt");

  const handleLoginSheetOpenChange = (open: boolean) => {
    setOpenLoginSheet(open);
  };

  const handleOpenAddCommentModal = () => {
    if (!token) {
      setOpenLoginSheet(true);
    } else {
      handleUpdateAddCommentModal(true);
    }
  };

  return {
    get: { openLoginSheet, token },
    on: { handleLoginSheetOpenChange, handleOpenAddCommentModal },
  };
};
