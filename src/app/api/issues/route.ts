import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../../../prisma/schemas";
import prisma from "../../../../prisma/client";
import { Issue } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(nextRequest: NextRequest) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const issues = await prisma.issue.findMany();

  return NextResponse.json({
    data: issues,
    message: "Issues fethced successfully",
    status: 200,
  });
}

export async function POST(nextRequest: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body: Issue = await nextRequest.json();
    const validation = IssueSchema.safeParse(body);

    const user = await prisma.user.findUnique({ where: { email: userEmail! } });

    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!validation.success)
      return NextResponse.json(
        { message: "Validation Failed", error: validation.error.format() },
        { status: 403 }
      );

    console.log(user.id);
    const newIssue = await prisma.issue
      .create({
        data: {
          title: body.title,
          description: body.description,
          assignedToUser: { connect: { id: user.id } },
        },
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
  } catch (error) {
    return NextResponse.error();
  }
}
