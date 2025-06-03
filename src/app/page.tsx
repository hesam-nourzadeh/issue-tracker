export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  Avatar,
  Card,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import prisma from "../../prisma/client";
import StatusBadge from "@/components/IssueStatusBadge";
import IssueSummary from "@/components/IssueSummary";
import IssuesBarChart from "@/components/BarChart";
import { Metadata } from "next";

export default async function Home() {
  const issues = await prisma.issue.findMany({
    take: 10,
    include: { assignedToUser: true },
  });

  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const open = await prisma.issue.count({ where: { status: "OPEN" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Flex direction={"column"} align={{ initial: "stretch", md: "center" }}>
        <IssueSummary closed={closed} inProgress={inProgress} open={open} />
        <IssuesBarChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <Card className="m-10">
        <Heading size={"7"} className="m-2">
          Recent Issues
        </Heading>
        {issues.map((issue, index) => (
          <div key={index}>
            <Flex m={"5"} key={index} justify={"between"} align={"center"}>
              <Flex className="flex-col items-start space-y-2">
                <Text className="from-neutral-700 font-normal" size={"4"}>
                  {issue.title}
                </Text>
                <StatusBadge status={issue.status} />
              </Flex>
              <Avatar
                mx={{ initial: "5", sm: "0" }}
                radius="full"
                size={"4"}
                src={issue.assignedToUser?.image!}
                fallback={"?"}
              />
            </Flex>
            <Separator size={"3"} color="gold" className="w-full" />
          </div>
        ))}
      </Card>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker | Home Page",
};
