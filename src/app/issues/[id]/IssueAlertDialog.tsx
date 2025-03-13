"use client";
import AlertDialog from "@/components/AlertDialog";
import { ApiClient } from "@/services/ApiClient";
import Toast from "@/services/Toast";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function IssueAlertDialog({ issueId }: { issueId: number }) {
  const apiClient = new ApiClient(`/api/issues/${issueId}`);
  const router = useRouter();
  const toast = new Toast("Issue has been successfully deleted.", "success");

  return (
    <AlertDialog
      trigger={
        <Button style={{ cursor: "pointer" }} color="red">
          <AiFillCloseCircle />
          Delete Issue
        </Button>
      }
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
        toast.showToast();
      }}
    />
  );
}

export default IssueAlertDialog;
