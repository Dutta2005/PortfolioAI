import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portfolios = await prisma.portfolio.findMany({
      where: {
        user: { email: session.user.email },
      },
      orderBy: { updatedAt: "desc" },
    });

    const portfoliosWithParsedData = portfolios.map((portfolio) => ({
      ...portfolio,
      data: JSON.parse(portfolio.data),
    }));

    return NextResponse.json(portfoliosWithParsedData);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}
