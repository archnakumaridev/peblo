import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
try {
      const { email, password } = await req.json();
    
      if (!email || !password) {
        return NextResponse.json({ error: "All fields required" }, { status: 400 });
      }
    
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
    
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
    
      await createSession(user.id);
      return NextResponse.json({ success: true },{status:200});
} catch (error) {
    console.error(
        "entire api crashes",error
    )

    return NextResponse.json({error:"internal server error"},{status:500
    })
}
}