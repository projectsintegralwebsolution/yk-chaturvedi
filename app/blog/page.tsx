import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { PageBanner } from "@/components/PageBanner";
import { CTASection } from "@/components/CTASection";
import { BlogListClient } from "@/components/blog/BlogListClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Regulatory Updates | Y K Chaturvedi & Co.",
  description:
    "Expert articles, compliance guides, and regulatory analysis on GST, Income Tax, Audit, Corporate Law, and Business Advisory by Y K Chaturvedi & Co. Chartered Accountants.",
  openGraph: {
    title: "Blog & Regulatory Updates | Y K Chaturvedi & Co.",
    description:
      "Statutory insights, tax analysis, and regulatory updates curated by Chartered Accountants.",
    type: "website",
    url: "https://ykcca.com/blog",
  },
};

export default async function BlogListingPage() {
  const [blogs, categories] = await Promise.all([
    prisma.blog.findMany({
      where: {
        status: "Published",
      },
      orderBy: {
        publishedAt: "desc",
      },
    }),
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Inner Page Banner */}
      <PageBanner
        title="Our Blog"
        subtitle="Authoritative statutory updates, tax strategies, and regulatory insights written by practising Chartered Accountants."
        breadcrumbs={[{ label: "Blog" }]}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
        badge="Knowledge & Regulatory Updates"
      />

      {/* 2. Main Content Area */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogListClient blogs={blogs} categories={categories} />
        </div>
      </section>

      {/* 3. Advisory CTA */}
      <CTASection />
    </div>
  );
}
