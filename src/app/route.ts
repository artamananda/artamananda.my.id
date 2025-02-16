import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.BASE_API_URL?.split("/api");
  return NextResponse.redirect(`${url?.[0]}/home`);
}
