import fs from "fs";
import path from "path";

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  author: string;
  publishedAt: string; // ISO string
  status: "Draft" | "Published" | "Scheduled" | string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  keywords?: string | null;
  canonicalUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  path: string;
  category: string;
  status: "Published" | "Draft" | string;
  bannerTitle?: string | null;
  bannerSubtitle?: string | null;
  bannerBadge?: string | null;
  bannerImage?: string | null;
  introHeadline?: string | null;
  introText?: string | null;
  content?: string | null;
  bulletPoints?: string | null; // JSON string or array
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  keywords?: string | null;
  canonicalUrl?: string | null;
  customData?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: string;
}

export interface EnquiryItem {
  id: string;
  name: string;
  company?: string | null;
  phone: string;
  email: string;
  service: string;
  office?: string | null;
  message: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");
const PAGES_FILE = path.join(DATA_DIR, "pages.json");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson<T>(filePath: string, fallback: T): T {
  try {
    ensureDirectoryExists();
    if (!fs.existsSync(filePath)) {
      // Check legacy export files if main file does not exist yet
      if (filePath.endsWith("blogs.json")) {
        const legacyPath = path.join(DATA_DIR, "blogs-export.json");
        if (fs.existsSync(legacyPath)) {
          const raw = fs.readFileSync(legacyPath, "utf-8");
          const parsed = JSON.parse(raw);
          fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), "utf-8");
          return parsed as T;
        }
      }
      if (filePath.endsWith("pages.json")) {
        const legacyPath = path.join(DATA_DIR, "pages-export.json");
        if (fs.existsSync(legacyPath)) {
          const raw = fs.readFileSync(legacyPath, "utf-8");
          const parsed = JSON.parse(raw);
          fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), "utf-8");
          return parsed as T;
        }
      }
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), "utf-8");
      return fallback;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Error reading JSON from ${filePath}:`, error);
    return fallback;
  }
}

function writeJson<T>(filePath: string, data: T): boolean {
  try {
    ensureDirectoryExists();
    // Also sync to legacy export path for backwards compatibility
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    if (filePath.endsWith("blogs.json")) {
      fs.writeFileSync(path.join(DATA_DIR, "blogs-export.json"), JSON.stringify(data, null, 2), "utf-8");
    }
    if (filePath.endsWith("pages.json")) {
      fs.writeFileSync(path.join(DATA_DIR, "pages-export.json"), JSON.stringify(data, null, 2), "utf-8");
    }
    return true;
  } catch (error) {
    console.error(`Error writing JSON to ${filePath}:`, error);
    return false;
  }
}

function generateId(prefix: string = "id"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// ==========================================
// BLOGS CRUD (Pure JSON Storage)
// ==========================================

export async function getAllBlogs(): Promise<BlogItem[]> {
  const blogs = readJson<BlogItem[]>(BLOGS_FILE, []);
  return blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPublicBlogs(): Promise<BlogItem[]> {
  const all = await getAllBlogs();
  const now = new Date();
  return all.filter((b) => {
    if (b.status === "Published") return true;
    if (b.status === "Scheduled") {
      const pubDate = new Date(b.publishedAt);
      return pubDate <= now;
    }
    return false;
  });
}

export async function getBlogBySlug(slug: string): Promise<BlogItem | null> {
  const blogs = await getAllBlogs();
  return blogs.find((b) => b.slug === slug) || null;
}

export async function getBlogById(id: string): Promise<BlogItem | null> {
  const blogs = await getAllBlogs();
  return blogs.find((b) => b.id === id) || null;
}

export async function createBlog(
  data: Omit<BlogItem, "id" | "createdAt" | "updatedAt"> & Partial<Pick<BlogItem, "id">>
): Promise<BlogItem> {
  const blogs = await getAllBlogs();
  const now = new Date().toISOString();
  const newBlog: BlogItem = {
    ...data,
    id: data.id || generateId("blog"),
    publishedAt: data.publishedAt || now,
    status: data.status || "Published",
    author: data.author || "CA Saurabh Bhutada",
    createdAt: now,
    updatedAt: now,
  };
  blogs.unshift(newBlog);
  writeJson(BLOGS_FILE, blogs);
  return newBlog;
}

export async function updateBlog(
  idOrSlug: string,
  data: Partial<BlogItem>
): Promise<BlogItem | null> {
  const blogs = await getAllBlogs();
  const index = blogs.findIndex((b) => b.id === idOrSlug || b.slug === idOrSlug);
  if (index === -1) return null;

  const existing = blogs[index];
  const updated: BlogItem = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  blogs[index] = updated;
  writeJson(BLOGS_FILE, blogs);
  return updated;
}

export async function deleteBlog(idOrSlug: string): Promise<boolean> {
  const blogs = await getAllBlogs();
  const filtered = blogs.filter((b) => b.id !== idOrSlug && b.slug !== idOrSlug);
  if (filtered.length === blogs.length) return false;
  writeJson(BLOGS_FILE, filtered);
  return true;
}

// ==========================================
// PAGES CRUD (Pure JSON Storage)
// ==========================================

export async function getAllPages(): Promise<PageItem[]> {
  const pages = readJson<PageItem[]>(PAGES_FILE, []);
  return pages.sort((a, b) => (a.slug || "").localeCompare(b.slug || ""));
}

export async function getPageBySlug(slug: string): Promise<PageItem | null> {
  const pages = await getAllPages();
  return pages.find((p) => p.slug === slug) || null;
}

export async function getPageById(id: string): Promise<PageItem | null> {
  const pages = await getAllPages();
  return pages.find((p) => p.id === id || p.slug === id) || null;
}

export async function createPage(
  data: Omit<PageItem, "id" | "createdAt" | "updatedAt"> & Partial<Pick<PageItem, "id">>
): Promise<PageItem> {
  const pages = await getAllPages();
  const now = new Date().toISOString();
  const newPage: PageItem = {
    ...data,
    id: data.id || generateId("page"),
    createdAt: now,
    updatedAt: now,
  };
  pages.push(newPage);
  writeJson(PAGES_FILE, pages);
  return newPage;
}

export async function updatePage(
  idOrSlug: string,
  data: Partial<PageItem>
): Promise<PageItem | null> {
  const pages = await getAllPages();
  const index = pages.findIndex((p) => p.id === idOrSlug || p.slug === idOrSlug);
  if (index === -1) return null;

  const existing = pages[index];
  const updated: PageItem = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  pages[index] = updated;
  writeJson(PAGES_FILE, pages);
  return updated;
}

export async function deletePage(idOrSlug: string): Promise<boolean> {
  const pages = await getAllPages();
  const filtered = pages.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
  if (filtered.length === pages.length) return false;
  writeJson(PAGES_FILE, filtered);
  return true;
}

// ==========================================
// CATEGORIES CRUD (Pure JSON Storage)
// ==========================================

export async function getAllCategories(): Promise<CategoryItem[]> {
  const fallbackCategories: CategoryItem[] = [
    { id: "cat_1", name: "Audit & Assurance", slug: "audit-assurance", createdAt: new Date().toISOString() },
    { id: "cat_2", name: "Direct Taxation", slug: "direct-taxation", createdAt: new Date().toISOString() },
    { id: "cat_3", name: "GST", slug: "gst", createdAt: new Date().toISOString() },
    { id: "cat_4", name: "Business Setup", slug: "business-setup", createdAt: new Date().toISOString() },
    { id: "cat_5", name: "Corporate Compliance", slug: "corporate-compliance", createdAt: new Date().toISOString() },
  ];
  return readJson<CategoryItem[]>(CATEGORIES_FILE, fallbackCategories);
}

export async function createCategory(data: { name: string; slug: string; description?: string }): Promise<CategoryItem> {
  const categories = await getAllCategories();
  const newCat: CategoryItem = {
    id: generateId("cat"),
    name: data.name,
    slug: data.slug,
    description: data.description || null,
    createdAt: new Date().toISOString(),
  };
  categories.push(newCat);
  writeJson(CATEGORIES_FILE, categories);
  return newCat;
}

// ==========================================
// ENQUIRIES (Pure JSON Storage)
// ==========================================

export async function getAllEnquiries(): Promise<EnquiryItem[]> {
  return readJson<EnquiryItem[]>(ENQUIRIES_FILE, []);
}

export async function createEnquiry(
  data: Omit<EnquiryItem, "id" | "createdAt">
): Promise<EnquiryItem> {
  const enquiries = await getAllEnquiries();
  const newEnquiry: EnquiryItem = {
    ...data,
    id: generateId("enq"),
    createdAt: new Date().toISOString(),
  };
  enquiries.unshift(newEnquiry);
  writeJson(ENQUIRIES_FILE, enquiries);
  return newEnquiry;
}
