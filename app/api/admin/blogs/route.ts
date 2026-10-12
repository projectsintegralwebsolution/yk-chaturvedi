import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllBlogs, getBlogBySlug, createBlog } from "@/lib/jsonDb";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await getAllBlogs();
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
    const existing = await getBlogBySlug(slug);
    if (existing) {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 400 }
      );
    }

    const blog = await createBlog({
      title,
      slug,
      excerpt: excerpt || title,
      content,
      featuredImage: featuredImage || "/images/blog-default.jpg",
      category,
      author: author || "CA Saurabh Bhutada",
      publishedAt: publishedAt || new Date().toISOString(),
      status: status || "Published",
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      focusKeyword: focusKeyword || null,
      keywords: keywords || null,
      canonicalUrl: canonicalUrl || null,
    });

    return NextResponse.json({ success: true, blog, id: blog.id }, { status: 201 });
  } catch (error: any) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create blog" },
      { status: 500 }
    );
  }
}
