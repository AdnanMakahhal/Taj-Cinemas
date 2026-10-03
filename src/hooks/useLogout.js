import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../services/apiAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      navigate("/Login", { replace: true });
    },
  });

  return {
    logout: mutation.mutate,
    isLoggingOut: mutation.isPending,
    error: mutation.error,
  };
}