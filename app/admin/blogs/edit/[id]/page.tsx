import React from "react";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getBlogById, getAllCategories } from "@/lib/jsonDb";
import { BlogForm } from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

interface EditBlogPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const [blog, categories] = await Promise.all([
    getBlogById(params.id),
    getAllCategories(),
  ]);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Edit Article
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update article content, category, SEO tags, or publication status.
        </p>
      </div>

      <BlogForm
        initialData={{
          ...blog,
          publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : "",
        }}
        categories={categories as any}
        isEdit={true}
      />
    </div>
  );
}
