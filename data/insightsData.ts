export interface InsightArticle {
  slug: string;
  title: string;
  category: string;
  publishDate: string;
  readTime: string;
  author: string;
  summary: string;
  featuredImage: string;
  content: string[];
  keyTakeaways: string[];
  faqs?: { question: string; answer: string }[];
}

export const insightsData: InsightArticle[] = [
  {
    slug: "navigating-income-tax-act-2025-key-changes-transition",
    title: "Navigating the Income-tax Act, 2025: Key Changes, Corporate Transition & Practical Advisory",
    category: "Income Tax",
    publishDate: "October 01, 2026",
    readTime: "7 min read",
    author: "CA Yogesh Kumar Chaturvedi",
    summary: "With the newly codified Income-tax Act, 2025 coming into effect from 01 April 2026, businesses, LLPs, and individual taxpayers must align their tax planning, depreciation schedules, and corporate transactions.",
    featuredImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    content: [
      "The enactment of the Income-tax Act, 2025 represents a landmark overhaul of India's direct tax legislation, modernizing the six-decade-old framework of the 1961 Act. Effective from 01 April 2026 (Assessment Year 2026-27 onwards), the legislation simplifies statutory language, rationalizes computational provisions, and consolidates procedural compliances.",
      "One of the primary structural changes is the rationalization of capital gains definitions, standardized holding periods across financial and non-financial assets, and enhanced reporting parameters. Corporate taxpayers must scrutinize the revised corporate tax provisions, specifically regarding carry-forward of business losses and amalgamation benefits under Section 72A equivalents.",
      "For partnership firms and LLPs, the limits and conditions governing remuneration to working partners and interest on capital have been recalibrated to reflect contemporary business realities. At Y K Chaturvedi & Co., our direct taxation desk is actively assisting clients in modeling the impact of these changes on their FY 2026-27 advance tax obligations and long-term tax planning strategies."
    ],
    keyTakeaways: [
      "Effective date: 01 April 2026 across India.",
      "Streamlined tax calculation methodology and reduced litigation triggers in assessment procedures.",
      "Crucial transition window for LLPs, partnership firms, and companies to adjust partner agreements and tax withholding arrangements.",
      "Enhanced emphasis on automated data-matching through AIS, TIS, and corporate banking records."
    ],
    faqs: [
      {
        question: "When does the Income-tax Act, 2025 become applicable?",
        answer: "The Act takes effect from 01 April 2026, meaning it governs financial transactions, income computations, and tax filings from Financial Year 2026-27 (Assessment Year 2027-28)."
      },
      {
        question: "How should companies prepare for this transition?",
        answer: "Companies should conduct a pre-implementation tax audit before March 2026 to review pending tax attributes, capital expenditure plans, and existing employee benefit packages."
      }
    ]
  },
  {
    slug: "gst-refunds-section-54-export-inverted-duty-structure",
    title: "Unlocking Working Capital: A Practitioner's Guide to GST Refunds under Section 54",
    category: "GST & Indirect Tax",
    publishDate: "September 24, 2026",
    readTime: "8 min read",
    author: "Gopeshwar Chaturvedi (Sr. Manager) & CA Saurabh Bhutada",
    summary: "A practical guide to filing, defending, and recovering accumulated input tax credits through GST refund claims for exporters and businesses under inverted duty structures.",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    content: [
      "Input Tax Credit (ITC) accumulation represents a substantial drain on business liquidity, particularly for exporters and manufacturers subject to an inverted duty structure. Section 54 of the CGST Act, read with Rule 89, establishes clear statutory mechanisms to claim cash refunds of accumulated unutilized ITC or excess balances in the electronic cash ledger.",
      "The formula for inverted duty refund under Rule 89(5) was significantly clarified by CBIC circulars to resolve anomalies between input goods and input services. To secure smooth sanction of Form RFD-01, thorough reconciliation between GSTR-1, GSTR-3B, GSTR-2B, and ICEGATE shipping bills is paramount. Any mismatch between invoice values or tax rates can result in deficiency memos (RFD-03) or provisional rejection.",
      "With over 8 years of dedicated experience specifically in GST Audit and GST Refund claims, our specialized refund team at Y K Chaturvedi & Co. ensures every claim dossier is fortified with requisite CA certificates, statement of invoices, and proper verification before submission."
    ],
    keyTakeaways: [
      "Zero-rated exporters under LUT can claim 100% of accumulated ITC on inputs and input services.",
      "Inverted duty manufacturers must accurately apply the net ITC formula under Rule 89(5).",
      "Deficiency memos (Form RFD-03) must be rectified immediately to prevent expiration of the 2-year limitation period.",
      "Direct partner-led supervision minimizes departmental objections and accelerates provisional sanctioning (RFD-04)."
    ],
    faqs: [
      {
        question: "What is the time limit for filing a GST refund application?",
        answer: "Under Section 54(1), a refund application must be filed within two years from the relevant date (e.g. shipping bill date for exports, or return due date for inverted duty structure)."
      },
      {
        question: "Is CA certification necessary for GST refund claims?",
        answer: "A CA certificate (Annexure 2 of Circular 125/44/2019) is mandatory for refund claims exceeding ₹2 Lakhs to certify that the incidence of tax has not been passed on (unjust enrichment test)."
      }
    ]
  },
  {
    slug: "four-labour-codes-compliance-roadmap-for-employers",
    title: "The Four Labour Codes in Action: Comprehensive Employer Compliance Roadmap",
    category: "Labour Law",
    publishDate: "September 15, 2026",
    readTime: "6 min read",
    author: "CA Saurabh Bhutada",
    summary: "Understanding the practical implications of the Code on Wages, Industrial Relations, Social Security, and OSH for businesses in Maharashtra.",
    featuredImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    content: [
      "The consolidation of 29 legacy Central labour enactments into four unified Labour Codes—the Code on Wages, the Industrial Relations Code, the Code on Social Security, and the Occupational Safety, Health and Working Conditions Code (effective 21 November 2025)—marks a generational change in Indian workplace regulations.",
      "The single most impactful revision across all four codes is the uniform definition of 'Wages'. Under this rule, basic pay, dearness allowance, and retaining allowance must comprise at least 50% of an employee's total gross remuneration. If special allowances and perks exceed 50%, the excess is automatically deemed as wages, directly increasing employer contributions towards Provident Fund (EPF) and gratuity liabilities.",
      "Manufacturing entities and commercial offices in Maharashtra must also update their muster rolls, transition to unified online registers, and review contractor agreements to comply with updated contract labour licensing thresholds."
    ],
    keyTakeaways: [
      "Uniform 'Wages' definition with 50% basic floor rule affects PF, ESI, and gratuity calculations.",
      "Unified single-window electronic registers replace multiple cumbersome legacy inspection registers.",
      "Contract labour licensing threshold adjusted, placing greater compliance duties on principal employers.",
      "Stringent compounding and penalty frameworks for continuous non-compliance."
    ],
    faqs: [
      {
        question: "How does the new wage definition impact employee take-home pay?",
        answer: "Increasing the basic wage component to 50% increases the employee's PF deduction, which may slightly reduce monthly net take-home pay while bolstering long-term retirement savings and gratuity entitlements."
      },
      {
        question: "Can existing employment contracts remain unchanged?",
        answer: "No. Existing salary structures, CTC annexures, and contractor agreements should be reviewed and restructured to maintain compliance with the new statutory definition."
      }
    ]
  },
  {
    slug: "sme-ipo-listing-nse-emerge-bse-sme-readiness",
    title: "SME IPO on BSE SME & NSE Emerge: A Strategic Roadmap from MSME to Public Listing",
    category: "Corporate Finance",
    publishDate: "August 28, 2026",
    readTime: "9 min read",
    author: "CA Yogesh Kumar Chaturvedi",
    summary: "How growing Indian enterprises can access institutional capital, enhance enterprise valuation, and navigate the SME IPO process with structured financial governance.",
    featuredImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
    content: [
      "The dedicated SME platforms of NSE (NSE Emerge) and BSE (BSE SME) have revolutionized capital raising for small and medium enterprises across India. Unlike the mainboard where minimum post-issue capital is ₹10 Crores and regulatory burdens are heavy, SME exchanges allow profitable companies to raise equity with post-issue capital up to ₹25 Crores.",
      "Successful listing, however, requires disciplined pre-IPO preparation spanning 6 to 12 months. This includes restating past three financial years' accounts, converting from private limited to public limited status, rationalizing promoter loans, cleaning up related-party transactions, and institutionalizing an independent Board of Directors.",
      "Y K Chaturvedi & Co. provides end-to-end IPO readiness advisory, working shoulder-to-shoulder with merchant bankers, legal counsels, and company promoters to prepare compliant offer documents (DRHP/RHP) and audit-proof financial disclosures."
    ],
    keyTakeaways: [
      "Fast-track capital raising route tailored for profitable MSMEs with up to ₹25 Cr post-issue capital.",
      "Substantial valuation re-rating, brand visibility, and currency for future M&A transactions.",
      "Mandatory 3-year restated financial statements conforming to SEBI ICDR guidelines.",
      "Direct bridge between management, merchant bankers, and stock exchanges."
    ],
    faqs: [
      {
        question: "Can an SME company migrate to the Mainboard later?",
        answer: "Yes, an SME listed company can migrate to the Mainboard of BSE/NSE once its paid-up capital exceeds ₹10 Crores and market capitalization exceeds ₹25 Crores, subject to special resolution approval and exchange criteria."
      },
      {
        question: "What is the role of a Chartered Accountant firm in an SME IPO?",
        answer: "The CA firm conducts the IPO readiness review, prepares restated financial statements, implements Internal Financial Controls (IFC), and supports merchant bankers during due diligence and regulatory query resolution."
      }
    ]
  }
];
