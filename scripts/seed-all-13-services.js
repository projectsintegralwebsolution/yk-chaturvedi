const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const { servicesData } = require("../data/servicesData.ts");

const prisma = new PrismaClient();

const defaultPages = [
  {
    slug: "home",
    title: "Home Page",
    path: "/",
    category: "Main Page",
    status: "Published",
    bannerTitle: "Professional Expertise. Partner-Led Approach.",
    bannerSubtitle: "Y K Chaturvedi & Co. is a partnership firm of Chartered Accountants registered with ICAI (FRN: 145633W), practising from two offices in Vasai, Dist. Palghar.",
    bannerBadge: "ICAI Registered CA Partnership Firm",
    bannerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
    introHeadline: "Professional Expertise. Partner-Led Approach.",
    introText: "Y K Chaturvedi & Co. is a partnership firm of Chartered Accountants registered with the Institute of Chartered Accountants of India (ICAI), established on 02 September 2017 and practising from two offices in Vasai, Dist. Palghar. The firm serves corporates, LLPs, partnership firms, MSMEs, trusts, societies, and individuals with comprehensive audit, taxation, certification, regulatory compliance, business setup, and advisory services—under direct partner supervision.",
    content: `<h2>About Y K Chaturvedi & Co.</h2>
<p>Established on <strong>02 September 2017</strong>, Y K Chaturvedi & Co. has grown into one of the most reliable and trusted Chartered Accountancy firms in the Mumbai Metropolitan Region and Palghar district. Every client engagement is managed directly by a designated partner, guaranteeing statutory depth, timely filing, and strategic commercial insights.</p>
<h3>Our Established Client Base</h3>
<p>We take pride in serving over <strong>800+ Income-tax clients</strong> and <strong>250+ GST registrants</strong> across diverse industry sectors including engineering, manufacturing, logistics, retail, information technology, and real estate development.</p>`,
    bulletPoints: JSON.stringify([
      "Direct Partner Supervision on Every Engagement",
      "Registered with ICAI (FRN: 145633W)",
      "Two-Office Presence in Vasai (West & East)",
      "Over 800+ Tax & 250+ GST Clients Served",
      "Litigation, Scrutiny & Refund Defense Expertise",
      "15-Member Integrated Professional Team"
    ]),
    metaTitle: "Chartered Accountants in Vasai | Y K Chaturvedi & Co.",
    metaDescription: "Partnership firm of Chartered Accountants in Vasai (West & East) registered with ICAI (FRN: 145633W). Direct partner-led statutory audit, GST, income tax & advisory.",
    focusKeyword: "Chartered Accountants Vasai",
    keywords: "Chartered Accountants Vasai, CA in Palghar, CA Firm Mumbai, Tax Audit, GST Consultant",
    canonicalUrl: "https://ykcassociates.in/"
  },
  {
    slug: "about",
    title: "About Us",
    path: "/about",
    category: "Main Page",
    status: "Published",
    bannerTitle: "About Y K Chaturvedi & Co.",
    bannerSubtitle: "Professional expertise built on experience, statutory rigor, and a dedicated partner-led service approach.",
    bannerBadge: "ICAI Registered CA Partnership Firm",
    bannerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
    introHeadline: "Partner-Led Chartered Accountancy & Business Advisory",
    introText: "Y K Chaturvedi & Co. is a partnership firm of Chartered Accountants registered with the Institute of Chartered Accountants of India (ICAI), established on 02 September 2017 and practising from two strategically located offices in Vasai, Dist. Palghar.",
    content: `<h2>Our Firm's Heritage & Ethos</h2>
<p>At Y K Chaturvedi & Co., we believe that modern businesses deserve more than standard box-ticking compliance. They need proactive advisory, rock-solid legal backing during scrutiny proceedings, and clear forward-looking tax planning.</p>
<h3>Uncompromising Partner Involvement</h3>
<p>Unlike firms where client work is delegated completely to junior staff, our partners remain actively involved in every single deliverable—from statutory audit finalisations to high-stakes GST appeal drafting.</p>`,
    bulletPoints: JSON.stringify([
      "Registered with ICAI (FRN: 145633W)",
      "GSTIN: 27AACFY3275B1Z9",
      "Continuous Practice Since September 2017",
      "Head Office in Vasai West & Branch in Vasai East",
      "Strict Adherence to ICAI Code of Ethics"
    ]),
    metaTitle: "About Us | Professional Expertise & Credentials | Y K Chaturvedi & Co.",
    metaDescription: "Learn about Y K Chaturvedi & Co., Chartered Accountants (FRN: 145633W, GSTIN: 27AACFY3275B1Z9). Established in September 2017, serving 800+ tax and 250+ GST clients under direct partner supervision from two Vasai offices.",
    focusKeyword: "About Y K Chaturvedi CA",
    keywords: "About CA firm, ICAI FRN 145633W, Chartered Accountants Vasai, Partnership Firm",
    canonicalUrl: "https://ykcassociates.in/about"
  },
  {
    slug: "services",
    title: "Our Services",
    path: "/services",
    category: "Main Page",
    status: "Published",
    bannerTitle: "Our Areas of Practice",
    bannerSubtitle: "Comprehensive financial, taxation, compliance and advisory solutions delivered under direct partner supervision.",
    bannerBadge: "13 Specialized Practice Areas",
    bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop",
    introHeadline: "Integrated Capabilities for Every Business Stage",
    introText: "Whether you are an established corporate requiring statutory audit and cross-border FEMA advisory, an MSME navigating GST scrutiny and working capital loans, or an entrepreneur incorporating a company—our partners lead each assignment from planning to completion.",
    content: `<h2>End-to-End Professional Accounting & Compliance Services</h2>
<p>Our multidisciplinary practice spans across 13 distinct practice verticals, covering traditional statutory audits to advanced cross-border financing, transfer pricing documentation, and appellate litigation representation.</p>`,
    bulletPoints: JSON.stringify([
      "Statutory & Tax Audit under Companies Act & Income Tax Act",
      "GST Return Filing, Advisory, Refunds & Litigation Representation",
      "Corporate Income Tax, TDS, and High-Net-Worth Individual Filings",
      "Company Registration, LLP Setup & ROC Compliance",
      "Project Financing, CMA Data & Banking Consortium Advisory"
    ]),
    metaTitle: "Services & Practice Areas | Audit, Tax, GST, ROC, Finance | Y K Chaturvedi & Co.",
    metaDescription: "Explore the 13 comprehensive practice areas of Y K Chaturvedi & Co. Chartered Accountants, including Audit, Direct Tax, GST, Business Setup, ROC, Project Finance, and Labour Codes.",
    focusKeyword: "CA Services Vasai",
    keywords: "Audit services, GST filing, Direct Tax, Company Registration, CMA Data, CA in Vasai",
    canonicalUrl: "https://ykcassociates.in/services"
  },
  {
    slug: "partners",
    title: "Partners & Leadership",
    path: "/partners",
    category: "Main Page",
    status: "Published",
    bannerTitle: "Partners & Executive Leadership",
    bannerSubtitle: "Seasoned Chartered Accountants bringing decades of corporate finance, indirect taxation, and statutory audit experience under direct partner supervision.",
    bannerBadge: "Executive Leadership",
    bannerImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop",
    introHeadline: "Decades of Corporate & Practice Experience",
    introText: "At Y K Chaturvedi & Co., our leadership brings together corporate finance acumen, banking compliance mastery, and indirect tax litigation expertise to safeguard your interests.",
    content: `<h2>Our Senior Partner Leadership</h2>
<p>With combined executive leadership spanning over 30 years of corporate finance, statutory auditing, and tax court representations, CA Yogesh Kumar Chaturvedi and CA Saurabh Bhutada direct the firm's client advisory desk with unwavering integrity.</p>`,
    bulletPoints: JSON.stringify([
      "CA Yogesh Kumar Chaturvedi: 19+ Years Experience (FCA)",
      "CA Saurabh Bhutada: 12+ Years Experience (ACA, ICAI M.No. 176210)",
      "Direct Authorised Representation before GST & Income Tax Authorities",
      "Extensive Banking Consortium & Corporate Treasury Experience"
    ]),
    metaTitle: "Partners | CA Yogesh Kumar Chaturvedi & CA Saurabh Bhutada",
    metaDescription: "Meet the partners of Y K Chaturvedi & Co.: CA Yogesh Kumar Chaturvedi (19+ years experience) and CA Saurabh Bhutada (12+ years experience, ICAI M. No. 176210). Direct partner supervision across all audit, tax, and advisory engagements.",
    focusKeyword: "CA Partners Vasai",
    keywords: "CA Yogesh Kumar Chaturvedi, CA Saurabh Bhutada, Chartered Accountants Palghar",
    canonicalUrl: "https://ykcassociates.in/partners"
  },
  {
    slug: "team",
    title: "Our Team",
    path: "/team",
    category: "Main Page",
    status: "Published",
    bannerTitle: "Our Professional Team",
    bannerSubtitle: "15 dedicated professionals operating across our Vasai West and Vasai East offices.",
    bannerBadge: "15-Member Integrated Team",
    bannerImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop",
    introHeadline: "Integrated Professional Synergy Across Two Offices",
    introText: "Our firm brings together qualified Chartered Accountants, seasoned senior managers, accounts executives, and aspiring CA article assistants into a collaborative unit.",
    content: `<h2>The People Behind Our Reliable Execution</h2>
<p>Behind every seamless audit sign-off and timely GST filing is our 15-member team of dedicated professionals. With rigorous internal training, standardized SOPs, and dual-layer review protocols, we ensure zero compliance oversights.</p>`,
    bulletPoints: JSON.stringify([
      "2 Partners – Chartered Accountants (FCA & ACA)",
      "1 Senior Manager – Gopeshwar Chaturvedi (15+ years experience)",
      "Experienced Accounts & Compliance Executives",
      "Dedicated Article Assistants undergoing ICAI practical training"
    ]),
    metaTitle: "Our Team | 15 Professionals. One Integrated Team. | Y K Chaturvedi & Co.",
    metaDescription: "Explore the 15-member professional team at Y K Chaturvedi & Co., Chartered Accountants, spanning partners, senior manager Gopeshwar Chaturvedi, accounts executives, and article assistants across two Vasai offices.",
    focusKeyword: "CA Firm Team Vasai",
    keywords: "CA Firm Team, Chartered Accountants Staff, Gopeshwar Chaturvedi, Vasai CA Team",
    canonicalUrl: "https://ykcassociates.in/team"
  },
  {
    slug: "contact",
    title: "Contact Us",
    path: "/contact",
    category: "Main Page",
    status: "Published",
    bannerTitle: "Contact Our Offices",
    bannerSubtitle: "Let's start a conversation. Reach out to our partner-led practice across Vasai West and Vasai East.",
    bannerBadge: "Two Strategic Locations",
    bannerImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1920&auto=format&fit=crop",
    introHeadline: "Get in Touch with Our Team",
    introText: "We welcome client visits by appointment at both our Vasai West and Vasai East premises. Feel free to contact our partners directly by phone, WhatsApp, or through the enquiry form.",
    content: `<h2>Consultation & Office Visits</h2>
<p>To ensure focused partner attention and avoid waiting, we recommend booking a prior appointment before visiting our offices. You can reach out directly via phone or WhatsApp, or submit your query through our secure contact form.</p>`,
    bulletPoints: JSON.stringify([
      "Head Office: Shree Triveni CHS, 60 Feet Road, Ambadi Road, Vasai West",
      "Branch Office: 312, Infinity Square, Golani, Vasai East",
      "Direct Partner Lines: +91 93221 65502 / +91 90491 02047",
      "Email: caykc2007@gmail.com"
    ]),
    metaTitle: "Contact Us | Vasai West & Vasai East Offices | Y K Chaturvedi & Co.",
    metaDescription: "Get in touch with Y K Chaturvedi & Co., Chartered Accountants. Head Office in Vasai West (Ambadi Road) and Branch Office in Vasai East (Infinity Square). Call +91 93221 65502 / +91 90491 02047.",
    focusKeyword: "Contact CA Vasai",
    keywords: "Contact CA, CA Office Vasai West, CA Office Vasai East, Chartered Accountants Contact",
    canonicalUrl: "https://ykcassociates.in/contact"
  }
];

