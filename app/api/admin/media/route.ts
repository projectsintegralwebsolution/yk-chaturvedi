import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const where: any = {};
  if (search) {
    where.OR = [
      { fileName: { contains: search } },
      { altText: { contains: search } },
      { url: { contains: search } },
    ];
  }

  try {
    const assets = await prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ assets });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { url, fileName, fileType, fileSize, altText, folder } = data;

    const asset = await prisma.mediaAsset.upsert({
      where: { url },
      update: { altText: altText || undefined },
      create: {
        url,
        fileName: fileName || url.split("/").pop() || "image",
        fileType: fileType || "image",
        fileSize: Number(fileSize) || 0,
        altText: altText || "",
        folder: folder || "general",
      },
    });

    return NextResponse.json({ success: true, asset });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
