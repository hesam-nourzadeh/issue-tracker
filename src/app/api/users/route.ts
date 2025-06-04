import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(nextRequest: NextRequest) {
  const session = await getServerSession(authOptions);
  const adminUserEmail = session?.user?.email;

  if (!adminUserEmail)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const adminUser = await prisma.user.findUnique({
    where: { email: adminUserEmail! },
  });

  if (!adminUser?.isAdmin)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const users = await prisma.user.findMany();

  return NextResponse.json(users, { status: 200 });
}
