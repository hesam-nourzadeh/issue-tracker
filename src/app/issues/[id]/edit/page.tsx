import React from "react";
import prisma from "../../../../../prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/components/Placeholder/IssueFormSkeleton";
const IssueForm = dynamic(() => import("@/components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

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
