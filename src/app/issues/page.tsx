import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import prisma from "../../../prisma/client";
import StatusBadge from "@/components/StatusBadge";

async function IssuesPage() {
  const issues = await prisma.issue.findMany();
  const delay = new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 3000);
  });

  await delay;

  return (
    <div className="m-8">
      <Link href={"/create-issue"}>
        <Button style={{ cursor: "pointer" }}>New Issue</Button>
      </Link>
      <Table.Root my={"5"} size={"3"} variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Creation</Table.ColumnHeaderCell>
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
              <Table.Cell>{value.createdAt.toString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default IssuesPage;
