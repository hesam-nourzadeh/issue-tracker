"use client";
import AlertDialog from "@/components/AlertDialog";
import { Button } from "@radix-ui/themes";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function IssueAlertDialog() {
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
      action={() => {
        console.log("cyka");
      }}
    />
  );
}

export default IssueAlertDialog;
