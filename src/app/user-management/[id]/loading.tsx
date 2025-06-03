import { getServerSession } from "next-auth";
import React from "react";
import prisma from "../../../../prisma/client";
import { redirect } from "next/navigation";
import LoadingTheme from "@/components/Placeholder/LoadingTheme";
import Skeleton from "react-loading-skeleton";
import { Card } from "@radix-ui/themes";

async function UserManagementDetailsLoadingPage() {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
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
}

export default UserManagementDetailsLoadingPage;
