import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    "https://uptime.artamananda.my.id/status/arta-prod"
  );
}
