import IssueListSkeleton from "@/components/Placeholder/IssueListSkeleton";
import React from "react";

function LoadingIssuePage() {
  const issues = [1, 2, 3, 4, 5];

  return <IssueListSkeleton issues={issues} />;
}

export default LoadingIssuePage;
