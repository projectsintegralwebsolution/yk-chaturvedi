export interface ServiceDetail {
  slug: string;
  title: string;
  categoryNumber: number;
  shortDesc: string;
  heroTagline: string;
  bannerImage: string;
  iconName: string;
  inclusions: string[];
  strategicBenefits: { title: string; desc: string }[];
  processSteps: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: "audit-assurance",
    title: "Audit & Assurance",
    categoryNumber: 1,
    shortDesc: "Statutory, tax, internal, stock, proprietary and institutional audits delivering verified financial credibility under direct partner oversight.",
    heroTagline: "Rigorous statutory compliance and independent financial assurance tailored for corporates, institutions, and banks.",
    bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop",
    iconName: "ShieldCheck",
    inclusions: [
      "Statutory Audit under the Companies Act, 2013",
      "Tax Audit under the Income-tax law (Section 44AB)",
      "Internal Audit and Management Audit",
      "Stock Audit and Receivables / Drawing Power Audit for banks",
      "GST Audit and GST reconciliation (GSTR-9C)",
      "Concurrent Audit and Proprietary Audit",
      "Audit of Trusts, Societies, Co-operative Housing Societies and Educational Institutions"
    ],
    strategicBenefits: [
      {
        title: "Statutory Adherence & Penalty Mitigation",
        desc: "Strict compliance with Indian Accounting Standards (Ind AS/AS), Companies Act guidelines, and Income-tax stipulations preventing non-compliance exposure."
      },
      {
        title: "Bank & Lender Credibility",
        desc: "Thorough verification of stock, debtors, and drawing power strengthens borrowing capacity and credit appraisal with financial institutions."
      },
      {
        title: "Internal Control Fortification",
        desc: "Uncover internal operational bottlenecks, revenue leakages, and procedural vulnerabilities through risk-based internal audits."
      },
      {
        title: "Direct Partner Supervision",
        desc: "Assignments are directly led by experienced partners ensuring deep scrutiny and mature business discussions with management."
      }
    ],
    processSteps: [
      { step: "01", title: "Audit Planning & Scope Definition", desc: "Understanding the entity's business model, risk profile, internal controls, and framing the audit calendar." },
      { step: "02", title: "Fieldwork & Substantive Testing", desc: "Verifying ledgers, vouchers, asset registers, compliance records, and executing analytical review procedures." },
      { step: "03", title: "Issue Resolution & Review", desc: "Discussion of draft audit observations with key management personnel and remediation of discrepancies." },
      { step: "04", title: "Reporting & Certification", desc: "Issuance of independent audit report, statutory disclosures, and submission to regulatory bodies." }
    ],
    faqs: [
      {
        question: "When is a Tax Audit mandatory under Indian Income-tax law?",
        answer: "A Tax Audit under Section 44AB is mandatory for businesses whose total turnover exceeds ₹1 Crore (or ₹10 Crores if cash receipts and payments do not exceed 5% of aggregate transactions), and for professionals whose gross receipts exceed ₹50 Lakhs (or ₹75 Lakhs under presumptive conditions)."
      },
      {
        question: "How does Y K Chaturvedi & Co. conduct stock audits for commercial banks?",
        answer: "Our team carries out physical inventory verification, evaluates stock ageing, examines debtor ageing, and recalculates Drawing Power (DP) as per sanction terms, ensuring compliance with banking consortium requirements."
      },
      {
        question: "Do you undertake audits of Co-operative Housing Societies in Maharashtra?",
        answer: "Yes, we audit Co-operative Housing Societies and Trusts across Vasai and Palghar district in strict compliance with the Maharashtra Co-operative Societies Act and applicable accounting standards."
      }
    ],
    relatedSlugs: ["direct-taxation", "gst", "corporate-law-roc-fema"]
  },
  {
    slug: "direct-taxation",
    title: "Direct Taxation",
    categoryNumber: 2,
    shortDesc: "End-to-end income tax return filing, TDS/TCS compliance, faceless assessments, appeals before CIT(A), and transition advisory for Income-tax Act 2025.",
    heroTagline: "Strategic tax planning, seamless return filings, and authoritative representation in faceless assessments and appeals.",
    bannerImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1920&auto=format&fit=crop",
    iconName: "Receipt",
    inclusions: [
      "Income Tax Returns of individuals, HUFs, firms, LLPs, companies and trusts",
      "TDS / TCS returns, correction statements and lower-deduction applications",
      "Faceless assessment, reassessment and rectification proceedings",
      "Appeals before CIT(A) / JCIT(A) and representation before tax authorities",
      "Tax planning and transition advisory under the Income-tax Act, 2025 (effective 01 April 2026)"
    ],
    strategicBenefits: [
      {
        title: "800+ Client Base Trust",
        desc: "Over 800 individuals, firms, and companies rely on our firm every assessment year for accurate, timely tax compliance."
      },
      {
        title: "Litigation & Assessment Defense",
        desc: "Skilled preparation of detailed paper books, written submissions, and statutory legal representations in faceless regimes."
      },
      {
        title: "Forward-Looking Tax Planning",
        desc: "Navigating the newly enacted Income-tax Act, 2025 with proactive capital gains, corporate structuring, and exemption advisory."
      },
      {
        title: "TDS / TCS Regularization",
        desc: "Complete resolution of TRACES defaults, demand notices, 26AS/AIS/TIS reconciliations, and Section 197 lower deduction certificates."
      }
    ],
    processSteps: [
      { step: "01", title: "Data Gathering & Reconciliation", desc: "Collection of financial data, Form 26AS, AIS, TIS, bank statements, and tax credit corroboration." },
      { step: "02", title: "Tax Computation & Deductions", desc: "Applying optimal deductions, assessing tax regimes, calculating advance tax or refund entitlement." },
      { step: "03", title: "Partner Review & Filing", desc: "Partner-level validation prior to digital transmission on the Income Tax e-filing portal." },
      { step: "04", title: "Intimation & Scrutiny Monitoring", desc: "Tracking Section 143(1) processing intimations and managing any rectifications or notice queries." }
    ],
    faqs: [
      {
        question: "How do you handle faceless assessment notices from the Income Tax Department?",
        answer: "We analyze the specific queries raised under Section 142(1) or 148, compile corroborating documentary evidence, draft legal submissions, and upload them onto the e-filing portal within the stipulated timeline."
      },
      {
        question: "What is your transition advisory regarding the Income-tax Act, 2025?",
        answer: "With the modern Income-tax Act, 2025 coming into force effective 01 April 2026, we help corporations, LLPs, and individuals re-evaluate their tax planning, deductions, asset reorganizations, and reporting standards well in advance."
      },
      {
        question: "Can you assist with lower TDS deduction certificates?",
        answer: "Yes, we prepare and file Form 13 applications before the Jurisdictional Assessing Officer for issuance of Lower or Nil Deduction Certificates under Section 197."
      }
    ],
    relatedSlugs: ["audit-assurance", "gst", "accounting-outsourcing"]
  },
  {
    slug: "gst",
    title: "Goods & Services Tax (GST)",
    categoryNumber: 3,
    shortDesc: "Complete GST compliance, GSTR-1/3B/9/9C filing, Section 54 refund processing, departmental audits, show cause notices, and GST Appellate Tribunal representation.",
    heroTagline: "Expert indirect tax guidance, high-success refund facilitation, and assertive departmental dispute resolution.",
    bannerImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop",
    iconName: "FileSpreadsheet",
    inclusions: [
      "GST registration, amendments and cancellation / revocation",
      "Monthly / quarterly / annual returns (GSTR-1, GSTR-3B, GSTR-9 / 9C)",
      "GST Refunds under Section 54 of the CGST Act – exports, inverted duty structure and excess cash balance",
      "Letter of Undertaking (LUT) filing for zero-rated supplies (Rule 96A, CGST Rules)",
      "ITC reconciliation (GSTR-2B), e-invoicing and e-way bill advisory",
      "Replies to notices, scrutiny, departmental audit and adjudication",
      "Appeals before the Appellate Authority and GST Appellate Tribunal",
      "Legacy Service Tax / VAT assessments and litigation"
    ],
    strategicBenefits: [
      {
        title: "250+ Active GST Clients",
        desc: "Trusted by over 250 business clients across Maharashtra for recurring filings, reconciliations, and compliance health checks."
      },
      {
        title: "Specialized Refund Unit",
        desc: "Led by Senior Manager Gopeshwar Chaturvedi (8 years dedicated GST refund experience) ensuring fast sanctioning of export and inverted duty refunds."
      },
      {
        title: "Departmental Audit & Scrutiny Defense",
        desc: "Partner CA Saurabh Bhutada brings 12+ years indirect tax expertise, representing clients in DRC-01, Section 61, 65, and 73/74 proceedings."
      },
      {
        title: "Zero ITC Leakage",
        desc: "Continuous GSTR-2B vs. Books reconciliations preventing supplier default losses and Section 16(4) time-bar risks."
      }
    ],
    processSteps: [
      { step: "01", title: "Monthly Data Ingestion", desc: "Sales register, purchase register, and e-way bill collation from accounting software." },
      { step: "02", title: "GSTR-2B Automated Match", desc: "ITC cross-matching to flag missing invoices, discrepancies, and vendor non-compliance." },
      { step: "03", title: "Return Filing & Tax Payment", desc: "Preparation and timely filing of GSTR-1, GSTR-3B, and generation of PMT-06 challans." },
      { step: "04", title: "Annual Audit & Refund Filing", desc: "Comprehensive reconciliation for GSTR-9/9C and submission of RFD-01 refund dossiers." }
    ],
    faqs: [
      {
        question: "Who is eligible for GST refunds under Section 54?",
        answer: "Exporters making zero-rated supplies without payment of tax (under LUT), businesses facing inverted duty structure (tax on inputs higher than tax on finished goods), and taxpayers with excess balance in electronic cash ledger can claim refunds."
      },
      {
        question: "How do you assist when a business receives a GST notice (DRC-01 or ASMT-10)?",
        answer: "We examine the basis of mismatch (e.g. GSTR-1 vs 3B, 2B vs 3B, or E-way bill differences), assemble transactional ledgers, draft legal replies citing relevant CBIC circulars and High Court precedents, and attend personal hearings before adjudicating officers."
      },
      {
        question: "Can Y K Chaturvedi & Co. represent us in GST Tribunal appeals?",
        answer: "Yes, our partners and indirect tax specialists act as Authorised Representatives before First Appellate Authorities and prepare matters for the GST Appellate Tribunal (GSTAT)."
      }
    ],
    relatedSlugs: ["direct-taxation", "audit-assurance", "labour-law-compliance"]
  },
  {
    slug: "certification-services",
    title: "Certification Services",
    categoryNumber: 4,
    shortDesc: "Official CA certificates including Turnover Certificates, Net Worth Certificates, and specialized statutory certifications for banks, tenders, and regulators.",
    heroTagline: "Authoritative Chartered Accountant certifications issued with UDIN for tenders, banking facilities, and statutory bodies.",
    bannerImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop",
    iconName: "Award",
    inclusions: [
      "CA Certificate – Turnover Certificate",
      "CA Certificate – Net Worth Certificate",
      "Other certificates required by banks, tenders, government departments and regulators",
      "Working capital and drawing power verification certificates",
      "Foreign remittance certificates (Form 15CB)",
      "Statutory compliance certificates under corporate and tax laws"
    ],
    strategicBenefits: [
      {
        title: "Mandatory UDIN Generation",
        desc: "Every certificate carries a verified Unique Document Identification Number (UDIN) compliant with ICAI mandates."
      },
      {
        title: "Tender & Prequalification Acceptance",
        desc: "Tailored to meet strict eligibility criteria for state, central government, and private corporate tenders."
      },
      {
        title: "Speed & Verification Rigor",
        desc: "Systematic auditing of supporting documentation ensures fast turnaround without compromising evidentiary standards."
      },
      {
        title: "Bank Facility Support",
        desc: "Certified net worth and turnover reports accepted by nationalized, private, and cooperative financial institutions."
      }
    ],
    processSteps: [
      { step: "01", title: "Requirement Review", desc: "Analyzing the specific format prescribed by the requesting bank, authority, or tender document." },
      { step: "02", title: "Evidence Verification", desc: "Scrutiny of balance sheets, bank statements, asset deeds, and income tax acknowledgements." },
      { step: "03", title: "Drafting & Partner Attestation", desc: "Compilation of certification notes, valuation assumptions, and partner sign-off." },
      { step: "04", title: "UDIN Generation & Issuance", desc: "Generating ICAI UDIN and delivering signed digital and physical copies." }
    ],
    faqs: [
      {
        question: "Why is UDIN essential for CA certificates?",
        answer: "ICAI has made Unique Document Identification Number (UDIN) mandatory for all certificates issued by Chartered Accountants to prevent forged signatures and verify authenticity on the official ICAI portal."
      },
      {
        question: "What documents are required for a CA Net Worth Certificate?",
        answer: "We typically require copies of latest audited financial statements, bank statements, mutual fund/shareholding statements, property title deeds or valuation reports, and income tax returns."
      }
    ],
    relatedSlugs: ["audit-assurance", "project-finance-business-advisory", "registrations-licences"]
  },
  {
    slug: "registrations-licences",
    title: "Registrations & Licences",
    categoryNumber: 5,
    shortDesc: "End-to-end statutory registrations: PAN, TAN, Udyam MSME, Shop Act, PTRC/PTEC, DSC, ISO facilitation, IEC, Trademark, FSSAI, RERA, EPF and ESIC.",
    heroTagline: "Fast, error-free regulatory registrations and licensing for immediate commercial operation.",
    bannerImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1920&auto=format&fit=crop",
    iconName: "BadgeCheck",
    inclusions: [
      "PAN and TAN applications",
      "Udyam (MSME) Registration",
      "Shops & Establishments registration / intimation, Professional Tax (PTRC / PTEC)",
      "Digital Signature Certificates (DSC) - Class 3",
      "ISO Certification facilitation",
      "Import-Export Code (IEC), Trademark, FSSAI, RERA, EPF and ESIC registration"
    ],
    strategicBenefits: [
      {
        title: "Government Benefits & Subsidies",
        desc: "Udyam registration unlocks priority sector lending, lower interest rates, and MSME protection under Section 43B(h)."
      },
      {
        title: "Single-Window Execution",
        desc: "Coordinate multiple municipal, state, and central registrations without dealing with fragmented intermediaries."
      },
      {
        title: "Total Compliance Hygiene",
        desc: "Avoid penal consequences under local Shop Act, Professional Tax, and labour statutory regulations."
      },
      {
        title: "Trade & Brand Security",
        desc: "Secure international trade with IEC and protect intellectual assets with Trademark applications."
      }
    ],
    processSteps: [
      { step: "01", title: "Eligibility & Document Checklist", desc: "Providing customized checklists for KYC, premises proof, and business details." },
      { step: "02", title: "Application Preparation", desc: "Drafting applications, creating DSCs, and validating requisite attachments." },
      { step: "03", title: "Portal Submission", desc: "Filing across central, state (Maharashtra), and local municipal regulatory portals." },
      { step: "04", title: "Certificate Handover", desc: "Tracking approval status, liaising with departments, and delivering final registration certificates." }
    ],
    faqs: [
      {
        question: "What is the difference between PTRC and PTEC in Maharashtra?",
        answer: "PTEC (Professional Tax Enrolment Certificate) is paid by the business entity or professional on their own behalf. PTRC (Professional Tax Registration Certificate) is obtained by employers to deduct and remit professional tax from employee salaries."
      },
      {
        question: "How quickly can Udyam Registration be completed?",
        answer: "With valid Aadhaar and PAN credentials linked to the business, Udyam registration is typically processed within 24 to 48 hours."
      }
    ],
    relatedSlugs: ["business-setup", "labour-law-compliance", "gst"]
  },
  {
    slug: "business-setup",
    title: "Business Setup",
    categoryNumber: 6,
    shortDesc: "Complete entity incorporation: Private, Public, Section 8, Nidhi Companies, LLPs, Partnership Firms, Trusts, and Foreign Branch/Liaison Office approvals.",
    heroTagline: "Structuring and incorporating robust business entities built for governance, scalability, and investor confidence.",
    bannerImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop",
    iconName: "Briefcase",
    inclusions: [
      "Incorporation of Private / Public / Section 8 / Nidhi Companies and LLPs",
      "Formation and registration of Proprietorship, Partnership Firms, AOP / BOI and Trusts",
      "Liaison / Branch / Project Office and FDI approvals through the Foreign Investment Facilitation Portal",
      "Drafting Memorandum and Articles of Association (MOA / AOA) & LLP Agreements",
      "Director Identification Number (DIN) and Digital Signatures (DSC)",
      "Bank account opening resolution and post-incorporation commencement (INC-20A)"
    ],
    strategicBenefits: [
      {
        title: "Optimal Entity Selection",
        desc: "Advising between Pvt Ltd, LLP, Partnership, or Section 8 based on liability, funding plans, and tax efficiency."
      },
      {
        title: "Speedy SPICe+ MCA Processing",
        desc: "Accurate name reservation, document drafting, and rapid clearance from the Central Registration Centre (CRC)."
      },
      {
        title: "Complete Starter Package",
        desc: "Includes PAN, TAN, GST, EPF, ESIC, Professional Tax, and bank opening documentation in one streamlined flow."
      },
      {
        title: "FDI & Cross-Border Readiness",
        desc: "Experience handling branch/liaison offices and FDI facilitation for overseas ventures entering India."
      }
    ],
    processSteps: [
      { step: "01", title: "Structuring & Name Reservation", desc: "Selecting entity format, conducting RUN/SPICe+ Part A name availability search." },
      { step: "02", title: "Drafting Charter Documents", desc: "Drafting custom MOA, AOA, LLP Agreements, and object clauses aligned with business goals." },
      { step: "03", title: "SPICe+ Integration Filing", desc: "Uploading incorporation forms with MCA, along with PAN, TAN, and EPFO/ESIC registrations." },
      { step: "04", title: "Commencement of Business", desc: "Issuance of Certificate of Incorporation (COI) and filing Form INC-20A for business commencement." }
    ],
    faqs: [
      {
        question: "Should I register a Private Limited Company or an LLP?",
        answer: "A Private Limited Company is preferable if you plan to raise equity capital from venture capitalists or investors. An LLP offers lower compliance costs, flexibility in partner profit sharing, and no dividend distribution tax implications."
      },
      {
        question: "What is Form INC-20A and is it mandatory?",
        answer: "Yes, every company incorporated after November 2018 must file Form INC-20A (Declaration of Commencement of Business) within 180 days of incorporation, confirming that directors have deposited their share capital into the company bank account."
      }
    ],
    relatedSlugs: ["corporate-law-roc-fema", "registrations-licences", "project-finance-business-advisory"]
  },
  {
    slug: "corporate-law-roc-fema",
    title: "Corporate Law, ROC & FEMA",
    categoryNumber: 7,
    shortDesc: "Annual ROC filings (MGT-7, AOC-4), statutory registers, minute books, Companies Act 2013 compliances, and RBI/FEMA reporting for FDI and ECB.",
    heroTagline: "Flawless corporate secretarial governance, ROC filings, and RBI/FEMA cross-border reporting.",
    bannerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
    iconName: "Scale",
    inclusions: [
      "ROC filings – annual returns, financial statements and event-based forms",
      "Statutory registers and minute books maintenance",
      "Compliances under the Companies Act, 2013 and LLP Act, 2008",
      "FDI / ECB reporting under FEMA and RBI regulations (FIRMS portal, FC-GPR, FC-TRS)",
      "Director changes, registered office shifting, and share capital alterations",
      "Condonation of delay and compounding applications before RD / NCLT"
    ],
    strategicBenefits: [
      {
        title: "Protection Against Heavy ROC Penalties",
        desc: "Proactive compliance avoids additional fees of ₹100 per day under Section 403 and director disqualification risks."
      },
      {
        title: "FEMA & RBI Compliance Expertise",
        desc: "Partner CA Yogesh Kumar Chaturvedi brings deep experience in FDI, ECB, and external commercial borrowing reporting."
      },
      {
        title: "Board & Governance Record Keeping",
        desc: "Systematic drafting of board resolutions, AGM minutes, and digital statutory registers compliant with Secretarial Standards."
      },
      {
        title: "Event-Based Agility",
        desc: "Quick filings for capital increments, allotment of shares (PAS-3), and director appointments (DIR-12)."
      }
    ],
    processSteps: [
      { step: "01", title: "Compliance Calendar Mapping", desc: "Setting timeline benchmarks for board meetings, AGM, annual return, and event-based filings." },
      { step: "02", title: "Drafting & Documentation", desc: "Formulating notices, resolutions, director's report, and secretarial certifications." },
      { step: "03", title: "MCA V3 Portal Submission", desc: "Preparing and digitally signing XBRL/e-forms on MCA V3 and FIRMS RBI portals." },
      { step: "04", title: "Record Preservation", desc: "Maintaining physical and digital statutory registers, minute books, and ROC acknowledgements." }
    ],
    faqs: [
      {
        question: "What are the mandatory annual ROC filings for a Private Limited Company?",
        answer: "The primary filings are Form AOC-4 (financial statements), Form MGT-7/7A (annual return), Form ADT-1 (auditor appointment if due), and Form DIR-3 KYC for all directors."
      },
      {
        question: "How do you handle Foreign Direct Investment (FDI) reporting to RBI?",
        answer: "Upon receipt of inward remittance, we file Form FC-GPR on the RBI FIRMS portal within 30 days of share allotment, accompanied by a CA valuation certificate and CS certificate."
      }
    ],
    relatedSlugs: ["business-setup", "mergers-restructuring", "audit-assurance"]
  },
  {
    slug: "mergers-restructuring",
    title: "Mergers & Restructuring",
    categoryNumber: 8,
    shortDesc: "Sections 230–232 corporate schemes, Section 233 fast-track mergers, demergers, due diligence, tax impact analysis, and valuer coordination.",
    heroTagline: "Strategic corporate restructuring, tax-optimized scheme execution, and comprehensive due diligence.",
    bannerImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1920&auto=format&fit=crop",
    iconName: "GitMerge",
    inclusions: [
      "Mergers, amalgamations and demergers under Sections 230–232 of the Companies Act, 2013",
      "Fast-track mergers under Section 233 (small companies, start-ups, holding–subsidiary)",
      "Due diligence, accounting and tax impact analysis, and coordination with valuers and legal counsel",
      "Financial modeling for swap ratio determinations",
      "NCLT and Regional Director representation support",
      "Stamp duty analysis and post-merger integration of accounts"
    ],
    strategicBenefits: [
      {
        title: "Fast-Track Section 233 Efficiency",
        desc: "Save significant time and court costs through administrative fast-track mergers between holding-subsidiary or small companies."
      },
      {
        title: "Tax-Neutral Structuring",
        desc: "Structuring amalgamations to meet Section 47 exemption criteria under the Income-tax law to eliminate capital gains tax."
      },
      {
        title: "Deep Financial Due Diligence",
        desc: "Uncover hidden liabilities, tax exposures, and operational risks before finalizing transactional agreements."
      },
      {
        title: "Integrated Multi-Disciplinary Coordination",
        desc: "Seamless synchronization between registered valuers, legal counsels, and statutory regulators."
      }
    ],
    processSteps: [
      { step: "01", title: "Feasibility & Structure Design", desc: "Assessing commercial objectives, tax implications, and determining whether fast-track or NCLT route applies." },
      { step: "02", title: "Valuation & Swap Ratio", desc: "Collaborating with Registered Valuers to compute fair share exchange ratios and drafting scheme." },
      { step: "03", title: "Approvals & Filings", desc: "Securing board, creditor, and shareholder consents; filing scheme with RD, ROC, and Official Liquidator." },
      { step: "04", title: "Sanction & Amalgamation", desc: "Obtaining confirmation order, filing INC-28, and executing post-merger balance sheet consolidation." }
    ],
    faqs: [
      {
        question: "What is a Fast-Track Merger under Section 233?",
        answer: "Section 233 provides an expeditious merger procedure without approaching the NCLT for mergers between two or more small companies, or between a holding company and its wholly-owned subsidiary, approved by the Regional Director (RD)."
      },
      {
        question: "Can accumulated tax losses be carried forward after a merger?",
        answer: "Yes, under Section 72A of the Income-tax Act, subject to fulfilling specific conditions regarding continuation of business and asset retention, accumulated losses and unabsorbed depreciation can be carried forward by the amalgamated entity."
      }
    ],
    relatedSlugs: ["corporate-law-roc-fema", "ipo-advisory", "project-finance-business-advisory"]
  },
  {
    slug: "ipo-advisory",
    title: "IPO Advisory",
    categoryNumber: 9,
    shortDesc: "IPO readiness review, SME platform listings (BSE SME & NSE Emerge), financial restructuring, internal controls, and merchant banker diligence support.",
    heroTagline: "Guiding growing enterprises from private ownership to public capital market success on SME and Mainboard platforms.",
    bannerImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1920&auto=format&fit=crop",
    iconName: "TrendingUp",
    inclusions: [
      "IPO readiness review, including SME platform listings (BSE SME / NSE Emerge)",
      "Restructuring of financials, internal controls and corporate governance for listing",
      "Support to merchant bankers in due diligence and preparation of offer document financial information (DRHP / RHP)",
      "Restated financial statements for the prescribed statutory historical period",
      "Internal Financial Controls (IFC) testing and implementation",
      "Capital structure rationalization, bonus issue, and share split planning"
    ],
    strategicBenefits: [
      {
        title: "Capitalizing on SME Exchanges",
        desc: "Helping dynamic MSMEs leverage BSE SME and NSE Emerge platforms to raise growth capital with simplified listing norms."
      },
      {
        title: "Restated Financials Precision",
        desc: "Preparing audit-tested restated balance sheets and profit & loss statements conforming to SEBI ICDR guidelines."
      },
      {
        title: "Governance Architecture",
        desc: "Institutionalizing robust Board committees, audit mechanisms, and Internal Financial Controls required for public scrutiny."
      },
      {
        title: "Merchant Banker Synergy",
        desc: "Acting as the reliable financial bridge answering merchant banker due diligence requisitions smoothly."
      }
    ],
    processSteps: [
      { step: "01", title: "Readiness Audit & Gap Analysis", desc: "Evaluating profitability track record, net tangible assets, net worth, and compliance history." },
      { step: "02", title: "Financial Restructuring & Clean-up", desc: "Settling related-party transactions, rationalizing promoter debt, and restating past financials." },
      { step: "03", title: "Offer Document Collaboration", desc: "Assisting merchant bankers with financial chapters, peer comparisons, and working capital notes." },
      { step: "04", title: "Filing & Listing Support", desc: "Addressing exchange queries, coordinating with registrar and bankers through successful listing." }
    ],
    faqs: [
      {
        question: "What are the eligibility criteria for an SME IPO on NSE Emerge or BSE SME?",
        answer: "General criteria include post-issue paid-up capital of up to ₹25 Crores, track record of at least 3 years, positive net worth, operating profit in at least two of the previous three financial years, and no pending winding-up petitions."
      },
      {
        question: "How long does it take to prepare a company for an SME IPO?",
        answer: "A disciplined preparation usually takes 6 to 12 months, allowing adequate time for financial restructuring, board reconstitution, internal control reviews, and restating books of accounts."
      }
    ],
    relatedSlugs: ["mergers-restructuring", "project-finance-business-advisory", "audit-assurance"]
  },
  {
    slug: "project-finance-business-advisory",
    title: "Project Finance & Business Advisory",
    categoryNumber: 10,
    shortDesc: "Bank project reports, feasibility studies, CMA data, bank/NBFC loan proposals, equity/FDI facilitation, and financial projections & budgeting.",
    heroTagline: "Unlocking institutional debt and equity funding with bankable project reports and seasoned financial modeling.",
    bannerImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1920&auto=format&fit=crop",
    iconName: "BarChart3",
    inclusions: [
      "Project reports and feasibility studies",
      "CMA data and bank / NBFC loan proposals (secured and unsecured)",
      "Assistance in raising finance including equity placement and FDI",
      "Financial projections, MIS and budgeting",
      "Working capital assessment and term loan syndication",
      "Debt restructuring and OTS advisory"
    ],
    strategicBenefits: [
      {
        title: "19+ Years Practice Leadership",
        desc: "Partner CA Yogesh Kumar Chaturvedi brings nearly two decades of banking compliances, project finance, and debt syndication acumen."
      },
      {
        title: "Bank-Approved CMA Data",
        desc: "Comprehensive Credit Monitoring Arrangement (CMA) models that withstand scrutiny from nationalized and private bank credit committees."
      },
      {
        title: "Optimized Borrowing Costs",
        desc: "Guidance on choosing the right mix of cash credit, letter of credit, bank guarantees, and term loans to minimize financial cost."
      },
      {
        title: "Actionable MIS & Budgeting",
        desc: "Empowering business owners with real-time cash flow projections, variance analyses, and profitability forecasts."
      }
    ],
    processSteps: [
      { step: "01", title: "Project & Financial Diagnostic", desc: "Understanding the capital expenditure, capacity utilization, market demand, and revenue drivers." },
      { step: "02", title: "Financial Modeling & CMA Generation", desc: "Developing 5-7 year integrated financial models, DSCR, IRR, sensitivity metrics, and CMA reports." },
      { step: "03", title: "Lender Interface & Sanction Follow-up", desc: "Submitting proposals to banks/NBFCs, answering credit officer queries, and facilitating inspections." },
      { step: "04", title: "Documentation & Disbursement", desc: "Reviewing sanction letters, assisting with mortgage and hypothecation paperwork to ensure timely disbursement." }
    ],
    faqs: [
      {
        question: "What is CMA Data and why is it mandatory for bank loans?",
        answer: "Credit Monitoring Arrangement (CMA) data is an analytical presentation of past, current, and projected financial statements required by banks to evaluate working capital needs (MPBF) and term loan debt servicing capability (DSCR)."
      },
      {
        question: "Can Y K Chaturvedi & Co. assist with unsecured business loans and NBFC funding?",
        answer: "Yes, we prepare financial profiles, analyze cash flows, and formulate proposals suited for both secured banking lines and NBFC business loan facilities."
      }
    ],
    relatedSlugs: ["accounting-outsourcing", "certification-services", "business-setup"]
  },
  {
    slug: "accounting-outsourcing",
    title: "Accounting & Outsourcing",
    categoryNumber: 11,
    shortDesc: "Design of accounting systems & internal controls, bookkeeping, finalisation of accounts, MIS reporting, payroll processing, and deputation of qualified accountants.",
    heroTagline: "Accurate cloud accounting, compliant payroll management, and expert financial controllership.",
    bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop",
    iconName: "Calculator",
    inclusions: [
      "Design of accounting systems, policies and internal controls",
      "Bookkeeping and maintenance of books of accounts",
      "Finalisation of accounts and MIS reporting",
      "Payroll processing, EPF / ESIC / PT returns",
      "Deputation of full-time / part-time qualified accountants",
      "Cloud accounting software migration (Tally, Zoho Books, QuickBooks)"
    ],
    strategicBenefits: [
      {
        title: "15-Member Qualified Execution Team",
        desc: "Supported by 8 dedicated accounts executives and 2 senior executives under senior manager and partner oversight."
      },
      {
        title: "Real-Time Compliance Integration",
        desc: "Books are maintained with continuous GST and TDS synchronization, preventing year-end rush and surprise liabilities."
      },
      {
        title: "Cost-Effective Financial Department",
        desc: "Eliminate full-time in-house accountant overheads while gaining access to senior CA advisory whenever required."
      },
      {
        title: "Management Decision-Making MIS",
        desc: "Timely monthly P&L, balance sheet, debtors ageing, and cash-flow dashboards delivered straight to promoters."
      }
    ],
    processSteps: [
      { step: "01", title: "Chart of Accounts & System Setup", desc: "Configuring tailored general ledgers, cost centres, and internal check workflows." },
      { step: "02", title: "Day-to-Day Voucher Processing", desc: "Entering sales, purchases, bank transactions, and ledger reconciliations." },
      { step: "03", title: "Payroll & Statutory Remittances", desc: "Processing monthly payroll, salary slips, and calculating EPF, ESIC, and PT liabilities." },
      { step: "04", title: "Monthly Finalisation & Reporting", desc: "Closing books monthly with depreciation, accruals, inventory valuation, and delivering executive MIS." }
    ],
    faqs: [
      {
        question: "Can your firm depute qualified accountants to work at our office in Vasai/Palghar/Mumbai?",
        answer: "Yes, we provide flexible arrangements including deputation of qualified full-time or part-time accounts executives to your premises, supervised directly by our senior team."
      },
      {
        question: "Which accounting software do you support?",
        answer: "We support Tally Prime, Zoho Books, QuickBooks, Busy, and enterprise ERP systems, and can facilitate cloud setup and digital document pipelines."
      }
    ],
    relatedSlugs: ["direct-taxation", "gst", "labour-law-compliance"]
  },
  {
    slug: "labour-law-compliance",
    title: "Labour Law Compliance",
    categoryNumber: 12,
    shortDesc: "Four Labour Codes advisory (in force from 21 Nov 2025), factory licensing, contract labour regulations, Shops & Establishments compliance, and EPF/ESIC management.",
    heroTagline: "Navigating India's unified Labour Codes, factory safety norms, and end-to-end workforce statutory compliances.",
    bannerImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1920&auto=format&fit=crop",
    iconName: "UsersCheck",
    inclusions: [
      "Compliance and advisory under the four Labour Codes (in force from 21 November 2025)",
      "Factory licence, contract labour and Shops & Establishments compliance",
      "EPF and ESIC registration, monthly returns and inspection management",
      "Maintenance of statutory registers, wage registers, and inspection books",
      "Gratuity and bonus calculations and dispute advisory",
      "Standing orders and workforce policy drafting"
    ],
    strategicBenefits: [
      {
        title: "Four Labour Codes Preparedness",
        desc: "Specialized guidance on the Code on Wages, Industrial Relations, Social Security, and Occupational Safety & Working Conditions."
      },
      {
        title: "Wage Definition Restructuring",
        desc: "Re-engineering salary structures to comply with the 50% basic wage rule without inflating employer costs abruptly."
      },
      {
        title: "Factory & Contract Labour Hygiene",
        desc: "Streamlined licensing and compliance audits for industrial units in Vasai, Palghar, and surrounding industrial belts."
      },
      {
        title: "Inspection & Notice Defense",
        desc: "Partner CA Saurabh Bhutada has over 12 years of direct experience handling labour regulatory inspections and inquiries."
      }
    ],
    processSteps: [
      { step: "01", title: "Workforce & Wage Audit", desc: "Reviewing existing payroll, CTC breakdowns, contractor agreements, and worker counts." },
      { step: "02", title: "Compliance Gap Analysis", desc: "Benchmarking current operations against the four unified Labour Codes and state rules." },
      { step: "03", title: "Monthly Register & Return Operations", desc: "Timely generation of unified wage registers, ECR generation for EPF, and ESIC payments." },
      { step: "04", title: "Inspection Readiness & Representation", desc: "Ensuring all physical and digital records satisfy labour enforcement inspectors." }
    ],
    faqs: [
      {
        question: "What is the 50% wage rule under the new Code on Wages?",
        answer: "The Code on Wages mandates that wages (basic pay, dearness allowance, and retaining allowance) must constitute at least 50% of the total remuneration, with allowances capped at 50%, which directly impacts EPF, gratuity, and leave encashment calculations."
      },
      {
        question: "Do you handle contract labour registrations and licenses in Maharashtra?",
        answer: "Yes, we handle Form I registration for principal employers employing 50 or more contract workers and assist contractors with licensing and register maintenance under Maharashtra rules."
      }
    ],
    relatedSlugs: ["accounting-outsourcing", "registrations-licences", "corporate-law-roc-fema"]
  },
  {
    slug: "investment-planning-insurance",
    title: "Investment Planning & Insurance",
    categoryNumber: 13,
    shortDesc: "Strategic investment planning in mutual funds, SIPs, debt instruments, and facilitation of corporate and personal life, health, and personal accident insurance.",
    heroTagline: "Disciplined capital growth and comprehensive risk protection structured for business owners and individuals.",
    bannerImage: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1920&auto=format&fit=crop",
    iconName: "Shield",
    inclusions: [
      "Investment planning – mutual funds, SIPs and other investment products",
      "Life, health and personal accident insurance facilitation",
      "Keyman Insurance and Partnership Insurance advisory for business continuity",
      "Corporate group health and workmen compensation policies",
      "Tax-efficient retirement and wealth preservation planning",
      "Portfolio review and capital gains tax optimization"
    ],
    strategicBenefits: [
      {
        title: "Tax-Integrated Wealth Strategy",
        desc: "Aligning mutual fund and asset investments directly with your personal income tax planning and long-term capital gains exemptions."
      },
      {
        title: "Business Continuity Protection",
        desc: "Keyman Insurance structures to safeguard company liquidity and shareholder value against untimely partner demise."
      },
      {
        title: "Comprehensive Health & Life Security",
        desc: "Facilitating optimal life, critical illness, and group medical covers without aggressive product pushing."
      },
      {
        title: "Objective Advisory",
        desc: "Professional financial insights driven by capital preservation, inflation beating returns, and liquidity management."
      }
    ],
    processSteps: [
      { step: "01", title: "Financial Assessment & Risk Profiling", desc: "Analyzing current liabilities, cash surplus, retirement goals, and risk tolerance." },
      { step: "02", title: "Asset Allocation Modeling", desc: "Designing an optimal mix across equity mutual funds, debt instruments, and liquid assets." },
      { step: "03", title: "Insurance Cover Optimization", desc: "Auditing existing policies and identifying protection gaps in term life, health, and commercial assets." },
      { step: "04", title: "Periodic Review & Rebalancing", desc: "Regular portfolio tracking, capital gains harvesting, and adaptation to tax law modifications." }
    ],
    faqs: [
      {
        question: "What is Keyman Insurance and how does it benefit a partnership firm or company?",
        answer: "Keyman Insurance is a life insurance policy taken out by a business on the life of an indispensable key person (such as a partner or promoter). Premiums paid by a company are deductible as business expenses, and the claim proceeds provide vital liquidity during a transition."
      },
      {
        question: "How do you coordinate investment planning with income tax returns?",
        answer: "Because we oversee your tax filings, we optimize capital gains harvesting, ensure proper indexation or new tax regime benefits, and prevent tax drag on portfolio rebalancing."
      }
    ],
    relatedSlugs: ["direct-taxation", "project-finance-business-advisory", "business-setup"]
  }
];
