import React from "react";
import LoadingTheme from "./LoadingTheme";
import Link from "next/link";
import { Button, Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

function IssueListSkeleton({ issues }: { issues: number[] }) {
  return (
    <div className="m-8">
      <LoadingTheme>
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
            {issues.map((value) => (
              <Table.Row key={value}>
                <Table.Cell>
                  <Skeleton width={"50%"} />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton width={"50%"} />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton width={"50%"} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </LoadingTheme>
    </div>
  );
}

export default IssueListSkeleton;
