"use client";
import UserSelect from "@/components/Selects/UserSelect";
import { ApiClient } from "@/services/ApiClient";
import Toast from "@/services/Toast";
import { Issue, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const apiClient = new ApiClient<User[]>("/api/users");

function UserSelectBinder({ issue }: { issue: Issue }) {
  const { data: users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      apiClient
        .fetch()
        .then((res) => res.data)
        .catch((err: any) => {
          Toast.showToast("An unexpected error occured", "error");
          return err;
        }),
    staleTime: 60 * 1000,
    retry: 5,
  });

  return <UserSelect users={users || []} issue={issue} />;
}

export default UserSelectBinder;
