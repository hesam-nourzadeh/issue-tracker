import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/client";

export async function GET(nextRequest: NextRequest) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: userEmail! } });

  if (!user?.isAdmin)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const issues = await prisma.issue.findMany();

  return NextResponse.json({
    data: issues,
    message: "Issues fethced successfully",
  });
}
