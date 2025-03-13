"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

function page() {
  return (
    <div className="max-w-xl space-y-1 m-10">
      <TextField.Root>
        <TextField.Input placeholder="hello" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Create</Button>
    </div>
  );
}

export default page;
