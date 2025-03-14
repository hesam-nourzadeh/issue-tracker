import { Button, Table } from "@radix-ui/themes";
import Link from "@/components/Link";
import NextLink from "next/link";
import React from "react";
import prisma from "../../../prisma/client";
import StatusBadge from "@/components/StatusBadge";

async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div className="m-8">
      <NextLink href={"/issues/new"}>
        <Button style={{ cursor: "pointer" }}>New Issue</Button>
      </NextLink>
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

export default IssuesPage;
