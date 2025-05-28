"use client";
import AlertDialog from "@/components/AlertDialog";
import { ApiClient } from "@/services/ApiClient";
import Toast from "@/services/Toast";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { ReactElement } from "react";

type Props = {
  trigger: ReactElement;
  issueId: number;
};

function IssueAlertDialog({ trigger, issueId }: Props) {
  const apiClient = new ApiClient(`/api/issues/${issueId}`);
  const router = useRouter();

  return (
    <AlertDialog
      trigger={trigger}
      title="Issue Deletion"
      description="Are you sure you want to delete this issue ?"
      actionButton={
        <Button style={{ cursor: "pointer" }} color="red">
          Delete
        </Button>
      }
      action={async () => {
        await apiClient.delete();
        router.replace("/issues/list");
        router.refresh();
        Toast.showToast("Issue has been successfully deleted.", "success");
      }}
    />
  );
}

export default IssueAlertDialog;
