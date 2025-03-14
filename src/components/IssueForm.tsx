"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createIssueSchema } from "../../prisma/schemas";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ApiClient } from "@/services/ApiClient";
import { Button, Callout, TextField } from "@radix-ui/themes";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import z from "zod";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});
type Issue = z.infer<typeof createIssueSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Issue>({ resolver: zodResolver(createIssueSchema) });

  const router = useRouter();
  const [apiError, setApiError] = useState<AxiosError>();

  const onSubmit = async (data: Issue) => {
    try {
      const apiClient = new ApiClient<Issue>("/api/issues");
      const newIssue = await apiClient.create(data);
      console.log(newIssue);
      router.replace("/issues");
    } catch (err) {
      setApiError(err as AxiosError);
    }
  };
  return (
    <div className="max-w-xl m-10">
      <form
        className="space-y-1"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <TextField.Root>
          <TextField.Input
            {...register("title", { required: true })}
            placeholder="title"
            defaultValue={issue?.title}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          rules={{ required: true }}
          render={({ field }) => <MarkdownEditor height={"150px"} {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        {isSubmitting ? <Spinner /> : <Button type="submit">Create</Button>}
        {apiError && (
          <Callout.Root>
            {errors.description && (
              <Callout.Text color="red">{apiError.message}</Callout.Text>
            )}
          </Callout.Root>
        )}
      </form>
    </div>
  );
}

export default IssueForm;
