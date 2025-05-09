"use client";
import React from "react";
import MarkdownEditor from "react-markdown";

function MarkDown({ text }: { text: string }) {
  return <MarkdownEditor>{text}</MarkdownEditor>;
}

export default MarkDown;
