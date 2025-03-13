"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import MarkdownEditor from "@uiw/react-markdown-editor";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { createIssueSchema } from "../../../prisma/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiClient } from "@/services/ApiClient";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

type Issue = z.infer<typeof createIssueSchema>;

function CreateIssue() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Issue>({ resolver: zodResolver(createIssueSchema) });

  const router = useRouter();
  const [apiError, setApiError] = useState<AxiosError>();

  const onSubmit = async (data: Issue) => {
    try {
      const apiClient = new ApiClient<Issue>("/api/issues");
      const newIssue = await apiClient.create(data);
      console.log(newIssue);
      router.replace("/");
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
            placeholder="hello"
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
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

export default CreateIssue;
