"use client";
import { ApiClient } from "@/services/ApiClient";
import Toast from "@/services/Toast";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

function UserSelect({ users, issue }: { users: User[]; issue: Issue }) {
  const pointerCursor = { cursor: "pointer" };
  const apiClient = new ApiClient<Partial<Issue>>(`/api/issues/${issue.id}`);

  const assignIssue = async (userId: string) => {
    try {
      const updatedIssue = await apiClient.update({
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
      if (userId === "unassigned")
        return Toast.showToast("Issue unassigned.", "success");

      Toast.showToast("Issue assigned.", "success");
    } catch (err) {
      Toast.showToast("An unexpected error occured.", "error");
    }
  };

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "unassigned"}
      onValueChange={(userId) => assignIssue(userId)}
    >
      <Select.Trigger placeholder="Select a user..."></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item style={pointerCursor} value={"unassigned"}>
            {"unassigned"}
          </Select.Item>
          {users.map((user, index) => (
            <Select.Item key={index} style={pointerCursor} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default UserSelect;
