"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

import { useTheme } from "next-themes";

interface Props {
  data: {
    day: string;
    count: number;
  }[];
}

export default function WeeklyChart({
  data,
}: Props) {
  const { theme } =
    useTheme();

  const barColor =
    theme === "dark"
      ? "#ffffff"
      : "#18181b";

  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Weekly Activity
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Notes created this week
        </p>
      </div>

      <div className="h-[300px] w-full min-w-0">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <XAxis
              dataKey="day"
              stroke={
                theme === "dark"
                  ? "#a1a1aa"
                  : "#52525b"
              }
            />

            <Tooltip />

            <Bar
              dataKey="count"
              radius={[
                8, 8, 0, 0,
              ]}
              fill={barColor}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}