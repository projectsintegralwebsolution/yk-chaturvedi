import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { syncPagesToJsonFile } from "@/lib/jsonSync";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const page = await prisma.page.findFirst({
      where: {
        OR: [{ slug: params.slug }, { id: params.slug }],
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error: any) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    const existingPage = await prisma.page.findFirst({
      where: {
        OR: [{ slug: params.slug }, { id: params.slug }],
      },
    });

    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const updated = await prisma.page.update({
      where: { id: existingPage.id },
      data: {
        title: data.title ?? existingPage.title,
        path: data.path ?? existingPage.path,
        category: data.category ?? existingPage.category,
        status: data.status ?? existingPage.status,
        bannerTitle: data.bannerTitle !== undefined ? data.bannerTitle : existingPage.bannerTitle,
        bannerSubtitle: data.bannerSubtitle !== undefined ? data.bannerSubtitle : existingPage.bannerSubtitle,
        bannerBadge: data.bannerBadge !== undefined ? data.bannerBadge : existingPage.bannerBadge,
        bannerImage: data.bannerImage !== undefined ? data.bannerImage : existingPage.bannerImage,
        introHeadline: data.introHeadline !== undefined ? data.introHeadline : existingPage.introHeadline,
        introText: data.introText !== undefined ? data.introText : existingPage.introText,
        content: data.content !== undefined ? data.content : existingPage.content,
        bulletPoints: data.bulletPoints !== undefined
          ? typeof data.bulletPoints === "string"
            ? data.bulletPoints
            : JSON.stringify(data.bulletPoints)
          : existingPage.bulletPoints,
        metaTitle: data.metaTitle !== undefined ? data.metaTitle : existingPage.metaTitle,
        metaDescription: data.metaDescription !== undefined ? data.metaDescription : existingPage.metaDescription,
        focusKeyword: data.focusKeyword !== undefined ? data.focusKeyword : existingPage.focusKeyword,
        keywords: data.keywords !== undefined ? data.keywords : existingPage.keywords,
        canonicalUrl: data.canonicalUrl !== undefined ? data.canonicalUrl : existingPage.canonicalUrl,
        customData: data.customData !== undefined
          ? typeof data.customData === "string"
            ? data.customData
            : JSON.stringify(data.customData)
          : existingPage.customData,
      },
    });

    // Auto-sync to JSON file
    await syncPagesToJsonFile();

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await prisma.page.findFirst({
      where: {
        OR: [{ slug: params.slug }, { id: params.slug }],
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Protect core system pages from deletion
    const protectedSlugs = ["home", "about", "services", "partners", "team", "contact"];
    if (protectedSlugs.includes(existing.slug)) {
      return NextResponse.json(
        { error: `Core system page '${existing.title}' cannot be deleted. You can edit its content or set its status to Draft.` },
        { status: 400 }
      );
    }

    await prisma.page.delete({
      where: { id: existing.id },
    });

    await syncPagesToJsonFile();

    return NextResponse.json({ success: true, message: "Page deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete page" },
      { status: 500 }
    );
  }
}
