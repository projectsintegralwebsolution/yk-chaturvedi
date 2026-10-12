import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getBlogById, getBlogBySlug, updateBlog, deleteBlog } from "@/lib/jsonDb";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blog = await getBlogById(params.id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
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

    // Check slug uniqueness excluding this record
    if (slug) {
      const existing = await getBlogBySlug(slug);
      if (existing && existing.id !== params.id) {
        return NextResponse.json(
          { error: "Another blog is already using this slug" },
          { status: 400 }
        );
      }
    }

    const updatedBlog = await updateBlog(params.id, {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content !== undefined && { content }),
      ...(featuredImage !== undefined && { featuredImage }),
      ...(category !== undefined && { category }),
      ...(author !== undefined && { author }),
      ...(publishedAt !== undefined && { publishedAt }),
      ...(status !== undefined && { status }),
      ...(metaTitle !== undefined && { metaTitle }),
      ...(metaDescription !== undefined && { metaDescription }),
      ...(focusKeyword !== undefined && { focusKeyword }),
      ...(keywords !== undefined && { keywords }),
      ...(canonicalUrl !== undefined && { canonicalUrl }),
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const success = await deleteBlog(params.id);
    if (!success) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
