"use client";
import UserSelect from "@/components/UserSelect";
import { ApiClient } from "@/services/ApiClient";
import Toast from "@/services/Toast";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const apiClient = new ApiClient<User[]>("/api/users");
const toast = new Toast("Failed to fetch the users", "error");

function UserSelectBinder() {
  const { data: users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      apiClient
        .fetch()
        .then((res) => res.data)
        .catch((err) => {
          toast.showToast();
          return err;
        }),
    staleTime: 60 * 1000,
    retry: 5,
  });

  return <UserSelect users={users || []} />;
}

export default UserSelectBinder;
