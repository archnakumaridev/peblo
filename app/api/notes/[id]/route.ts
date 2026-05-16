import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";


export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
try {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const params = await context.params
      const note = await prisma.note.findFirst({
        where: { id: params.id, userId: session.userId },
        include: { tags: true, shareLink: true },
      });
    
      if (!note) return NextResponse.json({ error: "Note not found" }, { status: 404 });
    
      return NextResponse.json(note);
} catch (error) {
               console.error(
        "entire api crashes",error
    )

    return NextResponse.json({error:"internal server error"},{status:500
    })
}
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
 try {
     const session = await getSession();
     if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   const params = await context.params
     const existing = await prisma.note.findFirst({
       where: { id: params.id, userId: session.userId },
     });
     if (!existing) return NextResponse.json({ error: "Note not found" }, { status: 404 });
   
     const { title, content, archived, tags } = await req.json();
   
     const note = await prisma.note.update({
       where: { id: params.id },
       data: {
         ...(title !== undefined && { title }),
         ...(content !== undefined && { content }),
         ...(archived !== undefined && { archived }),
         ...(tags !== undefined && {
           tags: {
             set: [],
             connectOrCreate: tags.map((name: string) => ({
               where: { name },
               create: { name },
             })),
           },
         }),
       },
       include: { tags: true, shareLink: true },
     });
   
     return NextResponse.json(note);
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
     const existing = await prisma.note.findFirst({
       where: { id: params.id, userId: session.userId },
     });
     if (!existing) return NextResponse.json({ error: "Note not found" }, { status: 404 });
   
     await prisma.note.delete({ where: { id: params.id } });
   
     return NextResponse.json({ success: true });
 } catch (error) {
               console.error(
        "entire api crashes",error
    )

    return NextResponse.json({error:"internal server error"},{status:500
    })
 }
}