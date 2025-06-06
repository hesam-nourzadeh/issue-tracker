import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/client";

export async function GET(nextRequest: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const issues = await prisma.issue.findMany({
      include: { assignedToUser: true },
    });

    return NextResponse.json({
      data: issues,
      message: "Issues fethced successfully",
    });
  } catch (error) {
    return NextResponse.error();
  }
}
