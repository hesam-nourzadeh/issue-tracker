"use client";
import { Button, TextField } from "@radix-ui/themes";
import MarkdownEditor from "@uiw/react-markdown-editor";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { createIssueSchema } from "../../../prisma/schemas";
import { ApiClient } from "@/services/ApiClient";
import { useRouter } from "next/navigation";

type Issue = z.infer<typeof createIssueSchema>;

function CreateIssue() {
  const { register, control, handleSubmit } = useForm<Issue>();
  const router = useRouter();

  const onSubmit = async (data: Issue) => {
    const apiClient = new ApiClient<Issue>("/api/issues");
    const newIssue = await apiClient.create(data);
    console.log(newIssue);
    router.replace("/");
  };

  return (
    <form
      className="max-w-xl space-y-1 m-10"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <TextField.Root>
        <TextField.Input {...register("title")} placeholder="hello" />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <MarkdownEditor height={"150px"} {...field} />}
      />
      <Button>Create</Button>
    </form>
  );
}

export default CreateIssue;
