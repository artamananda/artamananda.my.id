import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const currentTime = new Date();
    const thresholdTime = new Date(currentTime.getTime() - 10000);

    const visitorCount = await prisma.visitor.count();
    const onlineVisitorCount = await prisma.visitor.count({
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
        onlineVisitors: onlineVisitorCount,
        totalVisitors: visitorCount,
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

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for");

    const ua = req.headers.get("user-agent");

    const res = await prisma.visitor.findFirst({
      where: {
        ipAddress: ip!,
      },
    });

    if (res) {
      await prisma.visitor.update({
        where: {
          id: res.id,
        },
        data: {
          metadata: {
            ip: ip,
            device: ua,
          },
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.visitor.create({
        data: {
          metadata: {
            ip: ip,
            device: ua,
          },
          ipAddress: ip!,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      });
    }

    return NextResponse.json({ message: "Visitor data has been logged." });
  } catch (e) {
    return NextResponse.json({ message: "Failed to log visitor data." });
  }
}
