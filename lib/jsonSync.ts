import path from "path";
import { getAllBlogs, getAllPages } from "./jsonDb";

/**
 * Synchronizes/ensures JSON files on disk.
 */
export async function syncBlogsToJsonFile() {
  await getAllBlogs();
  return path.join(process.cwd(), "data", "blogs.json");
}

export async function syncPagesToJsonFile() {
  await getAllPages();
  return path.join(process.cwd(), "data", "pages.json");
}
