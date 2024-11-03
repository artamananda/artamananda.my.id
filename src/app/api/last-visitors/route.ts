import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const currentTime = new Date();
    const thresholdTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
    const lastVisitors = await prisma.visitor.findMany({
      where: {
        updatedAt: {
          gte: thresholdTime,
        },
      },
    });

    const status = {
      code: 200,
      message: "success",
      payload: {
        results: lastVisitors,
      },
    };
    return NextResponse.json(status);
  } catch (error) {
    const status = {
      code: 500,
      message: "internal server error",
    };
    return NextResponse.json(status);
  }
}
