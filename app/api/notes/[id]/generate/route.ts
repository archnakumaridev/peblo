import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const params = await context.params
  const note = await prisma.note.findFirst({
    where: { id: params.id, userId: session.userId },
  });

  if (!note) return NextResponse.json({ error: "Note not found" }, { status: 404 });

  if (!note.content || note.content.trim().length < 10) {
    return NextResponse.json({ error: "Note content is too short to summarize" }, { status: 400 });
  }

  // Groq API call (OpenAI-compatible)
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Given a note, respond ONLY with a valid JSON object with no extra text, no markdown, no backticks. Format:
{
  "summary": "2-3 sentence summary",
  "action_items": ["item 1", "item 2"],
  "suggested_title": "short title"
}`,
        },
        {
          role: "user",
          content: `Note title: ${note.title}\n\nNote content: ${note.content}`,
        },
      ],
      temperature: 0.5,
    }),
  });
  
  if (!response.ok) {
    return NextResponse.json({ error: "AI service failed", }, { status: 500 });
  }

  const data = await response.json();
  const raw = data.choices[0].message.content;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
  }

  // Save to DB and increment usage count
  const updated = await prisma.note.update({
    where: { id: params.id },
    data: {
      aiSummary: parsed.summary,
      aiActions: JSON.stringify(parsed.action_items),
      aiSuggestedTitle: parsed.suggested_title,
      aiUsageCount: { increment: 1 },
    },
    include: { tags: true, shareLink: true },
  });



  return NextResponse.json({
    summary: updated.aiSummary,
    action_items: parsed.action_items,
    suggested_title: updated.aiSuggestedTitle,
  });
}