function buildServicePageEntry(service) {
  const padNum = service.categoryNumber < 10 ? `0${service.categoryNumber}` : `${service.categoryNumber}`;
  
  // Format strategic benefits into HTML
  let benefitsHtml = "";
  if (service.strategicBenefits && service.strategicBenefits.length > 0) {
    benefitsHtml = `<h3>Strategic Business Benefits</h3>
<ul>
${service.strategicBenefits.map(b => `  <li><strong>${b.title}:</strong> ${b.desc}</li>`).join("\n")}
</ul>`;
  }

  // Format process steps into HTML
  let processHtml = "";
  if (service.processSteps && service.processSteps.length > 0) {
    processHtml = `<h3>Our Step-by-Step Execution Process</h3>
<ol>
${service.processSteps.map(p => `  <li><strong>Step ${p.step} - ${p.title}:</strong> ${p.desc}</li>`).join("\n")}
</ol>`;
  }

  const content = `<h2>Professional ${service.title} Practice</h2>
<p>${service.shortDesc}</p>
<p>At <strong>Y K Chaturvedi &amp; Co.</strong>, our ${service.title.toLowerCase()} practice delivers rigorous statutory compliance, end-to-end documentation accuracy, and direct partner supervision to protect your business against non-compliance liabilities.</p>
${benefitsHtml}
${processHtml}`;

  return {
    slug: service.slug,
    title: service.title,
    path: `/services/${service.slug}`,
    category: "Service Page",
    status: "Published",
    bannerTitle: service.title,
    bannerSubtitle: service.heroTagline || service.shortDesc,
    bannerBadge: `Practice Area ${padNum}`,
    bannerImage: service.bannerImage,
    introHeadline: "Overview & Scope of Practice",
    introText: service.shortDesc,
    content: content,
    bulletPoints: JSON.stringify(service.inclusions || []),
    metaTitle: `${service.title} | CA Services in Vasai & Palghar`,
    metaDescription: `${service.shortDesc} Delivered under direct partner supervision by Y K Chaturvedi & Co. Chartered Accountants (FRN: 145633W).`.slice(0, 160),
    focusKeyword: `${service.title} Vasai`,
    keywords: `${service.title}, Chartered Accountants, CA Firm Vasai, Palghar, ICAI FRN 145633W`,
    canonicalUrl: `https://ykcassociates.in/services/${service.slug}`,
  };
}

async function seedAllPages() {
  console.log("Seeding all 6 main pages and all 13 service pages into SQLite...");

  // 1. Seed Main Pages
  for (const page of defaultPages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    });
    console.log(`✓ Main Page synced: ${page.title} (${page.slug})`);
  }

  // 2. Remove obsolete temporary slugs if any
  try {
    await prisma.page.deleteMany({
      where: { slug: "gst-indirect-tax" },
    });
  } catch (e) {}

  // 3. Seed All 13 Service Pages
  for (const service of servicesData) {
    const pageEntry = buildServicePageEntry(service);
    await prisma.page.upsert({
      where: { slug: service.slug },
      update: pageEntry,
      create: pageEntry,
    });
    console.log(`✓ Service Page #${service.categoryNumber} synced: ${service.title} (/services/${service.slug})`);
  }

  // 4. Backup all pages to data/pages-export.json
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const allPages = await prisma.page.findMany({
    orderBy: { slug: "asc" },
  });

  fs.writeFileSync(
    path.join(dataDir, "pages-export.json"),
    JSON.stringify(allPages, null, 2),
    "utf-8"
  );

  console.log(`\nSUCCESS: Synced all ${allPages.length} website pages to SQLite and data/pages-export.json!`);
}

seedAllPages()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
