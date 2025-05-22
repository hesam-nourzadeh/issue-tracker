export const dynamic = "force-dynamic";
export const revalidate = 0;

import IssueFormSkeleton from "@/components/Placeholder/IssueFormSkeleton";
import { Metadata } from "next";
import nextDynamic from "next/dynamic";

const IssueForm = nextDynamic(() => import("@/components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

function CreatePage() {
  return <IssueForm />;
}

export const metadata: Metadata = {
  title: "Create An Issue",
  description: "Create and save issues",
};

export default CreatePage;
