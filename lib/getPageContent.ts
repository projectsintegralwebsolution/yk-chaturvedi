import { getPageBySlug as getPageFromJson, PageItem } from "@/lib/jsonDb";

export type PageContentData = PageItem;

/**
 * Retrieves page content directly from data/pages.json (Pure JSON storage).
 */
export async function getPageBySlug(slug: string): Promise<PageContentData | null> {
  return getPageFromJson(slug);
}
