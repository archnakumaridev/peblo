"use client";

import StatsCards from "@/components/dashboard/StatsCards";

import WeeklyChart from "@/components/dashboard/WeeklyChart";

import RecentNotes from "@/components/dashboard/RecentNotes";

import TopTags from "@/components/dashboard/TopTags";

import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const {
    data,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <DashboardSkeleton />
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-[60vh] items-center justify-center px-4 text-center">
        <p className="text-sm text-zinc-500 sm:text-base">
          Failed to load dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Dashboard
        </h1>

        <p className="max-w-2xl text-sm text-zinc-500 sm:text-base">
          Productivity insights and workspace analytics.
        </p>
      </div>

      {/* Stats */}
      <StatsCards
        totalNotes={
          data.totalNotes
        }
        aiUsageCount={
          data.aiUsageCount
        }
        totalTags={
          data.topTags.length
        }
      />

      {/* Chart */}
      <div className="min-w-0">
        <WeeklyChart
          data={
            data.weeklyActivity
          }
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="min-w-0">
          <RecentNotes
            notes={
              data.recentNotes
            }
          />
        </div>

        <div className="min-w-0">
          <TopTags
            tags={data.topTags}
          />
        </div>
      </div>
    </div>
  );
}