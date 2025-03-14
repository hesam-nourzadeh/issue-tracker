import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

function ProfileDropDown({ data }: { data: Session }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          size={"4"}
          radius="full"
          className="cursor-pointer"
          src={data.user!.image!}
          fallback="?"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text weight={"bold"} size={"3"}>
            {data.user?.email}
          </Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item asChild>
          <Link href={"/api/auth/signout"} style={{ cursor: "pointer" }}>
            <Text weight={"bold"} mx={"auto"} align={"center"}>
              Logout
            </Text>
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default ProfileDropDown;
