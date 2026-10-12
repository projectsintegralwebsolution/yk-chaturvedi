import React from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllBlogs, getAllCategories } from "@/lib/jsonDb";
import { BlogsManager } from "@/components/admin/BlogsManager";

export const dynamic = "force-dynamic";

export default async function AdminBlogsListPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const [blogs, categories] = await Promise.all([
    getAllBlogs(),
    getAllCategories(),
  ]);

  return <BlogsManager initialBlogs={blogs as any} categories={categories as any} />;
}
