import React from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import StatusBadge from "@/components/StatusBadge";
import ReactMarkdown from "react-markdown";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import { AiFillCloseCircle } from "react-icons/ai";

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

  return (
    <Flex className="m-10 flex-col sm:flex-row">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-3" my={"5"}>
          <StatusBadge status={issue.status} />
          <Text>{issue.createdAt.toUTCString()}</Text>
        </Flex>
        <Card className="prose w-3/5">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Flex className="sm:mx-16 flex-col md:flex-row w-8/12 mx-auto">
        <Button
          mx={{ sm: "4" }}
          my={{ initial: "5", sm: "0" }}
          className="cursor-pointer"
        >
          <BiEdit />
          <Link className="cursor-default" href={`/issues/${issue.id}/edit`}>
            Edit Issue
          </Link>
        </Button>
        <Button color="red">
          <AiFillCloseCircle />
          Delete Issue
        </Button>
      </Flex>
    </Flex>
  );
}

export default IssueDetailsPage;
