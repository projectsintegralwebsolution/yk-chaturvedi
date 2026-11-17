import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { CTASection } from "@/components/CTASection";
import { getPageBySlug } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

interface CustomPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: CustomPageProps): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  if (!page || page.status !== "Published") {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.metaTitle || `${page.title} | Y K Chaturvedi & Co.`,
    description: page.metaDescription || undefined,
    alternates: {
      canonical: page.canonicalUrl || `https://ykcassociates.in/${params.slug}`,
    },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || undefined,
      images: page.bannerImage ? [{ url: page.bannerImage }] : undefined,
    },
  };
}

export default async function CustomDynamicPage({ params }: CustomPageProps) {
  // Prevent catching admin, api, blog, etc.
  if (["admin", "api", "blog", "blogs"].includes(params.slug)) {
    notFound();
  }

  const page = await getPageBySlug(params.slug);

  if (!page || page.status !== "Published") {
    notFound();
  }

  const bannerTitle = page.bannerTitle || page.title;
  const bannerSubtitle = page.bannerSubtitle || "";
  const bannerBadge = page.bannerBadge || page.category;
  const bannerImage =
    page.bannerImage ||
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop";

  let bulletPoints: string[] = [];
  if (page.bulletPoints) {
    try {
      const parsed = JSON.parse(page.bulletPoints);
      if (Array.isArray(parsed)) bulletPoints = parsed;
    } catch {}
  }

  return (
    <div>
      <PageBanner
        title={bannerTitle}
        subtitle={bannerSubtitle}
        breadcrumbs={[{ label: page.title }]}
        bgImage={bannerImage}
        badge={bannerBadge}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {page.introHeadline && (
            <h2 className="text-3xl font-heading font-black text-navy-950 tracking-tight">
              {page.introHeadline}
            </h2>
          )}

          {page.introText && (
            <p className="text-base text-slate-700 leading-relaxed font-medium">
              {page.introText}
            </p>
          )}

          {bulletPoints.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              {bulletPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          )}

          {page.content && (
            <div
              className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed break-words [overflow-wrap:anywhere] [word-break:break-word] border-t border-slate-100 pt-6"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
