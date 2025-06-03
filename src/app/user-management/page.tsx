import UserList from "@/components/UserList";
import React from "react";
import prisma from "../../../prisma/client";
import { Heading } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function UserManagementPage() {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!user?.isAdmin) return redirect("/");

  const users = await prisma.user.findMany();

  return (
    <div className="m-8 space-y-7">
      <Heading size={"8"} color="cyan">
        {"User Management"}
      </Heading>
      <UserList users={users} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "User Management",
};

export default UserManagementPage;
