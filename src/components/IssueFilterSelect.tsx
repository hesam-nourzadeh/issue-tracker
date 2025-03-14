"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

function IssueFilterSelect() {
  const status: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter Issues..." />
      <Select.Content>
        <Select.Group>
          {status.map((status, index) => (
            <Select.Item
              style={{ cursor: "pointer" }}
              key={index}
              value={status.value || "All"}
            >
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default IssueFilterSelect;
