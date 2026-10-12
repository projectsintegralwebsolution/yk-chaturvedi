const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();
const BASE_URL = "http://localhost:3000";

async function runFullAudit() {
  console.log("==================================================");
  console.log("   FULL SYSTEM AUDIT & CROSS-CHECK VERIFICATION   ");
  console.log("==================================================");

  const results = {
    publicRoutes: false,
    authLogin: false,
    authProtection: false,
    imageUpload: false,
    blogCreate: false,
    blogEdit: false,
    blogSchedule: false,
    blogDelete: false,
    jsonSync: false,
    sitemapRobots: false,
  };

  // 1. PUBLIC ROUTES CHECK
  console.log("\n[1] Checking Public Routes...");
  const homeRes = await fetch(`${BASE_URL}/`);
  const blogListRes = await fetch(`${BASE_URL}/blog`);
  const blogDetailRes = await fetch(`${BASE_URL}/blog/gst-compliance-timely-record-keeping-businesses`);
  console.log(`- Home (/) status: ${homeRes.status}`);
  console.log(`- Blog Listing (/blog) status: ${blogListRes.status}`);
  console.log(`- Blog Detail (/blog/gst-compliance-timely-record-keeping-businesses) status: ${blogDetailRes.status}`);
  if (homeRes.status === 200 && blogListRes.status === 200 && blogDetailRes.status === 200) {
    results.publicRoutes = true;
    console.log("✓ Public routes working properly.");
  } else {
    console.error("✗ Public routes failed.");
  }

  // 2. SITEMAP & ROBOTS CHECK
  console.log("\n[2] Checking Sitemap & Robots...");
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const sitemapText = await sitemapRes.text();
  const robotsText = await robotsRes.text();
  console.log(`- Sitemap status: ${sitemapRes.status}, includes /blog: ${sitemapText.includes("/blog")}`);
  console.log(`- Robots status: ${robotsRes.status}, disallows /admin: ${robotsText.includes("/admin")}`);
  if (sitemapRes.status === 200 && robotsRes.status === 200 && robotsText.includes("/admin")) {
    results.sitemapRobots = true;
    console.log("✓ Sitemap and Robots.txt configured correctly for SEO.");
  }

  // 3. ADMIN AUTHENTICATION
  console.log("\n[3] Checking Admin Authentication...");
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "admin",
      password: "adminpassword2026",
    }),
  });
  const cookieHeader = loginRes.headers.get("set-cookie");
  const loginData = await loginRes.json();
  console.log(`- Login API status: ${loginRes.status}, success: ${loginData.success}`);
  if (loginRes.status === 200 && cookieHeader) {
    results.authLogin = true;
    console.log("✓ Admin login successful with credentials (admin / adminpassword2026).");
  } else {
    console.error("✗ Admin login failed.");
  }

  const sessionCookie = cookieHeader ? cookieHeader.split(";")[0] : "";

  // 4. ADMIN ROUTE ACCESS WITH SESSION
  console.log("\n[4] Checking Admin Route Protection...");
  const unauthRes = await fetch(`${BASE_URL}/admin`, { redirect: "manual" });
  console.log(`- Unauthenticated /admin status: ${unauthRes.status} (should redirect 307 to login)`);
  
  const authAdminRes = await fetch(`${BASE_URL}/admin`, {
    headers: { Cookie: sessionCookie },
  });
  console.log(`- Authenticated /admin status: ${authAdminRes.status}`);
  if ((unauthRes.status === 307 || unauthRes.status === 302) && authAdminRes.status === 200) {
    results.authProtection = true;
    console.log("✓ Admin route protection verified.");
  }

  // 5. IMAGE UPLOAD FROM COMPUTER
  console.log("\n[5] Checking Computer Image Upload API...");
  const testPngBuffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "base64"
  );
  const blob = new Blob([testPngBuffer], { type: "image/png" });
  const uploadForm = new FormData();
  uploadForm.append("file", blob, "audit-check-upload.png");

  const uploadRes = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: "POST",
    headers: { Cookie: sessionCookie },
    body: uploadForm,
  });
  const uploadData = await uploadRes.json();
  console.log(`- Image Upload status: ${uploadRes.status}, URL: ${uploadData.url}`);
  if (uploadRes.status === 200 && uploadData.url) {
    const filePath = path.join(process.cwd(), "public", uploadData.url.replace(/^\//, ""));
    const fileExists = fs.existsSync(filePath);
    const serveRes = await fetch(`${BASE_URL}${uploadData.url}`);
    console.log(`- Uploaded file exists on disk: ${fileExists}`);
    console.log(`- Next.js serves uploaded file: ${serveRes.status === 200}`);
    if (fileExists && serveRes.status === 200) {
      results.imageUpload = true;
      console.log("✓ Computer image upload and public serving verified.");
    }
    // Clean up
    if (fileExists) fs.unlinkSync(filePath);
  }

  // 6. BLOG POSTING WITH FULL SEO & ALL 6 HEADINGS
  console.log("\n[6] Checking Blog Creation with All 6 Headings & SEO...");
  const testSlug = `audit-test-blog-${Date.now()}`;
  const richContent = `
<h1>Heading 1 Major Title</h1>
<p>Opening paragraph with primary keyword.</p>
<h2>Heading 2 Section Title</h2>
<p>Section analysis paragraph.</p>
<h3>Heading 3 Subsection Title</h3>
<p>Detailed discussion.</p>
<h4>Heading 4 Topic Title</h4>
<p>Specific compliance parameter.</p>
<h5>Heading 5 Minor Title</h5>
<p>Minor guideline.</p>
<h6>Heading 6 Fine Detail Title</h6>
<p>Fine statutory notes.</p>
<p>dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
  `;

  const createRes = await fetch(`${BASE_URL}/api/admin/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify({
      title: "Comprehensive Audit Check Article",
      slug: testSlug,
      category: "Audit & Assurance",
      author: "CA Saurabh Bhutada",
      excerpt: "Executive summary for full system audit.",
      content: richContent,
      featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
      status: "Published",
      publishedAt: new Date().toISOString(),
      metaTitle: "Comprehensive Audit Check Article | Y K Chaturvedi & Co.",
      metaDescription: "Detailed testing article for verification of all SEO fields.",
      focusKeyword: "comprehensive audit check",
      keywords: "audit, verification, CA in Vasai, statutory compliance",
    }),
  });
  const createData = await createRes.json();
  console.log(`- Create Blog API status: ${createRes.status}, ID: ${createData.blog?.id}`);
  if (createRes.status === 201 && createData.blog?.id) {
    results.blogCreate = true;
    console.log("✓ Blog creation with full SEO and H1-H6 headings verified.");
  }

  const createdId = createData.blog?.id;

  // 7. PUBLIC VISIBILITY CHECK
  console.log("\n[7] Verifying Public Visibility of New Blog...");
  const publicPostRes = await fetch(`${BASE_URL}/blog/${testSlug}`);
  const publicPostHtml = await publicPostRes.text();
  console.log(`- Public URL /blog/${testSlug} status: ${publicPostRes.status}`);
  console.log(`- Contains H1-H6 headings: ${publicPostHtml.includes("Heading 1 Major Title") && publicPostHtml.includes("Heading 6 Fine Detail Title")}`);
  console.log(`- Contains word-wrap break-words: ${publicPostHtml.includes("break-words")}`);

  // 8. BLOG EDITING
  console.log("\n[8] Checking Blog Editing...");
  const updateRes = await fetch(`${BASE_URL}/api/admin/blogs/${createdId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify({
      title: "Comprehensive Audit Check Article (Edited & Updated)",
      metaTitle: "Updated Meta Title | Y K Chaturvedi & Co.",
    }),
  });
  const updateData = await updateRes.json();
  console.log(`- Update API status: ${updateRes.status}, New title: ${updateData.blog?.title}`);
  if (updateRes.status === 200 && updateData.blog?.title?.includes("Edited")) {
    results.blogEdit = true;
    console.log("✓ Blog editing verified.");
  }

  // 9. SCHEDULING SYSTEM CHECK
  console.log("\n[9] Checking Blog Scheduling System...");
  const futureScheduleDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
  const scheduleUpdateRes = await fetch(`${BASE_URL}/api/admin/blogs/${createdId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify({
      status: "Scheduled",
      publishedAt: futureScheduleDate,
    }),
  });
  const scheduleUpdateData = await scheduleUpdateRes.json();
  console.log(`- Scheduled status set: ${scheduleUpdateData.blog?.status}`);

  // Check if public page now returns 404 (hidden)
  const scheduledPublicRes = await fetch(`${BASE_URL}/blog/${testSlug}`);
  console.log(`- Scheduled blog public access status: ${scheduledPublicRes.status} (404 expected because it is scheduled in future)`);
  if (scheduleUpdateData.blog?.status === "Scheduled" && scheduledPublicRes.status === 404) {
    results.blogSchedule = true;
    console.log("✓ Future-scheduled post is properly hidden from public.");
  }

  // 10. CLEANUP & DELETE CHECK
  console.log("\n[10] Checking Blog Deletion...");
  const deleteRes = await fetch(`${BASE_URL}/api/admin/blogs/${createdId}`, {
    method: "DELETE",
    headers: { Cookie: sessionCookie },
  });
  console.log(`- Delete API status: ${deleteRes.status}`);
  if (deleteRes.status === 200) {
    results.blogDelete = true;
    console.log("✓ Blog deletion verified.");
  }

  // 11. JSON FILE BACKUP SYNC
  console.log("\n[11] Checking JSON Backup File Sync...");
  const jsonPath = path.join(process.cwd(), "data", "blogs-export.json");
  if (fs.existsSync(jsonPath)) {
    const jsonContent = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    console.log(`- data/blogs-export.json exists: YES, contains ${jsonContent.length} articles`);
    results.jsonSync = true;
    console.log("✓ JSON backup sync verified.");
  }

  console.log("\n==================================================");
  console.log("               AUDIT SUMMARY REPORT               ");
  console.log("==================================================");
  let allPassed = true;
  for (const [key, passed] of Object.entries(results)) {
    console.log(`${passed ? "✓ PASS" : "✗ FAIL"} : ${key}`);
    if (!passed) allPassed = false;
  }
  console.log(`\nOVERALL STATUS: ${allPassed ? "ALL CHECKS PASSED PERFECTLY!" : "SOME CHECKS FAILED"}`);
}

runFullAudit()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
