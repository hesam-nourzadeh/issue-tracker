"use client";
import { ApiClient } from "@/services/ApiClient";
import Toast from "@/services/Toast";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

function StatusSelect({ issue }: { issue: Issue }) {
  const pointerCursor = { cursor: "pointer" };
  const apiClient = new ApiClient<Partial<Issue>>(`/api/issues/${issue.id}`);

  const statusList = Object.values(Status);

  const changeStatus = async (status: Status) => {
    try {
      const updatedIssue = await apiClient.update({ status });
      Toast.showToast(`Issue status changed to ${status}`, "success");
    } catch (err) {
      Toast.showToast("An unexpected error occured.", "error");
    }
  };
  console.log(statusList);
  return (
    <Select.Root
      defaultValue={issue.status}
      onValueChange={(status) => changeStatus(status as Status)}
    >
      <Select.Trigger placeholder="Select a status..."></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statusList.map((stat, index) => (
            <Select.Item key={index} style={pointerCursor} value={stat}>
              {stat}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default StatusSelect;
