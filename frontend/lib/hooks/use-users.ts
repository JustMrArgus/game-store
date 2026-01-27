import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAllUsers,
  getUser,
  getMe,
  createUser,
  patchUser,
  patchMe,
  deleteUser,
} from "@/lib/api/api-users";
import type {
  UpdateUserRequest,
  CreateUserRequest,
} from "@/lib/types/requests";

export const userKeys = {
  all: ["users"] as const,
  detail: (id: number) => ["users", id] as const,
  me: ["users", "me"] as const,
};

export const useUsers = () => {
  return useSuspenseQuery({
    queryKey: userKeys.all,
    queryFn: getAllUsers,
  });
};

export const useUser = (userId: number) => {
  return useSuspenseQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUser(userId),
  });
};

export const useMe = () => {
  return useSuspenseQuery({
    queryKey: userKeys.me,
    queryFn: getMe,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: number;
      data: UpdateUserRequest;
    }) => patchUser(userId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.userId),
      });
    },
  });
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => patchMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
