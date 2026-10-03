import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, saveProfile as saveProfileApi } from "../services/apiProfile";

const PROFILE_QUERY_KEY = ["profile"];

export function useProfile() {
  const queryClient = useQueryClient();
  const profileQuery = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfile,
  });

  const saveMutation = useMutation({
    mutationFn: (profile) =>
      saveProfileApi({ user: profileQuery.data?.user, profile }),
    onSuccess: (profileData) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, profileData);
      queryClient.setQueryData(["user"], profileData.user);
    },
  });

  return {
    ...profileQuery,
    saveProfile: saveMutation.mutate,
    isSaving: saveMutation.isPending,
    saveError: saveMutation.error,
    resetSave: saveMutation.reset,
  };
}
