"use client";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type Props = { open: number; inProgress: number; closed: number };

function IssuesBarChart({ open, inProgress, closed }: Props) {
  const data: { label: string; count: number }[] = [
    { label: "Open", count: open },
    { label: "In Progress", count: inProgress },
    { label: "Closed", count: closed },
  ];

  return (
    <ResponsiveContainer className={"mx-auto"} width={"60%"} height={300}>
      <BarChart data={data}>
        <XAxis dataKey={"label"} />
        <YAxis />
        <Bar className="fill-violet-700" dataKey={"count"} barSize={60}></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default IssuesBarChart;
