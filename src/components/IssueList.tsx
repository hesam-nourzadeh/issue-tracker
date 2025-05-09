import { Box, Button, Flex, Table } from "@radix-ui/themes";
import React from "react";
import IssueFilterSelect from "./Selects/IssueFilterSelect";
import NextLink from "next/link";
import TableHeader from "./Table/Header";
import TableBody from "./Table/Body";
import Pagination from "./Pagination";
import { Issue, Status } from "@prisma/client";
import Alert from "./Alert";

export type SearchParams = {
  status?: Status;
  sortBy?: keyof Issue;
  page?: string;
};

export type Column = { label: string; value: keyof Issue; classname?: string };

export const columns: Column[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  { label: "Creation", value: "createdAt", classname: "hidden sm:block" },
];

type Props = {
  issues: Issue[];
  searchParams: SearchParams;
  issuesCount: number;
};

export const issuesListPageSize = 10;

function IssueList({ searchParams, issues, issuesCount }: Props) {
  const currentPage = parseInt(searchParams.page!) || 1;
  const pageSize = 10;
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
        {issues && issues.length > 0 ? (
          <TableBody issues={issues} />
        ) : (
          <Table.Row>
            <Table.Cell className="p-0" colSpan={3}>
              <Alert
                text="No issues found."
                bgColor="bronze"
                textColor="orange"
                className="w-full"
              />
            </Table.Cell>
          </Table.Row>
        )}
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

export default IssueList;
