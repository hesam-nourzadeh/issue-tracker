import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../../../prisma/schemas";
import prisma from "../../../../prisma/client";
import { Issue } from "@prisma/client";

export async function POST(nextRequest: NextRequest) {
  const body: Issue = await nextRequest.json();
  const validation = IssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(
      { message: "Validation Failed", error: validation.error.format() },
      { status: 403 }
    );

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json({
    data: newIssue,
    message: "Issue creation was successful",
  });
}
