import { getServerSession } from "next-auth";
import React from "react";
import prisma from "../../../../prisma/client";
import { notFound, redirect } from "next/navigation";
import LoadingTheme from "@/components/Placeholder/LoadingTheme";
import Skeleton from "react-loading-skeleton";
import { Card } from "@radix-ui/themes";

async function UserManagementDetailsLoadingPage() {
  try {
    const session = await getServerSession();
    if (!session) return redirect("/");

    const userEmail = session?.user?.email;

    const user = await prisma.user.findUnique({
      where: { email: userEmail! },
    });

    if (!user?.isAdmin) return redirect("/");

    return (
      <div className="m-10 w-4/12">
        <LoadingTheme>
          <Skeleton count={4} />
          <Card className="w-3/5">
            <Skeleton count={3} />
          </Card>
        </LoadingTheme>
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export default UserManagementDetailsLoadingPage;
