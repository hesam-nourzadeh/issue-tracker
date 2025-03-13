import IssueFormSkeleton from "@/components/Placeholder/IssueFormSkeleton";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/components/IssueForm"), {
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
