import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { BlogForm } from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function NewBlogPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-950 font-serif">
          Create New Article
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Draft or publish a thought-leadership article for Y K Chaturvedi & Co.
        </p>
      </div>

      <BlogForm categories={categories} />
    </div>
  );
}
