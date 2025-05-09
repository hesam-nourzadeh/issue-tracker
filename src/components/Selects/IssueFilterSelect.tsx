"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { SearchParams } from "../IssueList";

function IssueFilterSelect() {
  const status: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentStatus = searchParams.get("status") || "All";

  const onValueChange = (status: string) => {
    if (status === currentStatus) return;
    const newParams = new URLSearchParams(searchParams as SearchParams);
    newParams.set("status", status);
    const sortBy = searchParams.get("sortBy");
    if (sortBy) newParams.set("sortBy", searchParams.get("sortBy")!);
    const query = "?" + newParams;
    router.push(pathname + query);
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
