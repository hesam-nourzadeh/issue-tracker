import { Button, Flex, Table } from "@radix-ui/themes";
import Link from "@/components/Link";
import NextLink from "next/link";
import React from "react";
import prisma from "../../../../prisma/client";
import StatusBadge from "@/components/StatusBadge";
import IssueFilterSelect from "@/components/IssueFilterSelect";
import { Issue, Status } from "@prisma/client";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type Prop = {
  searchParams: { status?: Status; sortBy?: keyof Issue };
};

const columns: { label: string; value: keyof Issue; classname?: string }[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  { label: "Creation", value: "createdAt", classname: "hidden sm:block" },
];

async function IssueListPage({ searchParams }: Prop) {
  // Issues should not be fetched directly. I should fix this
  const issues = await prisma.issue.findMany({
    where: { status: searchParams.status },
  });

  return (
    <div className="m-8">
      <Flex className="flex-col space-y-4 sm:space-y-0 items-stretch sm:flex-row sm:justify-between lg:w-3/12">
        <IssueFilterSelect />
        <NextLink href={"/issues/new"} className="mx-auto sm:mx-0">
          <Button style={{ cursor: "pointer" }}>New Issue</Button>
        </NextLink>
      </Flex>
      <Table.Root my={"5"} size={"3"} variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column, index) => (
              <Table.ColumnHeaderCell key={index} className={column.classname}>
                <NextLink
                  href={{ query: { ...searchParams, sortBy: column.value } }}
                >
                  {column.label}
                  {searchParams.sortBy === column.value ? (
                    <BiChevronUp
                      style={{ display: "inline" }}
                      size={"1.1rem"}
                    />
                  ) : (
                    <BiChevronDown
                      style={{ display: "inline" }}
                      size={"1.1rem"}
                    />
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((value, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Link href={`/issues/${value.id}`}>{value.title}</Link>
              </Table.Cell>
              <Table.Cell>
                <StatusBadge status={value.status} />
              </Table.Cell>
              <Table.Cell className="hidden sm:block">
                {value.createdAt.toString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssueListPage;
