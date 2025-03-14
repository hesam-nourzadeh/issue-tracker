"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

function Navbar() {
  const currentPath = usePathname();

  return (
    <nav className="p-7 flex flex-row items-center font-medium space-x-7 border-b-2 border-gray-500 text-xl">
      <Link href="/" className="text-3xl">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-7">
        <li>
          <Link
            className={`${
              currentPath === "/dashboard" ? "text-zinc-800" : "text-zinc-500"
            } hover:text-zinc-800 transition-colors`}
            href="/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className={`${
              currentPath === "/issues/list" ? "text-zinc-800" : "text-zinc-500"
            } hover:text-zinc-800 transition-colors`}
            href="/issues/list"
          >
            Issues
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
