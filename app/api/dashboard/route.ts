import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.userId;


  const [totalNotes, recentNotes, allNotes, aiUsage] = await Promise.all([
  
    prisma.note.count({
      where: { userId, archived: false },
    }),

    prisma.note.findMany({
      where: { userId, archived: false },
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, updatedAt: true },
    }),

    prisma.note.findMany({
      where: { userId },
      include: { tags: true },
    }),

    // Total AI usage
    prisma.note.aggregate({
      where: { userId },
      _sum: { aiUsageCount: true },
    }),
  ]);

  const tagCount: Record<string, number> = {};
  allNotes.forEach((note) => {
    note.tags.forEach((tag) => {
      tagCount[tag.name] = (tagCount[tag.name] || 0) + 1;
    });
  });
  const topTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));


  const weeklyActivity = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const day = date.toISOString().split("T")[0];
    const count = allNotes.filter((n) => n.updatedAt.toISOString().split("T")[0] === day).length;
    return { day, count };
  });

  return NextResponse.json({
    totalNotes,
    recentNotes,
    topTags,
    aiUsageCount: aiUsage._sum.aiUsageCount || 0,
    weeklyActivity,
  });
}