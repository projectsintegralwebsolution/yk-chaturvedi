import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug, getPublicBlogs } from "@/lib/jsonDb";
import { PageBanner } from "@/components/PageBanner";
import { CTASection } from "@/components/CTASection";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  FileText,
  Tag,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate dynamic SEO metadata
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  const now = new Date();

  // Check visibility (must be Published or Scheduled with publishedAt <= now)
  if (!blog) {
    return { title: "Article Not Found | Y K Chaturvedi & Co." };
  }

  if (blog.status === "Scheduled" && new Date(blog.publishedAt) > now) {
    return { title: "Article Not Found | Y K Chaturvedi & Co." };
  }

  if (blog.status === "Draft") {
    return { title: "Article Not Found | Y K Chaturvedi & Co." };
  }

  if (!blog) {
    return {
      title: "Article Not Found | Y K Chaturvedi & Co.",
    };
  }

  const metaTitle =
    blog.metaTitle || `${blog.title} | Y K Chaturvedi & Co. Chartered Accountants`;
  const metaDescription =
    blog.metaDescription || blog.excerpt.slice(0, 160);

  const seoKeywords = [blog.focusKeyword, blog.keywords]
    .filter(Boolean)
    .join(", ");

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: seoKeywords || undefined,
    alternates: {
      canonical: blog.canonicalUrl || `https://ykchaturvedi.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      url: `https://ykchaturvedi.com/blog/${blog.slug}`,
      images: [
        {
          url: blog.featuredImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.publishedAt
        ? new Date(blog.publishedAt).toISOString()
        : undefined,
      authors: [blog.author],
      section: blog.category,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [blog.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blog = await getBlogBySlug(params.slug);
  const now = new Date();

  if (!blog) {
    notFound();
  }

  // Check publication visibility
  if (blog.status === "Scheduled" && new Date(blog.publishedAt) > now) {
    notFound();
  }
  if (blog.status === "Draft") {
    notFound();
  }

  const allPublicBlogs = await getPublicBlogs();
  const otherBlogs = allPublicBlogs.filter((b) => b.id !== blog.id);

  // Related blogs in same category
  let relatedBlogs = otherBlogs.filter((b) => b.category === blog.category).slice(0, 3);
  if (relatedBlogs.length < 3) {
    const remaining = otherBlogs.filter((b) => !relatedBlogs.some((r) => r.id === b.id));
    relatedBlogs = [...relatedBlogs, ...remaining.slice(0, 3 - relatedBlogs.length)];
  }

  // Calculate read time
  const wordCount = (blog.content || "").replace(/<[^>]*>?/gm, "").trim().split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

  // Structured Data Schema (Article + BreadcrumbList)
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: [blog.featuredImage],
    datePublished: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : undefined,
    dateModified: new Date(blog.updatedAt).toISOString(),
    author: [
      {
        "@type": "Person",
        name: blog.author,
      },
    ],
    publisher: {
      "@type": "AccountingService",
      name: "Y K Chaturvedi & Co.",
      url: "https://ykcca.com",
      logo: {
        "@type": "ImageObject",
        url: "https://ykcca.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ykcca.com/blog/${blog.slug}`,
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ykcca.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://ykcca.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `https://ykcca.com/blog/${blog.slug}`,
      },
    ],
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* 1. Inner Page Banner */}
      <PageBanner
        title={blog.title}
        subtitle={blog.excerpt}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: blog.title },
        ]}
        bgImage={blog.featuredImage}
        badge={blog.category}
      />

      {/* 2. Article Body & Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Navigation Bar & Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy-950 bg-white px-4 py-2.5 rounded-xl border border-slate-200 hover:border-[#0A5084] hover:text-[#0A5084] transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <div className="inline-flex items-center gap-2 text-xs text-slate-500">
            <Tag className="w-3.5 h-3.5 text-[#0A5084]" />
            <span className="font-semibold text-slate-700">{blog.category}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content (8 cols) */}
          <main className="lg:col-span-8">
            <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-slate-200 overflow-hidden break-words [overflow-wrap:anywhere]">
              {/* Meta Info Header */}
              <div className="pb-8 mb-8 border-b border-slate-100 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="px-3 py-1 rounded-full bg-[#0A5084] text-white font-bold uppercase tracking-wider text-[11px] shadow-sm">
                    {blog.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {readTimeMinutes} min read
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-navy-950 tracking-tight leading-tight break-words [overflow-wrap:anywhere]">
                  {blog.title}
                </h1>

                {/* Author attribution banner */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-11 h-11 rounded-full bg-navy-950 text-gold-400 flex items-center justify-center font-bold text-sm ring-2 ring-gold-400/40">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-950">
                      {blog.author}
                    </p>
                    <p className="text-xs text-slate-500">
                      Partner & Advisory Desk • Y K Chaturvedi & Co.
                    </p>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative mb-10 rounded-2xl overflow-hidden shadow-md">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-auto max-h-[460px] object-cover"
                />
              </div>

              {/* Lead Excerpt */}
              {blog.excerpt && (
                <div className="p-5 sm:p-6 mb-8 rounded-2xl bg-gold-50/60 border-l-4 border-gold-500 text-slate-800 text-base sm:text-lg font-medium leading-relaxed break-words [overflow-wrap:anywhere]">
                  {blog.excerpt}
                </div>
              )}

              {/* Rendered HTML Content with professional corporate styling and all 6 headings */}
              <div
                className="article-content space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed break-words [overflow-wrap:anywhere] [word-break:break-word] overflow-hidden [&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:font-black [&_h1]:text-navy-950 [&_h1]:mt-10 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-navy-950 [&_h2]:font-serif [&_h2]:mt-9 [&_h2]:mb-4 [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-slate-100 [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-bold [&_h3]:text-navy-900 [&_h3]:mt-7 [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:sm:text-xl [&_h4]:font-bold [&_h4]:text-navy-900 [&_h4]:mt-6 [&_h4]:mb-2.5 [&_h5]:text-base [&_h5]:sm:text-lg [&_h5]:font-bold [&_h5]:text-navy-900 [&_h5]:mt-5 [&_h5]:mb-2 [&_h6]:text-sm [&_h6]:sm:text-base [&_h6]:font-bold [&_h6]:text-slate-800 [&_h6]:mt-4 [&_h6]:mb-1.5 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:mb-5 [&_p]:break-words [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2.5 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2.5 [&_ol]:mb-6 [&_li]:text-slate-700 [&_blockquote]:border-l-4 [&_blockquote]:border-navy-950 [&_blockquote]:bg-slate-50 [&_blockquote]:py-3 [&_blockquote]:px-5 [&_blockquote]:italic [&_blockquote]:rounded-r-xl [&_blockquote]:my-6 [&_blockquote]:text-navy-950 [&_a]:text-gold-600 [&_a]:underline [&_a]:font-semibold hover:[&_a]:text-navy-950 [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:text-sm [&_th]:bg-navy-950 [&_th]:text-white [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-slate-200 [&_td]:p-3 [&_tr:nth-child(even)]:bg-slate-50 [&_img]:max-w-full [&_img]:h-auto"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Disclaimer / Statutory Notice */}
              <div className="mt-12 pt-6 border-t border-slate-200 bg-slate-50 p-5 rounded-2xl">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-500 leading-relaxed">
                    <strong className="text-navy-950 block mb-1">
                      Professional Statutory Disclaimer
                    </strong>
                    The contents of this publication are for general informational
                    and academic guidance only. It does not constitute formal legal,
                    accounting, or tax advice. Readers are strongly advised to seek
                    independent professional consultation tailored to their specific
                    facts and circumstances before taking statutory decisions.
                  </div>
                </div>
              </div>

              {/* Article Footer with Share & Back */}
              <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-bold text-navy-950 hover:text-gold-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to All Blog Posts</span>
                </Link>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Bookmark className="w-4 h-4 text-gold-600" />
                  <span>Topic: {blog.category}</span>
                </div>
              </div>
            </article>
          </main>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* 1. Author & Firm Profile Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-navy-950 text-gold-400 flex items-center justify-center font-bold text-base shadow">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-navy-950">
                    {blog.author}
                  </h4>
                  <p className="text-xs text-gold-700 font-semibold">
                    Partner & Advisory Desk
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Senior practitioner at <strong>Y K Chaturvedi & Co.</strong>,
                specializing in statutory compliance, tax advisory, and corporate
                governance.
              </p>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>FRN: 145633W | ICAI Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600" />
                  <span>Direct Partner Supervision</span>
                </div>
              </div>
            </div>

            {/* 2. Direct Consultation Callout */}
            <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-navy-900 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="inline-block px-3 py-1 rounded-md bg-gold-500/20 text-gold-300 text-[11px] font-bold uppercase tracking-wider border border-gold-400/30">
                  Advisory Desk
                </div>

                <h4 className="text-xl font-heading font-black text-white leading-snug">
                  Need Professional Advice on this Subject?
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Connect directly with our partners to discuss your specific tax,
                  statutory, or corporate compliance requirements.
                </p>

                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gold-500 hover:bg-gold-600 text-navy-950 rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    <span>Schedule a Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href="tel:+918806283737"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0A5084]/40 hover:bg-[#0A5084] text-white rounded-xl text-xs font-semibold transition-all border border-[#0A5084]/60"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>+91 88062 83737</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Related Articles */}
            {relatedBlogs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <h4 className="text-base font-bold font-serif text-navy-950 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <span>Related Articles</span>
                  <FileText className="w-4 h-4 text-[#0A5084]" />
                </h4>

                <div className="space-y-4">
                  {relatedBlogs.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="group block space-y-1.5 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[11px] font-bold text-[#0A5084] uppercase tracking-wider block">
                        {rel.category}
                      </span>
                      <h5 className="text-sm font-bold text-navy-950 group-hover:text-[#0A5084] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h5>
                      <span className="text-[11px] text-slate-400 block">
                        {rel.publishedAt
                          ? new Date(rel.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* 3. Bottom CTA Section */}
      <CTASection />
    </div>
  );
}
