import IssueForm from "@/components/IssueForm";
import React from "react";
import prisma from "../../../../../prisma/client";
import { notFound } from "next/navigation";

type Prop = {
  params: { id: string };
};

async function EditPage({ params }: Prop) {
  const issue = await prisma.issue
    .findUnique({
      where: { id: parseInt(params.id) },
    })
    .catch(() => notFound());

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}

export default EditPage;
