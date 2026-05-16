import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
try {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
      const { searchParams } = new URL(req.url);
      const search = searchParams.get("search") || "";
      const tag = searchParams.get("tag") || "";
      const archived = searchParams.get("archived") === "true";
    
      const notes = await prisma.note.findMany({
        where: {
          userId: session.userId,
          archived,
          ...(search && {
            OR: [
              { title: { contains: search } },
              { content: { contains: search } },
            ],
          }),
          ...(tag && {
            tags: { some: { name: tag } },
          }),
        },
        include: { tags: true, shareLink: true },
        orderBy: { updatedAt: "desc" },
      });
    
      return NextResponse.json({notes},{status:200});
} catch (error) {
            console.error(
        "entire api crashes",error
    )

    return NextResponse.json({error:"internal server error"},{status:500
    })
}
}


export async function POST(req: NextRequest) {
try {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
      const { title, content, tags } = await req.json();
    
      if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
      }
    
      const note = await prisma.note.create({
        data: {
          title,
          content: content || "",
          userId: session.userId,
          tags: {
            connectOrCreate: (tags || []).map((name: string) => ({
              where: { name },
              create: { name },
            })),
          },
        },
        include: { tags: true, shareLink: true },
      });
    
      return NextResponse.json(note, { status: 201 });
} catch (error) {
            console.error(
        "entire api crashes",error
    )

    return NextResponse.json({error:"internal server error"},{status:500
    })
}
}