import React from "react";
import prisma from "../../../../prisma/client";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

type Props = {
  params: { id: string };
};

async function UserManagementDetailsPage() {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });
  if (!user?.isAdmin) return redirect("/");

  return <div>page</div>;
}

export async function generateMetadata({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  return { title: user?.name };
}

export default UserManagementDetailsPage;
