import { Status } from "@prisma/client";
import React from "react";
import { Badge } from "@radix-ui/themes";

const badgeModes: Record<
  Status,
  { tag: string; color: "green" | "blue" | "orange" }
> = {
  CLOSED: { tag: "CLOSED", color: "green" },
  IN_PROGRESS: { tag: "IN PROGRESS", color: "orange" },
  OPEN: { tag: "OPEN", color: "blue" },
};

function StatusBadge({ status }: { status: Status }) {
  const badgeMode = badgeModes[status];

  return <Badge color={badgeMode.color}>{badgeMode.tag}</Badge>;
}

export default StatusBadge;
