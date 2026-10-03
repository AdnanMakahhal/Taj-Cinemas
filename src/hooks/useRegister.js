import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "../services/apiAuth";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: register,
    isPending: isLoading,
    error,
    data,
    reset,
  } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      registerApi({ fullName, email, password }),
    onSuccess: (data) => {
      if (data.session) {
        queryClient.setQueryData(["user"], data.user);
        navigate("/Home", { replace: true });
      }
    },
  });

  return { register, isLoading, error, data, reset };
}
