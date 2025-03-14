import {
  Avatar,
  Card,
  Flex,
  Heading,
  Separator,
  Table,
  Text,
} from "@radix-ui/themes";
import prisma from "../../prisma/client";
import StatusBadge from "@/components/StatusBadge";

export default async function Home() {
  const issues = await prisma.issue.findMany({
    take: 10,
    include: { assignedToUser: true },
  });

  return (
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
  );
}

export const dynamic = "force-dynamic";
