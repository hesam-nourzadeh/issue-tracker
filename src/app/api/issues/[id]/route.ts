import { Issue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../../../../prisma/schemas";
import prisma from "../../../../../prisma/client";

export async function PATCH(
  nextRequest: NextRequest,
  { params }: { params: { id: string } }
) {
  const body: Issue = await nextRequest.json();
  const validation = IssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(
      { message: "Validation Failed", error: validation.error.format() },
      { status: 403 }
    );

  const issue = await prisma.issue
    .findUnique({
      where: { id: parseInt(params.id) },
    })
    .catch((error) => {
      return NextResponse.json(
        { message: "Unexpected error occured", error },
        { status: 400 }
      );
    });

  if (!issue)
    return NextResponse.json(
      { message: "No issue was found" },
      { status: 404 }
    );

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(
    { message: "issue edited successfully", updatedIssue },
    { status: 200 }
  );
}
