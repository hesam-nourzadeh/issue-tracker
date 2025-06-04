import UserList from "@/components/UserList";
import React from "react";
import prisma from "../../../prisma/client";
import { Heading } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function UserManagementPage() {
  const session = await getServerSession();
  const adminUser = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!adminUser?.isAdmin) return redirect("/");

  const users = await prisma.user.findMany({
    where: { NOT: { id: adminUser.id } },
  });

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

export const dynamic = "force-dynamic";
export const revalidate = 0;
