import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { BlogsManager } from "@/components/admin/BlogsManager";

export const dynamic = "force-dynamic";

export default async function AdminBlogsListPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const [blogs, categories] = await Promise.all([
    prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return <BlogsManager initialBlogs={blogs} categories={categories} />;
}
