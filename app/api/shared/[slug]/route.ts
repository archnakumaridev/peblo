import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const params = await context.params
  const shareLink = await prisma.shareLink.findUnique({
    where: { slug: params.slug },
    include: {
      note: {
        include: { tags: true, user: { select: { name: true } } },
      },
    },
  });

  if (!shareLink) {
    return NextResponse.json({ error: "Note not found or link is invalid" }, { status: 404 });
  }

  const { note } = shareLink;
  return NextResponse.json({
    title: note.title,
    content: note.content,
    tags: note.tags,
    author: note.user.name,
    updatedAt: note.updatedAt,
    aiSummary: note.aiSummary,
  });
}