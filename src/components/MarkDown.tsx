"use client";
import React from "react";
import MarkdownEditor from "react-markdown";

function MarkDown({ text }: { text: string }) {
  return <MarkdownEditor className={"w-full"}>{text}</MarkdownEditor>;
}

export default MarkDown;
