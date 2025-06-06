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

  const action = async () => {
    try {
      await apiClient.delete();
      router.replace("/issues/list");
      router.refresh();
      Toast.showToast("Issue has been successfully deleted.", "success");
    } catch (error) {
      Toast.showToast(`An unknown error occured`, "error");
      console.error(error);
    }
  };

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
      action={action}
    />
  );
}

export default IssueAlertDialog;
