import { Button, Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";
import prisma from "../../../../prisma/client";
import IssueFilterSelect from "@/components/Selects/IssueFilterSelect";
import { Issue, Status } from "@prisma/client";
import Pagination from "@/components/Pagination";
import { default as TableHeader } from "@/components/Table/Header";
import { default as TableBody } from "@/components/Table/Body";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export type SearchParams = {
  status?: Status;
  sortBy?: keyof Issue;
  page?: string;
};

export type Column = { label: string; value: keyof Issue; classname?: string };

type Prop = {
  searchParams: SearchParams;
};

const columns: Column[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  { label: "Creation", value: "createdAt", classname: "hidden sm:block" },
];

async function IssueListPage({ searchParams }: Prop) {
  const user = await getServerSession();
  console.log(user?.user?.email);
  const statuses = Object.values(Status);
  const isValidStatus = statuses.includes(searchParams.status!);
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.sortBy!)
    ? { [searchParams.sortBy as string]: "desc" }
    : undefined;
  // Issues should not be fetched directly. I should fix this
  const currentPage = parseInt(searchParams.page!) || 1;
  const pageSize = 10;

  const whereClause = {
    status: isValidStatus ? searchParams.status : undefined,
  };

  const issues = await prisma.issue.findMany({
    where: whereClause,
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });
  const issuesCount = await prisma.issue.count({ where: whereClause });

  return (
    <div className="m-8">
      <Flex className="flex-col space-y-4 sm:space-y-0 items-stretch sm:flex-row sm:justify-between lg:w-3/12">
        <IssueFilterSelect />
        <NextLink href={"/issues/new"} className="mx-auto sm:mx-0">
          <Button style={{ cursor: "pointer" }}>New Issue</Button>
        </NextLink>
      </Flex>
      <Table.Root my={"5"} size={"3"} variant="surface">
        <TableHeader columns={columns} searchParams={searchParams} />
        <TableBody issues={issues} />
      </Table.Root>
      <Flex justify={"center"}>
        <Pagination
          itemCount={issuesCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </Flex>
    </div>
  );
}
export const metadata: Metadata = {
  title: "Issues List",
  description: "List the current issues with applied filters",
};

export const dynamic = "force-dynamic";

export default IssueListPage;
