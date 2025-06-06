import React from "react";
import prisma from "../../../../prisma/client";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import MarkDown from "@/components/MarkDown";
import UserStatusBadge from "@/components/UserStatusBadge";
import Image from "next/image";
import UserManagementActions from "./UserManagementActions";

type Props = {
  params: { id: string };
};

async function UserManagementDetailsPage({ params: { id } }: Props) {
  try {
    const session = await getServerSession();
    const adminUser = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });

    const userDetails = await prisma.user.findUnique({ where: { id } });

    if (!adminUser?.isAdmin) return redirect("/");

    if (!userDetails) return notFound();

    if (userDetails.id === adminUser.id) return notFound();

    return (
      <Flex className="m-10 flex-col sm:flex-row">
        <Box>
          <Flex className="flex-row items-center space-x-4">
            {userDetails.image && (
              <Image
                className="rounded-full"
                width={50}
                height={50}
                alt={userDetails.name!}
                src={userDetails.image}
              />
            )}
            <Heading>{userDetails.name}</Heading>
          </Flex>
          <Flex className="space-x-3" my={"5"}>
            <UserStatusBadge
              classname="text-base"
              userRole={userDetails.isAdmin ? "ADMIN" : "USER"}
            />
            <Text>
              {"User ID: "}
              {userDetails.id}
            </Text>
          </Flex>
          <Card className="prose w-full px-3">
            <MarkDown text={`User Email: ${userDetails.email}`} />
          </Card>
        </Box>
        <UserManagementActions userDetails={userDetails} />
      </Flex>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export async function generateMetadata({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  return { title: user?.name };
}

export default UserManagementDetailsPage;

export const dynamic = "force-dynamic";
export const revalidate = 0;
