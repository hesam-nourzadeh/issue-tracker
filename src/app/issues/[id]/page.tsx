export const dynamic = "force-dynamic";
export const revalidate = 0;

import React, { cache } from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import StatusBadge from "@/components/IssueStatusBadge";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import IssueAlertDialog from "../../../components/IssueAlertDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UserSelectBinder from "./UserSelectBinder";
import StatusSelect from "@/components/Selects/StatusSelect";
import MarkDown from "@/components/MarkDown";
import { AiFillCloseCircle } from "react-icons/ai";

type Props = {
  params: { id: string };
};

const getIssue = cache((id: number) =>
  prisma.issue.findUnique({
    where: { id },
  })
);

async function IssueDetailsPage({ params }: Props) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail! },
      include: { assignedIssues: true },
    });

    const id = parseInt(params.id);

    if (!id) return notFound();

    const issue = await getIssue(id).catch((err) => {
      return notFound();
    });

    if (!issue) return notFound();

    const isAuthorized =
      user?.assignedIssues.find((userIssue) => userIssue.id === issue.id) ||
      user?.isAdmin
        ? true
        : false;

    return (
      <Flex className="m-10 flex-col sm:flex-row">
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex className="space-x-3" my={"5"}>
            <StatusBadge status={issue.status} />
            <Text>{issue.createdAt.toUTCString()}</Text>
          </Flex>
          <Card className="prose w-3/5">
            <MarkDown text={issue.description} />
          </Card>
        </Box>
        <Flex className="sm:mx-16 my-10 sm:my-0 flex-col md:flex-row w-8/12 mx-auto md:space-x-6 space-y-6 md:space-y-0">
          {session && isAuthorized && (
            <Button style={{ cursor: "pointer" }}>
              <BiEdit />
              <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
            </Button>
          )}
          {session && isAuthorized && (
            <IssueAlertDialog
              trigger={
                <Button style={{ cursor: "pointer" }} color="red">
                  <AiFillCloseCircle />
                  Delete Issue
                </Button>
              }
              issueId={id}
            />
          )}
          {session && isAuthorized && <StatusSelect issue={issue} />}
          {session && user?.isAdmin && <UserSelectBinder issue={issue} />}
        </Flex>
      </Flex>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return { title: issue?.title, description: issue?.description };
}

export default IssueDetailsPage;
