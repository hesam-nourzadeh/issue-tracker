import React from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import StatusBadge from "@/components/StatusBadge";
import ReactMarkdown from "react-markdown";

type Props = {
  params: { id: string };
};

async function IssueDetailsPage({ params }: Props) {
  const issue = await prisma.issue
    .findUnique({
      where: { id: parseInt(params.id) },
    })
    .catch(() => notFound());

  if (!issue) notFound();

  const delay = new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 3000);
  });

  await delay;

  return (
    <div className="m-10">
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my={"5"}>
        <StatusBadge status={issue.status} />
        <Text>{issue.createdAt.toUTCString()}</Text>
      </Flex>
      <Card className="prose w-3/5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}

export default IssueDetailsPage;
