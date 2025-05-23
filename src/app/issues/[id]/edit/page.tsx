export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import prisma from "../../../../../prisma/client";
import { notFound, redirect } from "next/navigation";
import nextDynamic from "next/dynamic";
import IssueFormSkeleton from "@/components/Placeholder/IssueFormSkeleton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
const IssueForm = nextDynamic(() => import("@/components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

type Props = {
  params: { id: string };
};

async function EditPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue
    .findUnique({
      where: { id: parseInt(params.id) },
    })
    .catch(() => {
      return notFound();
    });

  if (!issue) return notFound();

  const userEmail = session?.user?.email;
  const user = await prisma.user.findUnique({
    where: { email: userEmail! },
    include: { assignedIssues: true },
  });

  const isAuthorized = user?.assignedIssues.find(
    (userIssue) => userIssue.id === issue.id
  )
    ? true
    : false;

  if (user?.isAdmin || isAuthorized) return <IssueForm issue={issue} />;

  return redirect("/");
}

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: "Edit Issue: " + issue?.title,
    description: issue?.description,
  };
}

export default EditPage;
