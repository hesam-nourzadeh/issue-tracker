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

function IssueStatusBadge({
  status,
  classname,
}: {
  status: Status;
  classname?: string;
}) {
  const badgeMode = badgeModes[status];

  return (
    <Badge className={`p-0 ${classname}`} color={badgeMode.color}>
      {badgeMode.tag}
    </Badge>
  );
}

export default IssueStatusBadge;
