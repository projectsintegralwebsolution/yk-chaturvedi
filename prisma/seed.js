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

<h2>Common Mistakes Businesses Should Avoid</h2>
<p>During our practice across Maharashtra and the Mumbai Metropolitan Region, our indirect tax desk frequently identifies the following preventable errors:</p>
<ul>
  <li><strong>Postponing Reconciliations to Annual Filing:</strong> Waiting until GSTR-9/9C deadline leaves no window to rectify supplier defaults within statutory limitation periods (Section 16(4)).</li>
  <li><strong>Non-Compliance with the 180-Day Rule:</strong> Failing to reverse ITC along with interest when supplier invoices remain unpaid beyond 180 days under the second proviso to Section 16(2).</li>
  <li><strong>Incorrect Place of Supply Tagging:</strong> Treating inter-state supply as intra-state or vice-versa, resulting in dual tax deposits and protracted refund applications.</li>
  <li><strong>Failure to Retain Records for the Prescribed Period:</strong> Section 36 mandates that books of accounts and records must be retained for at least 72 months (6 years) from the due date of furnishing the annual return for that financial year.</li>
</ul>

<h2>Practical Monthly GST Checklist for Businesses</h2>
<p>Incorporate the following 7 checkpoints into your monthly finance workflow:</p>
<ol>
  <li>Reconcile purchase ledger with auto-drafted GSTR-2B before filing Form GSTR-3B.</li>
  <li>Verify that all B2B sales invoices have generated IRN if the enterprise exceeds turnover thresholds.</li>
  <li>Ensure all e-way bills generated have matching outward supply invoice details.</li>
  <li>Review debtor and creditor ageing to flag any vendor payments approaching 180 days.</li>
  <li>Check reverse charge liabilities on legal fees, freight, and unregistered purchases.</li>
  <li>Validate sequential numbering of tax invoices, credit notes, and delivery challans.</li>
  <li>Archive monthly return JSON files, filing acknowledgements, and payment challans.</li>
</ol>

<h2>Conclusion: Cultivating a Compliance-First Business Culture</h2>
<p>Timely record-keeping is not an administrative burden—it is the cornerstone of a financially resilient enterprise. By establishing disciplined internal review routines and leveraging modern cloud accounting tools, businesses protect their bottom line, enhance vendor trust, and operate with complete legal certainty.</p>

<p><strong>Need Assistance with Your GST Compliance?</strong><br />
At <strong>Y K Chaturvedi & Co.</strong>, our indirect tax practice—led by Partner CA Saurabh Bhutada and Senior Manager Gopeshwar Chaturvedi—provides comprehensive GST health checks, monthly filing reviews, ITC reconciliation, refund processing, and departmental audit defense from our offices in Vasai (West) and Vasai (East). Contact our team today for dedicated, partner-supervised guidance.</p>
    `,
  };

  const blog = await prisma.blog.upsert({
    where: { slug: sampleBlog.slug },
    update: sampleBlog,
    create: sampleBlog,
  });

  console.log("Sample blog created/verified:", blog.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
