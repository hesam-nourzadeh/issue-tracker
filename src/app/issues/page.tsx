import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import prisma from "../../../prisma/client";

async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div className="m-8">
      <Link href={"/create-issue"}>
        <Button style={{ cursor: "pointer" }}>New Issue</Button>
      </Link>
      <Table.Root my={"5"} size={"3"} variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>1</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>1</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>1</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>1</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((value, index) => (
            <Table.Row key={index}>
              <Table.Cell>{value.title}</Table.Cell>
              <Table.Cell>{value.status}</Table.Cell>
              <Table.Cell>{value.createdAt.toString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default IssuesPage;
