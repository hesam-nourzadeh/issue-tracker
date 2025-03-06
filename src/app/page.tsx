import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <Button m={"4"}>
      <Link href={"/create-issue"}>Create an issue</Link>
    </Button>
  );
}
