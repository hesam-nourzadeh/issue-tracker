// app/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/authOptions";
import prisma from "../../../prisma/client";

const getUsersPath = "/api/users";
const adminPaths = ["/api/issues/", getUsersPath];
const GET_METHOD = "GET";
const POST_METHOD = "POST";

async function authMiddleware(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}

async function adminOrSelfMiddleware(
  request: NextRequest,
  params: { id: string }
) {
  let id: number;
  console.log("admin mddleware");
  try {
    id = parseInt(params.id);
  } catch (error) {
    return NextResponse.json({ message: "Bad input" }, { status: 400 });
  }

  const { pathname } = request.nextUrl;

  if (
    (request.method === GET_METHOD || request.method === POST_METHOD) &&
    pathname !== getUsersPath
  )
    return NextResponse.next();

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const user = await prisma.user.findUnique({ where: { email: userEmail! } });

  if (!user?.isAdmin) {
    const issue = await prisma.issue.findUnique({
      where: { id, assignedToUser: { email: userEmail! } },
    });

    if (!issue)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

type Params = { params: { id: string } };

export async function middleware(request: NextRequest, { params }: Params) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api")) {
    return authMiddleware(request);
  }

  if (adminPaths.some((path) => pathname.startsWith(path))) {
    return adminOrSelfMiddleware(request, params);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api"],
};
