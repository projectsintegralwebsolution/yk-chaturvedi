import { MetadataRoute } from "next";
import { servicesData } from "@/data/servicesData";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ykchaturvedi.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/partners",
    "/team",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/blog" ? 0.9 : 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedBlogs = await prisma.blog.findMany({
      where: {
        OR: [
          { status: "Published", publishedAt: { lte: new Date() } },
          { status: "Scheduled", publishedAt: { lte: new Date() } },
        ],
      },
      select: { slug: true, updatedAt: true },
    });

    blogRoutes = publishedBlogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Failed to fetch blogs for sitemap:", err);
  }

  // Include any custom published pages
  let customPageRoutes: MetadataRoute.Sitemap = [];
  try {
    const customPages = await prisma.page.findMany({
      where: {
        status: "Published",
        category: "Custom Page",
      },
      select: { path: true, updatedAt: true },
    });

    customPageRoutes = customPages.map((p) => ({
      url: `${baseUrl}${p.path}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (err) {
    console.error("Failed to fetch custom pages for sitemap:", err);
  }

  return [...staticRoutes, ...serviceRoutes, ...customPageRoutes, ...blogRoutes];
}
