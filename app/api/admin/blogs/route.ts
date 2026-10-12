import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { syncBlogsToJsonFile } from "@/lib/jsonSync";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      author,
      publishedAt,
      status,
      metaTitle,
      metaDescription,
      focusKeyword,
      keywords,
      canonicalUrl,
    } = data;

    if (!title || !slug || !content || !category) {
      return NextResponse.json(
        { error: "Title, slug, content and category are required" },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt: excerpt || title,
        content,
        featuredImage:
          featuredImage ||
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        category,
        author: author || "CA Saurabh Bhutada",
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        status: status || "Published",
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt || title,
        focusKeyword: focusKeyword || "",
        keywords: keywords || "",
        canonicalUrl: canonicalUrl || "",
      },
    });

    // Auto-sync JSON backup
    await syncBlogsToJsonFile();

    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create blog" },
      { status: 500 }
    );
  }
}
