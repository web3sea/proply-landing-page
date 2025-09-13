import { NextResponse } from "next/server";
import { addToBrevoList } from "@/lib/brevo";

export async function POST(req: Request) {
  try {
    const { email, name, company } = await req.json();

    if (!email || !name || !company) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await addToBrevoList({ email, name, company });

    return NextResponse.json(
      {
        success: result.ok,
        status: result.status,
        brevo: result.data,
      },
      { status: result.status }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
