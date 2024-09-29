import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  const visitorCount = await prisma.visitor.count();

  const status = {
    code: 200,
    message: "success",
    payload: {
      onlineVisitors: 1,
      totalVisitors: visitorCount,
    },
  };
  return NextResponse.json(status);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for");

  const ua = req.headers.get("user-agent");

  await prisma.visitor.create({
    data: {
      metadata: {
        ip: ip,
        device: ua,
      },
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  });

  return NextResponse.json({ message: "Visitor data has been logged." });
}
