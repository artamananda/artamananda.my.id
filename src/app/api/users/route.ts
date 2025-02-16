import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";
  const limit = searchParams.get("limit") || "0";
  try {
    if (userId) {
      const user = await prisma.user.findFirst({
        where: {
          userId: userId,
        },
      });
      if (user) {
        const status = {
          code: 200,
          message: "success",
          payload: user,
        };
        return NextResponse.json(status);
      } else {
        const status = {
          code: 404,
          message: "user not found",
        };
        return NextResponse.json(status);
      }
    } else {
      const users = await prisma.user.findMany({
        take: parseInt(limit) || 25,
      });
      const status = {
        code: 200,
        message: "success",
        payload: {
          results: users,
        },
      };
      return NextResponse.json(status);
    }
  } catch (error) {
    const status = {
      code: 500,
      message: "internal server error",
    };
    return NextResponse.json(status);
  }
}
