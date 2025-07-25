import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import prisma from "../../../../../prisma/client";

type Params = { params: { id: string } };

export async function DELETE(nextRequest: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    const adminUserEmail = session?.user?.email;

    if (!adminUserEmail)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const adminUser = await prisma.user.findUnique({
      where: { email: adminUserEmail! },
    });

    if (!adminUser?.isAdmin)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = params.id;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user)
      return NextResponse.json({ message: "No user found", status: 404 });

    const deletedUser = await prisma.user.delete({ where: { id: user.id } });

    return NextResponse.json({
      message: "User deleted and their issues became unassigned",
      deletedUser,
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(nextRequest: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    const adminUserEmail = session?.user?.email;

    if (!adminUserEmail)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const adminUser = await prisma.user.findUnique({
      where: { email: adminUserEmail! },
    });

    if (!adminUser?.isAdmin)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = params.id;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user)
      return NextResponse.json({ message: "No user found", status: 404 });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { isAdmin: !user.isAdmin },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.error();
  }
}
