const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function exportJson() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  const dataDir = path.join(__dirname, "..", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const exportPath = path.join(dataDir, "blogs-export.json");
  fs.writeFileSync(exportPath, JSON.stringify(blogs, null, 2), "utf-8");
  console.log(`Successfully exported ${blogs.length} blogs to: ${exportPath}`);
}

exportJson()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
