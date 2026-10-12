const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories and sample blog...");

  const categories = [
    { name: "GST", slug: "gst", description: "Goods & Services Tax advisory, returns, audits, and refunds" },
    { name: "Income Tax", slug: "income-tax", description: "Direct taxation, return filing, assessment, and CIT appeals" },
    { name: "Audit & Assurance", slug: "audit-assurance", description: "Statutory audits, tax audits, internal audits, and stock verification" },
    { name: "Business Setup", slug: "business-setup", description: "Company incorporation, LLPs, partnerships, and licensing" },
    { name: "Corporate Compliance", slug: "corporate-compliance", description: "Companies Act, ROC annual returns, secretarial records, and FEMA" },
    { name: "Accounting", slug: "accounting", description: "Bookkeeping, finalisation of accounts, and cloud accounting" },
    { name: "Finance & Advisory", slug: "finance-advisory", description: "Bank project reports, CMA data, debt syndication, and IPO review" },
    { name: "Labour Law", slug: "labour-law", description: "Four Labour Codes compliance, EPF, ESIC, and factory licensing" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const sampleBlog = {
    title: "GST Compliance: Why Timely Record-Keeping Matters for Businesses",
    slug: "gst-compliance-timely-record-keeping-businesses",
    category: "GST",
    author: "CA Saurabh Bhutada",
    excerpt:
      "A disciplined approach to GST record-keeping safeguards cash flows, avoids costly ITC disallowances, streamlines departmental audits, and accelerates refund claims under Section 54.",
    featuredImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    status: "Published",
    publishedAt: new Date("2026-10-01T10:00:00.000Z"),
    metaTitle: "GST Compliance: Why Timely Record-Keeping Matters | Y K Chaturvedi & Co.",
    metaDescription:
      "Educational guidance by CA Saurabh Bhutada on maintaining statutory GST records, preventing ITC mismatches, and preparing for departmental audits.",
    focusKeyword: "GST compliance record keeping",
    keywords: "GST compliance, GST record keeping, ITC reconciliation, GSTR-2B, CA in Vasai, Section 35 CGST",
    content: `
<h2>Introduction: The Foundation of Indirect Tax Compliance</h2>
<p>Under the Goods and Services Tax (GST) framework in India, compliance is fundamentally driven by automated digital data matching. Every tax invoice issued, input tax credit (ITC) claimed, and return filed is continuously benchmarked across interconnected government databases.</p>
<p>For small and medium enterprises (MSMEs) and corporate entities alike, maintaining disciplined, real-time records is not merely a statutory formality—it is a critical operational safeguard that protects working capital, eliminates penalty liabilities, and ensures smooth business operations.</p>

<h2>Why Proper GST Records Matter</h2>
<p>Section 35 of the Central Goods and Services Tax (CGST) Act, 2017, read with Rule 56 of the CGST Rules, prescribes that every registered person must maintain a true and correct account of production, outward supplies, inward supplies, stock of goods, input tax credit availed, and output tax payable.</p>
<p>Failure to maintain prescribed records can result in severe statutory consequences, including the estimation of tax liability by authorities, recovery of claimed credits with 18% or 24% interest, and substantial penalties under Section 122 and Section 125.</p>

<h2>Common Record-Keeping Areas Businesses Must Monitor</h2>
<p>To stay compliant, businesses should focus on six core documentation pillars:</p>
<ul>
  <li><strong>Tax Invoices and Debit/Credit Notes:</strong> Ensuring all mandatory invoice fields—such as valid 15-digit GSTIN, sequential numbering, HSN/SAC codes, and place of supply—are accurately recorded.</li>
  <li><strong>Input Tax Credit (ITC) Documentation:</strong> Maintaining purchase vouchers, delivery challans, bills of entry for imports, and transporter LR copies.</li>
  <li><strong>Electronic Credit and Cash Ledgers:</strong> Monthly reconciliation between accounting ledgers and the electronic cash/credit balances on the official GST portal.</li>
  <li><strong>E-Invoicing and E-Way Bill Logs:</strong> Archiving Invoice Reference Numbers (IRN) and QR codes for eligible B2B supplies, alongside e-way bill validities.</li>
  <li><strong>Stock and Manufacturing Registers:</strong> Keeping quantitative accounts of raw materials, goods in process, finished products, scrap, and normal wastage.</li>
  <li><strong>Advances and Reverse Charge (RCM) Records:</strong> Documenting self-invoices and payment vouchers for transactions attracting reverse charge mechanism under Section 9(3) or 9(4).</li>
</ul>

<h2>How Organised Records Support Compliance and Cash Flow</h2>
<p>When books of accounts are reconciled monthly against GST portal data, several significant advantages emerge:</p>
<h3>1. Elimination of Input Tax Credit Leakage</h3>
<p>Under Rule 36(4) and Section 16(2)(aa), ITC is strictly available only if the supplier has uploaded the corresponding invoice in their GSTR-1, reflecting accurately in the buyer's Form GSTR-2B. Timely bookkeeping allows businesses to flag non-compliant vendors immediately before release of payments.</p>

<h3>2. Fast-Track Processing of Section 54 GST Refunds</h3>
<p>For exporters and manufacturers subject to an inverted duty structure, timely records expedite the issuance of refund sanctions under Section 54. Complete reconciliation dossiers prevent the issuance of deficiency memos (Form RFD-03) and accelerate cash disbursements.</p>

<h3>3. Seamless Defense in Departmental Scrutiny and Audits</h3>
<p>When the GST department initiates scrutiny under Section 61 or a departmental audit under Section 65, well-indexed physical and digital documentation allows prompt, authoritative written responses (Form ASMT-11) without stressful emergency reconciliations.</p>

<h2>Conclusion: Cultivating a Compliance-First Business Culture</h2>
<p>Timely record-keeping is not an administrative burden—it is the cornerstone of a financially resilient enterprise. By establishing disciplined internal review routines and leveraging modern cloud accounting tools, businesses protect their bottom line, enhance vendor trust, and operate with complete legal certainty.</p>

<p><strong>Need Assistance with Your GST Compliance?</strong><br />
At <strong>Y K Chaturvedi & Co.</strong>, our indirect tax practice—led by Partner CA Saurabh Bhutada and Senior Manager Gopeshwar Chaturvedi—provides comprehensive GST health checks, monthly filing reviews, ITC reconciliation, refund processing, and departmental audit defense from our offices in Vasai (West) and Vasai (East). Contact our team today for dedicated, partner-supervised guidance.</p>
    `,
  };

  const blog2 = {
    title: "Tax Audit Under Section 44AB: Applicability, Limits & Key Forms",
    slug: "tax-audit-section-44ab-applicability-limits-forms",
    category: "Audit & Assurance",
    author: "CA Saurabh Bhutada",
    excerpt:
      "A complete guide to Section 44AB tax audit applicability, turnover thresholds for digital versus non-digital transactions, Form 3CA-3CD vs 3CB-3CD, and penalties for delayed filing.",
    featuredImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    status: "Published",
    publishedAt: new Date("2026-10-04T09:30:00.000Z"),
    metaTitle: "Tax Audit Under Section 44AB: Limits & Compliance | Y K Chaturvedi & Co.",
    metaDescription:
      "Statutory breakdown of Section 44AB tax audit applicability thresholds, ₹10 Crore digital transaction limit, Form 3CD reporting, and filing deadlines by Y K Chaturvedi & Co.",
    focusKeyword: "Section 44AB tax audit",
    keywords: "tax audit, Section 44AB, Form 3CD, tax audit turnover limit, chartered accountants Vasai, income tax audit",
    content: `
<h2>Understanding Statutory Tax Audits Under Section 44AB</h2>
<p>Section 44AB of the Income Tax Act, 1961 mandates that certain categories of taxpayers carrying on business or profession must have their accounts audited by a practising Chartered Accountant. The core intent of this statutory requirement is to ensure precise computation of taxable income, verify claims for deductions, and prevent tax evasion.</p>

<h2>Turnover Thresholds: Business vs. Profession</h2>
<p>Under current income tax provisions, the turnover limits for audit applicability stand as follows:</p>
<ul>
  <li><strong>Businesses with Cash Transactions:</strong> Mandatory tax audit applies if gross receipts or turnover exceeds ₹1 Crore during the previous year.</li>
  <li><strong>Businesses with High Digital Transactions:</strong> The threshold limit is elevated to ₹10 Crore, provided that aggregate cash receipts and aggregate cash payments do not exceed 5% of total turnover and expenditure respectively.</li>
  <li><strong>Professionals:</strong> Mandatory tax audit applies if gross professional receipts exceed ₹50 Lakhs in the financial year.</li>
  <li><strong>Presumptive Taxation Schemes (Section 44AD / 44ADA):</strong> If an assessee declares profits lower than the prescribed deemed percentage and total income exceeds the basic exemption limit.</li>
</ul>

<h2>Key Audit Reports: Form 3CA vs Form 3CB</h2>
<p>The Chartered Accountant furnishes the audit report online via the Income Tax e-Filing portal in one of two prescribed formats:</p>
<ul>
  <li><strong>Form 3CA - 3CD:</strong> Used for taxpayers whose accounts are already required to be audited under any other law (such as companies audited under the Companies Act, 2013).</li>
  <li><strong>Form 3CB - 3CD:</strong> Used for individuals, firms, and sole proprietorships where audit is mandatory solely under Section 44AB of the Income Tax Act.</li>
  <li><strong>Form 3CD Statement of Particulars:</strong> A comprehensive 44-clause statement disclosing statutory details, depreciation schedules, related-party payments under Section 40A(2)(b), and TDS compliance.</li>
</ul>

<h2>Consequences of Non-Filing or Delayed Filing</h2>
<p>Under Section 271B, failure to obtain and submit the audit report by the statutory due date (30th September of the assessment year) attracts a penalty equal to 0.5% of total sales or turnover, subject to a statutory ceiling of ₹1,50,000.</p>
    `,
  };

  const blog3 = {
    title: "Company Incorporation in Maharashtra: SPICe+ Workflow & Post-Setup Checklist",
    slug: "company-incorporation-maharashtra-spice-plus-workflow",
    category: "Business Setup",
    author: "CA Saurabh Bhutada",
    excerpt:
      "Step-by-step statutory process for incorporating a Private Limited Company in Maharashtra via the MCA V3 SPICe+ portal, including RUN name reservation, AGILE-PRO-S, and 180-day INC-20A compliance.",
    featuredImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    status: "Published",
    publishedAt: new Date("2026-10-07T11:00:00.000Z"),
    metaTitle: "Company Incorporation in Maharashtra: SPICe+ Guide | Y K Chaturvedi & Co.",
    metaDescription:
      "Step-by-step CA guide on incorporating Private Limited Companies in Maharashtra, MCA V3 filings, Director DIN, PAN, TAN, GSTIN, and post-incorporation INC-20A rules.",
    focusKeyword: "company incorporation Maharashtra",
    keywords: "company incorporation, MCA V3, SPICe plus, private limited company, business setup Vasai, INC 20A compliance",
    content: `
<h2>Starting a Corporate Enterprise in Maharashtra</h2>
<p>Maharashtra remains India's premier commercial hub, attracting entrepreneurs across manufacturing, financial technology, trade, and IT services. Registering a Private Limited Company provides limited liability protection, enhanced institutional credibility, and seamless capital-raising capabilities.</p>

<h2>The Integrated SPICe+ Filing Procedure (MCA V3)</h2>
<p>The Ministry of Corporate Affairs (MCA) has streamlined incorporation into a single integrated digital workflow:</p>
<ol>
  <li><strong>Part A (RUN - Reserve Unique Name):</strong> Application for name reservation of the proposed company, valid for 20 days upon approval.</li>
  <li><strong>Part B (Integrated Incorporation):</strong> Joint submission of Memorandum of Association (e-MOA Form INC-33), Articles of Association (e-AOA Form INC-34), and Director Identification Numbers (DIN).</li>
  <li><strong>AGILE-PRO-S Linked Registrations:</strong> Simultaneous automatic allotment of Company PAN, TAN, GSTIN, EPFO, ESIC, and Professional Tax Registration (mandatory for Maharashtra).</li>
</ol>

<h2>Critical Post-Incorporation Compliance (180-Day Rule)</h2>
<p>Incorporation is merely the starting point. Directors must execute the following statutory obligations immediately after receiving the Certificate of Incorporation (COI):</p>
<ul>
  <li><strong>Deposit of Share Capital:</strong> Shareholders must deposit their subscribed capital into the newly opened corporate current bank account.</li>
  <li><strong>Form INC-20A (Commencement of Business):</strong> Mandatory declaration filed within 180 days of incorporation with proof of capital credit. Failure to file incurs heavy daily penalties and de-registration risks.</li>
  <li><strong>Appointment of First Statutory Auditor (Form ADT-1):</strong> The Board must appoint a Chartered Accountant within 30 days of incorporation under Section 139(6).</li>
</ul>
    `,
  };

  for (const b of [sampleBlog, blog2, blog3]) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
    console.log("Seeded blog:", b.title);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
