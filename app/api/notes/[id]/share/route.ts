import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { nanoid } from "nanoid";


export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
try {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     const params = await context.params
      const note = await prisma.note.findFirst({
        where: { id: params.id, userId: session.userId },
      });
      if (!note) return NextResponse.json({ error: "Note not found" }, { status: 404 });
    
      const existing = await prisma.shareLink.findUnique({ where: { noteId: params.id } });
      if (existing) {
        return NextResponse.json({ slug: existing.slug, url: `/shared/${existing.slug}` });
      }
    
      const slug = nanoid(10);
      const shareLink = await prisma.shareLink.create({
        data: { slug, noteId: params.id },
      });
    
      return NextResponse.json({ slug: shareLink.slug, url: `/shared/${shareLink.slug}` });
} catch (error) {
                 console.error(
        "entire api crashes",error
    )

    return NextResponse.json({error:"internal server error"},{status:500
    })
}
}


export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
try {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const params = await context.params
      const note = await prisma.note.findFirst({
        where: { id: params.id, userId: session.userId },
      });
      if (!note) return NextResponse.json({ error: "Note not found" }, { status: 404 });
    
      await prisma.shareLink.deleteMany({ where: { noteId: params.id } });
    
      return NextResponse.json({ success: true });
} catch (error) {
                 console.error(
        "entire api crashes",error
    )

    return NextResponse.json({error:"internal server error"},{status:500
    })
}
}