import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../../../prisma/schemas";
import prisma from "../../../../prisma/client";
import { Issue } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(nextRequest: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body: Issue = await nextRequest.json();
  const validation = IssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(
      { message: "Validation Failed", error: validation.error.format() },
      { status: 403 }
    );

  const newIssue = await prisma.issue
    .create({
      data: { title: body.title, description: body.description },
    })
    .catch((error) => {
      NextResponse.json(
        { message: "Could not create the issue", error },
        { status: 400 }
      );
    });

  return NextResponse.json({
    data: newIssue,
    message: "Issue creation was successful",
  });
}
