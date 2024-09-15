import { NextResponse } from "next/server";

export async function GET() {
  const status = {
    code: 200,
    message: "success",
    payload: process.env.APP_VERSION,
  };
  return NextResponse.json(status);
}
