import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

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
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

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
      canonicalUrl,
    } = data;

    // Check slug uniqueness excluding this record
    if (slug) {
      const existing = await prisma.blog.findUnique({
        where: { slug },
      });
      if (existing && existing.id !== params.id) {
        return NextResponse.json(
          { error: "Another blog is already using this slug" },
          { status: 400 }
        );
      }
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content && { content }),
        ...(featuredImage && { featuredImage }),
        ...(category && { category }),
        ...(author && { author }),
        ...(publishedAt && { publishedAt: new Date(publishedAt) }),
        ...(status && { status }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(focusKeyword !== undefined && { focusKeyword }),
        ...(canonicalUrl !== undefined && { canonicalUrl }),
      },
    });

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
    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
