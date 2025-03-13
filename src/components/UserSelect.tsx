"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

function UserSelect({ users }: { users: User[] }) {
  const pointerCursor = { cursor: "pointer" };

  return (
    <Select.Root>
      <Select.Trigger placeholder="Select a user..."></Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
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
