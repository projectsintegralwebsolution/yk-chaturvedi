import fs from "fs";
import path from "path";
import prisma from "./prisma";

/**
 * Automatically backs up all blog articles from SQLite into a human-readable JSON file.
 * Saved at: /data/blogs-export.json
 */
export async function syncBlogsToJsonFile() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, "blogs-export.json");
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2), "utf-8");
    return filePath;
  } catch (err) {
    console.error("Failed to sync blogs to JSON file:", err);
    return null;
  }
}

/**
 * Automatically backs up all site pages from SQLite into a human-readable JSON file.
 * Saved at: /data/pages-export.json
 */
export async function syncPagesToJsonFile() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { slug: "asc" },
    });
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, "pages-export.json");
    fs.writeFileSync(filePath, JSON.stringify(pages, null, 2), "utf-8");
    return filePath;
  } catch (err) {
    console.error("Failed to sync pages to JSON file:", err);
    return null;
  }
}
