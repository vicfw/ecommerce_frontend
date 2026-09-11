import { getClientSideCookie, removeClientSideCookie } from "@/lib/utils";
import { UserService } from "@/services/userService";
import { useGlobalStore } from "@/store/globalStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { handleUpdateToken, handleUpdateCartLength } = useGlobalStore();

  const logout = async () => {
    const token = getClientSideCookie("jwt");

    if (token) {
      try {
        await new UserService().logout();
      } catch {
        // Local session is cleared even if revoke fails.
      }
    }

    removeClientSideCookie("jwt");
    removeClientSideCookie("userInfo");
    handleUpdateToken("");
    handleUpdateCartLength(0);
    queryClient.clear();
    router.push("/");
    router.refresh();
  };

  return { logout };
};
