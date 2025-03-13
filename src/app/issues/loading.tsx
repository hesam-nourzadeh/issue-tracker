import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingIssuePage() {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div className="m-8">
      <SkeletonTheme
        baseColor="rgba(160,160,160, 0.3)"
        highlightColor="rgba(160,160,160, 0.5)"
      >
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
      </SkeletonTheme>
    </div>
  );
}

export default LoadingIssuePage;
