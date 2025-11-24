import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
