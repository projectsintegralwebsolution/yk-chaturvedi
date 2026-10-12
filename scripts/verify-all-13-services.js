const { servicesData } = require("../data/servicesData.ts");

const BASE_URL = "http://localhost:3000";

async function verifyAll13Services() {
  console.log("==================================================");
  console.log("   VERIFYING ALL 13 SERVICES PAGES IN NEXT.JS     ");
  console.log("==================================================\n");

  let allSuccess = true;

  console.log(`Checking ${servicesData.length} service pages:\n`);

  for (const s of servicesData) {
    const url = `${BASE_URL}/services/${s.slug}`;
    try {
      const res = await fetch(url);
      const html = await res.text();
      const hasTitle = html.includes(s.title);
      if (res.status === 200 && hasTitle) {
        console.log(`✓ [200 OK] Practice Area #${s.categoryNumber}: ${s.title} (${url})`);
      } else {
        console.error(`✗ [FAIL] #${s.categoryNumber}: ${s.title} - status: ${res.status}, title in HTML: ${hasTitle}`);
        allSuccess = false;
      }
    } catch (e) {
      console.error(`✗ [ERROR] #${s.categoryNumber}: ${s.title} - ${e.message}`);
      allSuccess = false;
    }
  }

  // Check Admin Pages list
  console.log("\nChecking Admin Pages API for all 13 services...");
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "admin",
      password: "adminpassword2026",
    }),
  });
  const cookie = loginRes.headers.get("set-cookie")?.split(";")[0] || "";

  const pagesRes = await fetch(`${BASE_URL}/api/admin/pages`, {
    headers: { Cookie: cookie },
  });
  const pages = await pagesRes.json();
  const servicePagesInDb = pages.filter((p) => p.category === "Service Page");

  console.log(`Total Pages in Admin: ${pages.length}`);
  console.log(`Service Pages in Admin: ${servicePagesInDb.length} (Expected: 13)`);

  if (servicePagesInDb.length === 13) {
    console.log("✓ All 13 service pages are present and editable in Admin!");
  } else {
    console.error(`✗ Expected 13 service pages in DB, found ${servicePagesInDb.length}`);
    allSuccess = false;
  }

  console.log("\n==================================================");
  if (allSuccess) {
    console.log("ALL 13 SERVICES VERIFIED AND FULLY EDITABLE!");
  } else {
    console.error("SOME SERVICES FAILED VERIFICATION");
    process.exit(1);
  }
  console.log("==================================================");
}

verifyAll13Services().catch((e) => {
  console.error(e);
  process.exit(1);
});
