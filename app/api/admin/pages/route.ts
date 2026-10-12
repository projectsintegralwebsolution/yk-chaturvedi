import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllPages, getPageBySlug, createPage } from "@/lib/jsonDb";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pages = await getAllPages();
    return NextResponse.json(pages);
  } catch (error: any) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const cleanSlug = data.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-");

    const existing = await getPageBySlug(cleanSlug);

    if (existing) {
      return NextResponse.json(
        { error: "A page with this slug already exists" },
        { status: 400 }
      );
    }

    const newPage = await createPage({
      slug: cleanSlug,
      title: data.title,
      path: data.path || `/${cleanSlug}`,
      category: data.category || "Custom Page",
      status: data.status || "Published",
      bannerTitle: data.bannerTitle || data.title,
      bannerSubtitle: data.bannerSubtitle || null,
      bannerBadge: data.bannerBadge || null,
      bannerImage: data.bannerImage || null,
      introHeadline: data.introHeadline || null,
      introText: data.introText || null,
      content: data.content || "",
      bulletPoints: data.bulletPoints
        ? typeof data.bulletPoints === "string"
          ? data.bulletPoints
          : JSON.stringify(data.bulletPoints)
        : null,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      focusKeyword: data.focusKeyword || null,
      keywords: data.keywords || null,
      canonicalUrl: data.canonicalUrl || null,
      customData: data.customData
        ? typeof data.customData === "string"
          ? data.customData
          : JSON.stringify(data.customData)
        : null,
    });

    return NextResponse.json(newPage, { status: 201 });
  } catch (error: any) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create page" },
      { status: 500 }
    );
  }
}
