import IssueListSkeleton from "@/components/Placeholder/IssueListSkeleton";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "../../../prisma/client";
import { notFound, redirect } from "next/navigation";

async function LoadingUserManagementPage() {
  try {
    const session = await getServerSession();
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });

    if (!user?.isAdmin) return redirect("/");
    const issues = [1, 2, 3, 4, 5];

    return <IssueListSkeleton issues={issues} />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export default LoadingUserManagementPage;
