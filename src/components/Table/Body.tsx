import { Issue } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "../StatusBadge";
import Link from "next/link";

function Body({ issues }: { issues: Issue[] }) {
  if (!issues || issues.length === 0) return null;
  return (
    <Table.Body>
      {issues.map((value, index) => (
        <Table.Row key={index} className="hover:bg-blue-50">
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
  );
}

export default Body;
