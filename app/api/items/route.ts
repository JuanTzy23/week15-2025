export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function GET() {
  const items = await prisma.item.findMany();
  return Response.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();

  const item = await prisma.item.create({
    data: { name: body.name },
  });

  return Response.json(item);
}
