const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:3000";

async function runPagesAudit() {
  console.log("==================================================");
  console.log("     PAGES MANAGEMENT & SEO SYSTEM AUDIT         ");
  console.log("==================================================\n");

  let passed = 0;
  let failed = 0;

  function report(name, success, details = "") {
    if (success) {
      console.log(`✓ PASS : ${name} ${details ? "- " + details : ""}`);
      passed++;
    } else {
      console.error(`✗ FAIL : ${name} ${details ? "- " + details : ""}`);
      failed++;
    }
  }

  // 1. Check Public Routes
  console.log("[1] Checking Public Pages...");
  const publicRoutes = ["/", "/about", "/services", "/services/audit-assurance", "/partners", "/team", "/contact", "/blog"];
  for (const r of publicRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${r}`);
      report(`Route ${r}`, res.status === 200, `status: ${res.status}`);
    } catch (err) {
      report(`Route ${r}`, false, err.message);
    }
  }

  // 2. Admin Authentication
  console.log("\n[2] Checking Admin Auth & Protection...");
  let cookieHeader = "";
  try {
    const unauth = await fetch(`${BASE_URL}/admin/pages`, { redirect: "manual" });
    report("Protect /admin/pages unauthenticated", unauth.status === 307 || unauth.status === 302, `status: ${unauth.status}`);

    const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        password: "adminpassword2026",
      }),
    });
    const setCookie = loginRes.headers.get("set-cookie");
    if (setCookie) {
      cookieHeader = setCookie.split(";")[0];
    }
    report("Admin Login with admin/adminpassword2026", loginRes.status === 200, `cookie obtained`);
  } catch (err) {
    report("Admin Login", false, err.message);
  }

  // 3. Pages API List
  console.log("\n[3] Checking Admin Pages API...");
  try {
    const pagesRes = await fetch(`${BASE_URL}/api/admin/pages`, {
      headers: { Cookie: cookieHeader },
    });
    const pages = await pagesRes.json();
    report("GET /api/admin/pages", pagesRes.status === 200 && Array.isArray(pages), `Found ${pages.length} pages in DB`);
  } catch (err) {
    report("GET /api/admin/pages", false, err.message);
  }

  // 4. Image Upload for Pages
  console.log("\n[4] Checking Computer Image Upload for Pages...");
  let uploadedUrl = "";
  try {
    const pngHeader = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
      0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
      0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41,
      0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00,
      0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
      0x42, 0x60, 0x82,
    ]);

    const blob = new Blob([pngHeader], { type: "image/png" });
    const formData = new FormData();
    formData.append("file", blob, "test-page-banner.png");
    formData.append("folder", "pages");

    const uploadRes = await fetch(`${BASE_URL}/api/admin/upload`, {
      method: "POST",
      headers: { Cookie: cookieHeader },
      body: formData,
    });
    const uploadData = await uploadRes.json();
    uploadedUrl = uploadData.url;
    report("Upload banner image from computer", uploadRes.status === 200 && uploadedUrl.startsWith("/uploads/pages/"), `URL: ${uploadedUrl}`);

    const serveRes = await fetch(`${BASE_URL}${uploadedUrl}`);
    report("Serve uploaded page banner via HTTP", serveRes.status === 200, `status: ${serveRes.status}`);
  } catch (err) {
    report("Upload banner image", false, err.message);
  }

  // 5. Page Editing & Front-end reflection
  console.log("\n[5] Checking Page Editing & Live Reflection...");
  try {
    const editPayload = {
      title: "About Us (Updated by Admin)",
      bannerTitle: "About Y K Chaturvedi & Co. (Partner-Led)",
      bannerSubtitle: "Updated subtitle verifying WordPress-style live page editing functionality.",
      bannerBadge: "ICAI Registered Partner Firm",
      introHeadline: "Decades of Statutory Depth & Compliance Rigor",
      introText: "Live edited lead paragraph confirming immediate reflection on the published page.",
      content: `<h2>Audit Verification Heading H2</h2>
<p>This content was edited via the WordPress-style Page Editor with full H1-H6 support and image embedding.</p>
<h3>Sub-heading H3</h3>
<p>Detailed statutory audit notes with <strong>bold</strong> and <em>italic</em> styling.</p>`,
      metaTitle: "About Us | Updated SEO Meta Title | Y K Chaturvedi & Co.",
      metaDescription: "Updated SEO meta description with exact character count optimizing Google SERP preview.",
      focusKeyword: "About Y K Chaturvedi CA",
    };

    const updateRes = await fetch(`${BASE_URL}/api/admin/pages/about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(editPayload),
    });
    report("PUT /api/admin/pages/about", updateRes.status === 200, "Page content updated in SQLite");

    // Fetch public /about page
    const publicAbout = await fetch(`${BASE_URL}/about`);
    const aboutHtml = await publicAbout.text();
    const hasUpdatedHeadline = aboutHtml.includes("Decades of Statutory Depth");
    const hasUpdatedH2 = aboutHtml.includes("Audit Verification Heading H2");
    report("Public /about displays updated headline & content", hasUpdatedHeadline && hasUpdatedH2, "Live content verified");

    // Check JSON backup
    const exportPath = path.join(process.cwd(), "data", "pages-export.json");
    const jsonExists = fs.existsSync(exportPath);
    const jsonContent = jsonExists ? fs.readFileSync(exportPath, "utf-8") : "";
    report("data/pages-export.json updated", jsonExists && jsonContent.includes("About Us (Updated by Admin)"), "JSON disk backup verified");
  } catch (err) {
    report("Page Editing", false, err.message);
  }

  // 6. Custom Page Creation & Dynamic Route
  console.log("\n[6] Checking Custom Landing Page Creation...");
  try {
    const customPagePayload = {
      title: "Careers & Article Training",
      slug: "careers-test-audit",
      path: "/careers-test-audit",
      category: "Custom Page",
      status: "Published",
      bannerTitle: "Careers & Practical Article Training",
      bannerSubtitle: "Join our integrated 15-member team across Vasai West & Vasai East.",
      bannerBadge: "ICAI Articleship",
      introHeadline: "Empowering Next-Generation Chartered Accountants",
      introText: "Comprehensive exposure to statutory audit, GST litigation, and banking consortium compliances.",
      content: `<h2>Why Train with Y K Chaturvedi & Co.?</h2>
<p>Direct exposure under FCA & ACA partners with practical training across diverse industries.</p>`,
      bulletPoints: JSON.stringify(["Statutory Audit Experience", "Direct Partner Mentorship", "GST Litigation Practice"]),
      metaTitle: "Careers & Articleship | Y K Chaturvedi & Co.",
      metaDescription: "Apply for CA Articleship and accounting executive careers in Vasai at Y K Chaturvedi & Co.",
      focusKeyword: "CA Articleship Vasai",
    };

    const createRes = await fetch(`${BASE_URL}/api/admin/pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(customPagePayload),
    });
    const createdPage = await createRes.json();
    report("POST /api/admin/pages create custom page", createRes.status === 201, `ID: ${createdPage.id}`);

    // Verify public route
    const customRouteRes = await fetch(`${BASE_URL}/careers-test-audit`);
    const customHtml = await customRouteRes.text();
    report("Dynamic custom page route /careers-test-audit renders 200", customRouteRes.status === 200 && customHtml.includes("Empowering Next-Generation Chartered Accountants"), "Live page rendered");

    // Clean up test page
    const delRes = await fetch(`${BASE_URL}/api/admin/pages/${createdPage.id}`, {
      method: "DELETE",
      headers: { Cookie: cookieHeader },
    });
    report("DELETE /api/admin/pages/:id clean up test page", delRes.status === 200, "Test page deleted");
  } catch (err) {
    report("Custom Page Creation", false, err.message);
  }

  // 7. Verify Blog System Remains 100% Intact
  console.log("\n[7] Verifying Blogs System Untouched & 100% Intact...");
  try {
    const blogsRes = await fetch(`${BASE_URL}/api/admin/blogs`, {
      headers: { Cookie: cookieHeader },
    });
    const blogsData = await blogsRes.json();
    const blogList = blogsData.blogs || blogsData;
    report("Blog API /api/admin/blogs working", blogsRes.status === 200 && Array.isArray(blogList), `Found ${blogList.length} articles`);

    const publicBlog = await fetch(`${BASE_URL}/blog`);
    report("Public Blog page /blog renders 200", publicBlog.status === 200, "Blog listing live");
  } catch (err) {
    report("Blog verification", false, err.message);
  }

  console.log("\n==================================================");
  console.log(`TOTAL CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runPagesAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});
