import React from "react";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { PageEditForm, PageFormData } from "@/components/admin/PageEditForm";

export const dynamic = "force-dynamic";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function AdminEditPageScreen({ params }: EditPageProps) {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const page = await prisma.page.findFirst({
    where: {
      OR: [{ id: params.id }, { slug: params.id }],
    },
  });

  if (!page) {
    notFound();
  }

  let bulletPoints: string[] = [];
  if (page.bulletPoints) {
    try {
      bulletPoints = JSON.parse(page.bulletPoints);
    } catch {
      bulletPoints = [];
    }
  }

  const pageFormData: PageFormData = {
    id: page.id,
    slug: page.slug,
    title: page.title,
    path: page.path,
    category: page.category,
    status: page.status,
    bannerTitle: page.bannerTitle || page.title,
    bannerSubtitle: page.bannerSubtitle || "",
    bannerBadge: page.bannerBadge || "",
    bannerImage: page.bannerImage || "",
    introHeadline: page.introHeadline || "",
    introText: page.introText || "",
    content: page.content || "",
    bulletPoints,
    metaTitle: page.metaTitle || "",
    metaDescription: page.metaDescription || "",
    focusKeyword: page.focusKeyword || "",
    keywords: page.keywords || "",
    canonicalUrl: page.canonicalUrl || "",
  };

  return <PageEditForm initialData={pageFormData} isNew={false} />;
}
