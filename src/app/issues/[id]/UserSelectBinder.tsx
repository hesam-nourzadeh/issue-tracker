"use client";
import UserSelect from "@/components/UserSelect";
import { ApiClient } from "@/services/ApiClient";
import { User } from "@prisma/client";
import React, { useState } from "react";

const apiClient = new ApiClient<User[]>("/api/users");

function UserSelectBinder() {
  const [users, setUsers] = useState<User[]>([]);

  apiClient.fetch().then(({ data }) => setUsers(data));

  return <UserSelect users={users} />;
}

export default UserSelectBinder;
