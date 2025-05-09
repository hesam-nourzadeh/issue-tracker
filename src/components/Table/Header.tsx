import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Column, SearchParams } from "../IssueList";

function TableHeader({
  searchParams,
  columns,
}: {
  searchParams: SearchParams;
  columns: Column[];
}) {
  return (
    <Table.Header>
      <Table.Row>
        {columns.map((column, index) => (
          <Table.ColumnHeaderCell key={index} className={column.classname}>
            <Link href={{ query: { ...searchParams, sortBy: column.value } }}>
              {column.label}
              {searchParams.sortBy === column.value ? (
                <BiChevronUp style={{ display: "inline" }} size={"1.1rem"} />
              ) : (
                <BiChevronDown style={{ display: "inline" }} size={"1.1rem"} />
              )}
            </Link>
          </Table.ColumnHeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}

export default TableHeader;
