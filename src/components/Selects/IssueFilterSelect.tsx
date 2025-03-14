"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function IssueFilterSelect() {
  const status: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const onValueChange = (status: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("status", status);
    const sortBy = searchParams.get("sortBy");
    if (sortBy) newParams.set("sortBy", searchParams.get("sortBy")!);
    const query = "?" + newParams;
    router.push("/issues/list" + query);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "All"}
      onValueChange={(status) => onValueChange(status)}
    >
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
