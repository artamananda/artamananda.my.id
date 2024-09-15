import { NextResponse } from "next/server";

export async function GET() {
  const status = {
    code: 200,
    message: "success",
    payload: {
      onlineVisitors: 5,
      totalVisitors: 2999,
    },
  };
  return NextResponse.json(status);
}
