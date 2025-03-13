import { Issue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../../../../prisma/schemas";
import prisma from "../../../../../prisma/client";

type Params = { params: { id: string } };

export async function PATCH(nextRequest: NextRequest, { params }: Params) {
  const body: Issue = await nextRequest.json().catch((err) => {
    NextResponse.json(
      { message: "There was a problem with the body of the request." },
      { status: 403 }
    );
  });

  const validation = IssueSchema.safeParse(body);
  const id = parseInt(params.id);

  if (!id)
    return NextResponse.json(
      { message: "The provided ID is not valid" },
      { status: 400 }
    );

  if (!validation.success)
    return NextResponse.json(
      { message: "Validation Failed", error: validation.error.format() },
      { status: 403 }
    );

  const issue = await prisma.issue
    .findUnique({
      where: { id },
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
    where: { id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(
    { message: "issue edited successfully", updatedIssue },
    { status: 200 }
  );
}

export async function DELETE(nextRequest: NextRequest, { params }: Params) {
  const id = parseInt(params.id);

  if (!id)
    return NextResponse.json(
      { message: "The provided ID is not valid" },
      { status: 400 }
    );

  const issue = await prisma.issue
    .findUnique({ where: { id } })
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

  const deletedIssue = await prisma.issue.delete({
    where: { id },
  });

  return NextResponse.json({
    message: "Issue deletion was successful",
    deletedIssue,
  });
}
