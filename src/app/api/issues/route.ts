import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../../../prisma/schemas";
import prisma from "../../../../prisma/client";
import { Issue } from "@prisma/client";

export async function POST(nextRequest: NextRequest) {
  const body: Issue = await nextRequest.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors, message: "Validation failed" },
      { status: 403 }
    );

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  NextResponse.json({
    data: newIssue,
    message: "Issue creation was successful",
  });
}
