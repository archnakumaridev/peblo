import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

export async function POST() {

 try {
       
     await deleteSession();
     return NextResponse.json({ success: true });
 } catch (error) {
      console.error(
        "entire api crashes",error
    )

    return NextResponse.json({error:"internal server error"},{status:500
    })
 }
}