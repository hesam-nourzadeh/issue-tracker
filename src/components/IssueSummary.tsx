import { Status } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusBadge from "./StatusBadge";

type Prop = { open: number; inProgress: number; closed: number };

function IssueSummary({ open, inProgress, closed }: Prop) {
  const statuses: { status: Status; count: number }[] = [
    { status: "OPEN", count: open },
    { status: "IN_PROGRESS", count: inProgress },
    { status: "CLOSED", count: closed },
  ];

  return (
    <Flex className="flex-row justify-center items-center my-5 space-x-8">
      {statuses.map(({ status, count }, index) => (
        <Link
          className="text-blue-900"
          href={{ pathname: "/issues/list", query: { status } }}
          key={index}
        >
          <Card
            style={{ cursor: "pointer" }}
            className="text-center p-3 hover:bg-slate-300"
          >
            <StatusBadge
              classname="cursor-pointer bg-inherit font-semibold"
              status={status}
            />
            <Text size={"5"} className="block mx-auto font-bold">
              {count}
            </Text>
          </Card>
        </Link>
      ))}
    </Flex>
  );
}

export default IssueSummary;
