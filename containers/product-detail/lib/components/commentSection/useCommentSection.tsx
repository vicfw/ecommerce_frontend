import { getClientSideCookie } from "@/lib/utils";
import { useState } from "react";

export const useCommentSection = () => {
  const [openLoginSheet, setOpenLoginSheet] = useState(false);
  const token = getClientSideCookie("jwt");

  const handleLoginSheetOpenChange = (open: boolean) => {
    setOpenLoginSheet(open);
  };

  const handleOpenLoginSheet = () => {
    setOpenLoginSheet(true);
  };

  return {
    get: { openLoginSheet, token },
    on: { handleLoginSheetOpenChange, handleOpenLoginSheet },
  };
};
