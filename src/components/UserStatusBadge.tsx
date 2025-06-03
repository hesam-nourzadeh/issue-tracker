import React from "react";
import { Badge, Text } from "@radix-ui/themes";

type UserRole = "ADMIN" | "USER";

const badgeModes: Record<UserRole, { tag: string; color: "green" | "blue" }> = {
  ADMIN: { tag: "Administrator", color: "green" },
  USER: { tag: "USER", color: "blue" },
};

function UserStatusBadge({
  userRole,
  classname,
}: {
  userRole: UserRole;
  classname?: string;
}) {
  const badgeMode = badgeModes[userRole];

  return (
    <Badge className={`p-0`} color={badgeMode.color}>
      <Text className={`${classname}`}>
        {"Role:"} {badgeMode.tag}
      </Text>
    </Badge>
  );
}

export default UserStatusBadge;
