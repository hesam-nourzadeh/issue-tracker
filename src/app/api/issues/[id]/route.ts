import { Issue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { OptionalIssueSchema } from "../../../../../prisma/schemas";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

type Params = { params: { id: string } };

export async function GET(nextRequest: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let id: number;

    try {
      id = parseInt(params.id);
    } catch (error) {
      return NextResponse.json({ message: "Bad input", status: 400 });
    }
    const issue = await prisma.issue.findUnique({ where: { id } });

    return NextResponse.json({
      data: issue,
      message: "Issue fethced successfully",
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(nextRequest: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body: Partial<Issue> = await nextRequest.json().catch((err) => {
    NextResponse.json(
      { message: "There was a problem with the body of the request." },
      { status: 400 }
    );
  });

  const user = await prisma.user.findUnique({
    where: { email: userEmail! },
    include: { assignedIssues: true },
  });

  const validation = OptionalIssueSchema.safeParse(body);
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

  const isAuthorized =
    user?.isAdmin || user?.assignedIssues.find((issue) => issue.id === id)
      ? true
      : false;

  if (!isAuthorized)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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

  const updatedIssue = await prisma.issue
    .update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        assignedToUserId: user?.isAdmin ? body.assignedToUserId : user?.id,
        status: body.status,
      },
    })
    .catch((error) => {
      NextResponse.json(
        { message: "Could not update the issue", error },
        { status: 400 }
      );
    });

  return NextResponse.json(
    { message: "issue edited successfully", updatedIssue },
    { status: 200 }
  );
}

export async function DELETE(nextRequest: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: userEmail! },
    include: { assignedIssues: true },
  });

  if (!user?.isAdmin)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const id = parseInt(params.id);

  if (!id)
    return NextResponse.json(
      { message: "The provided ID is not valid" },
      { status: 400 }
    );

  const isAuthorized =
    user?.isAdmin || user?.assignedIssues.find((issue) => issue.id === id)
      ? true
      : false;

  if (!isAuthorized)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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

  const deletedIssue = await prisma.issue
    .delete({
      where: { id },
    })
    .catch((error) => {
      NextResponse.json(
        { message: "Could not deleted the issue", error },
        { status: 400 }
      );
    });

  return NextResponse.json({
    message: "Issue deletion was successful",
    deletedIssue,
  });
}
