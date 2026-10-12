import prisma from "@/lib/prisma";

export interface PageContentData {
  id: string;
  slug: string;
  title: string;
  path: string;
  category: string;
  status: string;
  bannerTitle?: string | null;
  bannerSubtitle?: string | null;
  bannerBadge?: string | null;
  bannerImage?: string | null;
  introHeadline?: string | null;
  introText?: string | null;
  content?: string | null;
  bulletPoints?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  keywords?: string | null;
  canonicalUrl?: string | null;
  customData?: string | null;
}

/**
 * Retrieves page content from SQLite database by slug.
 * Returns null if not found or on error, allowing pages to gracefully fallback to their hardcoded defaults.
 */
export async function getPageBySlug(slug: string): Promise<PageContentData | null> {
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
    });
    return page as PageContentData | null;
  } catch (err) {
    console.error(`Error loading page content for "${slug}":`, err);
    return null;
  }
}
