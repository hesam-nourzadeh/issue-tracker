"use client";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import Spinner from "./Spinner";

function Navbar() {
  const currentPath = usePathname();
  const { status, data } = useSession();

  const authLinkClassname =
    "text-zinc-500 hover:text-zinc-800 justify-self-end";

  return (
    <nav className="p-7 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 font-medium border-b-2 border-gray-500 text-xl">
      <Box className="flex flex-col sm:flex-row sm:space-x-7 space-y-2 sm:space-y-0 items-center">
        <Link href="/" className="text-3xl">
          <AiFillBug />
        </Link>
        <Link
          className={`${
            currentPath === "/dashboard" ? "text-zinc-800" : "text-zinc-500"
          } hover:text-zinc-800 transition-colors`}
          href="/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className={`${
            currentPath === "/issues/list" ? "text-zinc-800" : "text-zinc-500"
          } hover:text-zinc-800 transition-colors`}
          href="/issues/list"
        >
          Issues
        </Link>
      </Box>
      <Box>
        {status === "loading" && (
          <Box>
            <Spinner
              className="-translate-x-4 -translate-y-3 py-2.5 sm:p-0 sm:-translate-x-10 sm:-translate-y-3"
              spinnerColor="zinc"
            />
          </Box>
        )}
        {status === "authenticated" && (
          <Link className={authLinkClassname} href={"/api/auth/signout"}>
            Logout
          </Link>
        )}
        {status === "unauthenticated" && (
          <Link className={authLinkClassname} href={"/api/auth/signin"}>
            Login
          </Link>
        )}
      </Box>
    </nav>
  );
}

export default Navbar;
