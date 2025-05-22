export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import prisma from "../../../../prisma/client";
import { Status } from "@prisma/client";
import { Metadata } from "next";
import IssueList, {
  columns,
  issuesListPageSize,
  SearchParams,
} from "@/components/IssueList";

type Prop = {
  searchParams: SearchParams;
};

async function IssuesListPage({ searchParams }: Prop) {
  const statuses = Object.values(Status);
  const isValidStatus = statuses.includes(searchParams.status!);
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.sortBy!)
    ? { [searchParams.sortBy as string]: "desc" }
    : undefined;

  const currentPage = parseInt(searchParams.page!) || 1;
  const whereClause = {
    status: isValidStatus ? searchParams.status : undefined,
  };

  // Issues should not be fetched directly. I should fix this
  const issues = await prisma.issue.findMany({
    where: whereClause,
    orderBy,
    skip: (currentPage - 1) * issuesListPageSize,
    take: issuesListPageSize,
  });
  const issuesCount = await prisma.issue.count({
    where: whereClause,
  });

  return (
    <IssueList
      issues={issues}
      searchParams={searchParams}
      issuesCount={issuesCount}
      key={1}
    />
  );
}
export const metadata: Metadata = {
  title: "Issues List",
};

export default IssuesListPage;
