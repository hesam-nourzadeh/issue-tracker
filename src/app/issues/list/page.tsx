import { Button, Flex, Table } from "@radix-ui/themes";
import Link from "@/components/Link";
import NextLink from "next/link";
import React from "react";
import prisma from "../../../../prisma/client";
import StatusBadge from "@/components/StatusBadge";
import IssueFilterSelect from "@/components/IssueFilterSelect";
import { Status } from "@prisma/client";

type Prop = {
  searchParams: { status: Status };
};

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
            <Table.ColumnHeaderCell>title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden sm:block">
              Creation
            </Table.ColumnHeaderCell>
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
