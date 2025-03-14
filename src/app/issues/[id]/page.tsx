import React from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";

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
    <div>
      <p>{issue.title}</p>
      <p>{issue.status}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAt.toString()}</p>
    </div>
  );
}

export default IssueDetailsPage;
