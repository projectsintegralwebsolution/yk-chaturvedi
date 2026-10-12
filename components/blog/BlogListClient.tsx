"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Sparkles,
  BookOpen,
  Filter,
} from "lucide-react";

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  publishedAt: string | Date;
  status: string;
  content?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

interface BlogListClientProps {
  blogs: BlogItem[];
  categories: CategoryItem[];
}

export const BlogListClient: React.FC<BlogListClientProps> = ({
  blogs,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Calculate read time
  const getReadTime = (content?: string, excerpt?: string) => {
    const text = (content || excerpt || "").replace(/<[^>]*>?/gm, "");
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${Math.max(1, minutes)} min read`;
  };

  // Format date safely
  const formatDate = (dateVal: string | Date) => {
    try {
      const d = new Date(dateVal);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCat =
        selectedCategory === "all" ||
        blog.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.author.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Featured blog (first in list when no search/cat filter or first filtered)
  const featuredBlog = useMemo(() => {
    if (filteredBlogs.length === 0) return null;
    return filteredBlogs[0];
  }, [filteredBlogs]);

  // Regular grid blogs (excluding featured if displayed above)
  const regularBlogs = useMemo(() => {
    if (filteredBlogs.length <= 1) return [];
    return filteredBlogs.slice(1);
  }, [filteredBlogs]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: blogs.length };
    blogs.forEach((b) => {
      const cat = b.category.toLowerCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [blogs]);

  return (
    <div className="space-y-12">
      {/* Category Pills & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, topic or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 self-end md:self-auto">
            <BookOpen className="w-4 h-4 text-gold-600" />
            <span>
              Showing {filteredBlogs.length} of {blogs.length} articles
            </span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider pr-2 flex-shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Topic:</span>
          </div>

          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
              selectedCategory === "all"
                ? "bg-navy-950 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Topics ({categoryCounts["all"] || 0})
          </button>

          {categories.map((cat) => {
            const count = categoryCounts[cat.name.toLowerCase()] || 0;
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => setSelectedCategory(cat.name.toLowerCase())}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                  isSelected
                    ? "bg-navy-950 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.name} {count > 0 ? `(${count})` : ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* When no articles found */}
      {filteredBlogs.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-xl mx-auto">
          <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-navy-950 font-serif mb-2">
            No articles match your criteria
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            We couldn't find any articles matching your search query or selected topic. Try resetting your filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-5 py-2.5 bg-navy-950 text-white text-xs font-bold rounded-xl hover:bg-navy-900 transition-colors shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Featured Blog Banner (Hero Style) */}
      {featuredBlog && (
        <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Side */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-navy-950">
              <img
                src={featuredBlog.featuredImage}
                alt={featuredBlog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent lg:hidden" />
              
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-950/90 backdrop-blur-md border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-wider shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Featured Advisory</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="px-3 py-1 rounded-md bg-[#0A5084]/10 text-[#0A5084] font-bold border border-[#0A5084]/20 uppercase tracking-wider">
                    {featuredBlog.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {formatDate(featuredBlog.publishedAt)}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {getReadTime(featuredBlog.content, featuredBlog.excerpt)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-navy-950 tracking-tight leading-snug group-hover:text-[#0A5084] transition-colors break-words [overflow-wrap:anywhere] [word-break:break-word]">
                  <Link href={`/blog/${featuredBlog.slug}`}>
                    {featuredBlog.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 break-words [overflow-wrap:anywhere] [word-break:break-word]">
                  {featuredBlog.excerpt}
                </p>
              </div>

              {/* Author & CTA Button */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-navy-950 text-gold-400 flex items-center justify-center font-bold text-xs ring-2 ring-gold-400/30">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-950">
                      {featuredBlog.author}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Partner & Advisory Desk
                    </p>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredBlog.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-950 text-white rounded-xl text-xs font-bold hover:bg-gold-600 hover:text-navy-950 transition-all duration-200 shadow-sm group-hover:shadow"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Articles Grid */}
      {regularBlogs.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-serif text-navy-950">
              More Insights & Regulatory Updates
            </h3>
            <span className="text-xs font-medium text-slate-500">
              {regularBlogs.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularBlogs.map((blog) => (
              <article
                key={blog.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div>
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-navy-950">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#0A5084] text-white text-[11px] font-bold uppercase tracking-wider shadow">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(blog.publishedAt)}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {getReadTime(blog.content, blog.excerpt)}
                      </span>
                    </div>

                    <h4 className="text-lg font-heading font-bold text-navy-950 group-hover:text-[#0A5084] transition-colors leading-snug line-clamp-2 break-words [overflow-wrap:anywhere] [word-break:break-word]">
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h4>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 break-words [overflow-wrap:anywhere] [word-break:break-word]">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-navy-950 flex items-center justify-center text-[10px] font-bold">
                      <User className="w-3 h-3 text-slate-500" />
                    </div>
                    <span className="truncate max-w-[130px]">{blog.author}</span>
                  </div>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-950 hover:text-[#0A5084] transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0A5084] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
