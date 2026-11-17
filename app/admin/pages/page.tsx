import React from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllPages } from "@/lib/jsonDb";
import { PagesManager, PageItem } from "@/components/admin/PagesManager";

export const dynamic = "force-dynamic";

export default async function AdminPagesListPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const rawPages = await getAllPages();

  const pages: PageItem[] = rawPages.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    path: p.path,
    category: p.category,
    status: p.status,
    bannerTitle: p.bannerTitle,
    bannerSubtitle: p.bannerSubtitle,
    bannerBadge: p.bannerBadge,
    bannerImage: p.bannerImage,
    introHeadline: p.introHeadline,
    introText: p.introText,
    content: p.content,
    bulletPoints: p.bulletPoints,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    focusKeyword: p.focusKeyword,
    canonicalUrl: p.canonicalUrl,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));

  return <PagesManager initialPages={pages} />;
}
