import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusBadge from "./StatusBadge";

type Props = { open: number; inProgress: number; closed: number };

function IssueSummary({ open, inProgress, closed }: Props) {
  const statuses: { status: Status; count: number }[] = [
    { status: "OPEN", count: open },
    { status: "IN_PROGRESS", count: inProgress },
    { status: "CLOSED", count: closed },
  ];

  return (
    <Flex className="flex-col sm:flex-row justify-center sm:items-center my-5 sm:space-x-8 mx-3 sm:mx-auto space-y-3 sm:space-y-0">
      {statuses.map(({ status, count }, index) => (
        <Link
          className="text-blue-900"
          href={{ pathname: "/issues/list", query: { status } }}
          key={index}
        >
          <Card
            style={{ cursor: "pointer" }}
            className="text-center p-3 hover:bg-slate-300 border-slate-100"
          >
            <StatusBadge
              classname="cursor-pointer bg-inherit font-semibold"
              status={status}
            />
            <Text size={"5"} className="block mx-auto font-bold text-center">
              {count}
            </Text>
          </Card>
        </Link>
      ))}
    </Flex>
  );
}

export default IssueSummary;
