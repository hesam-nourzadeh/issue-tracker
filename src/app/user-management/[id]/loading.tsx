import { getServerSession } from "next-auth";
import React from "react";
import prisma from "../../../../prisma/client";
import { redirect } from "next/navigation";

async function UserManagementDetailsLoadingPage() {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!user?.isAdmin) return redirect("/");

  return <div>UserManagementDetailsLoadingPage</div>;
}

export default UserManagementDetailsLoadingPage;
