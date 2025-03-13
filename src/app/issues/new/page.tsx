import IssueFormSkeleton from "@/components/IssueFormSkeleton";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

function CreatePage() {
  return <IssueForm />;
}

export default CreatePage;
