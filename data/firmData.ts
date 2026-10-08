export interface Partner {
  name: string;
  designation: string;
  qualification: string;
  membershipNo?: string;
  experienceYears: string;
  summary: string;
  expertise: string[];
  pastRoles?: string[];
  phones: string[];
  email: string;
}

export interface Office {
  type: string;
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  mapEmbedUrl: string;
  mapDirectionUrl: string;
}

export const firmData = {
  name: "Y K Chaturvedi & Co.",
  subtitle: "Chartered Accountants",
  constitution: "Partnership Firm",
  frn: "145633W",
  gstin: "27AACFY3275B1Z9",
  establishedDate: "02 September 2017",
  yearsInPractice: "9+ Years",
  totalTeamMembers: 15,
  clientBase: {
    gst: "250+",
    incomeTax: "800+",
  },
  email: "caykc2007@gmail.com",
  offices: [
    {
      type: "Head Office",
      title: "Vasai (West) Head Office",
      addressLine1: "C1-118, Shree Triveni CHS, 60 Feet Road,",
      addressLine2: "Ambadi Road, Vasai (West)",
      city: "Vasai",
      district: "Dist. Palghar",
      state: "Maharashtra",
      pincode: "401202",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.628833989345!2d72.8223631!3d19.3804899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7aeb3e4e9ff13%3A0x7ce086f183204780!2sShree%20Triveni%20CHS%2C%2060%20Feet%20Rd%2C%20Vasai%20West%2C%20Maharashtra%20401202!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      mapDirectionUrl: "https://maps.google.com/?q=C1-118,+Shree+Triveni+CHS,+60+Feet+Road,+Ambadi+Road,+Vasai+West,+Maharashtra+401202",
    },
    {
      type: "Branch Office",
      title: "Vasai (East) Branch Office",
      addressLine1: "312, Infinity Square, Third Floor,",
      addressLine2: "Golani, Vasai (East)",
      city: "Vasai",
      district: "Dist. Palghar",
      state: "Maharashtra",
      pincode: "401208",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.456382103442!2d72.8456102!3d19.3879211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7af0155b9a527%3A0xc0c4902da7b73812!2sInfinity%20Square%2C%20Golani%20Naka%2C%20Vasai%20East%2C%20Maharashtra%20401208!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      mapDirectionUrl: "https://maps.google.com/?q=312,+Infinity+Square,+Golani,+Vasai+East,+Maharashtra+401208",
    }
  ],
  partners: [
    {
      name: "CA Yogesh Kumar Chaturvedi",
      designation: "Partner",
      qualification: "FCA, Chartered Accountant",
      experienceYears: "19+ years",
      summary: "In continuous practice since January 2013, bringing over 19 years of multi-disciplinary experience spanning banking compliances, cross-border financing, corporate debt, audits, tax advisory, and strategic financial management.",
      expertise: [
        "Banking Compliances & Consortium Finance",
        "Foreign Direct Investment (FDI) & External Commercial Borrowings (ECB)",
        "Non-Convertible Debentures (NCD) Compliances",
        "Project Finance & Feasibility Studies",
        "Statutory & Internal Audit",
        "Finalisation of Accounts & Corporate Governance",
        "Direct & Indirect Taxation",
        "Management Information Systems (MIS) & Budgeting",
        "Corporate Policy Formulation & Financial Structuring"
      ],
      pastRoles: [
        "Senior Manager – Accounts & Finance with Usher Group of Companies, Mumbai",
        "General Manager – Finance with Fortpoint Group, Mumbai"
      ],
      phones: ["+91 93221 65502", "+91 95185 07038"],
      email: "caykc2007@gmail.com"
    },
    {
      name: "CA Saurabh Bhutada",
      designation: "Partner",
      qualification: "ACA, Chartered Accountant",
      membershipNo: "176210",
      experienceYears: "12+ years",
      summary: "Qualified as a Chartered Accountant in 2016 with over 12 years of specialized indirect tax and labour codes experience. Regularly represents clients as Authorised Representative in departmental audits, show cause notices, adjudication, and appellate proceedings.",
      expertise: [
        "Goods & Services Tax (Advisory, Compliance & Regularization)",
        "GST Audits & Departmental Scrutiny Representations",
        "GST Notices, Adjudication & Appellate Representation",
        "GST Refund Claims (Export & Inverted Duty Structure)",
        "Legacy Service Tax & MVAT Assessments & Dispute Resolution",
        "Labour Laws & Transition to Four New Labour Codes",
        "Authorised Representative before Tax Authorities & Tribunals"
      ],
      pastRoles: [
        "Manager – Indirect Taxes with M/s S K Patodia & Co., Chartered Accountants, Mumbai",
        "Articleship completed with M/s Dinesh Bangar & Co., Chartered Accountants, Mumbai",
        "Associated with Y K Chaturvedi & Co. since FY 2018-19"
      ],
      phones: ["+91 90491 02047", "+91 87889 64743"],
      email: "caykc2007@gmail.com"
    }
  ],
  keyPersonnel: {
    name: "Gopeshwar Chaturvedi",
    designation: "Senior Manager",
    qualification: "M.Com.",
    experienceYears: "15+ years overall experience",
    specialization: "8 years specializing in GST Audit and GST Refund Claims",
    summary: "Holds a Master of Commerce degree and oversees the firm's GST audit, departmental compliance, and refund assignments, coordinating execution and documentation teams.",
    phones: ["+91 70216 03844", "+91 97308 14321"]
  },
  teamBreakdown: [
    { category: "Chartered Accountants (Partners)", count: 2, share: "13.3%" },
    { category: "Article Assistants", count: 2, share: "13.3%" },
    { category: "Senior Manager", count: 1, share: "6.7%" },
    { category: "Senior Executives", count: 2, share: "13.3%" },
    { category: "Accounts Executives", count: 8, share: "53.3%" }
  ],
  clientTypes: [
    {
      title: "Corporates & Public / Private Companies",
      desc: "Comprehensive statutory audits, ROC compliance, tax management, and board-level advisory.",
      icon: "Building2"
    },
    {
      title: "Limited Liability Partnerships (LLPs)",
      desc: "LLP agreement structuring, annual return filings, compliance audits, and taxation support.",
      icon: "Briefcase"
    },
    {
      title: "Partnership & Proprietorship Firms",
      desc: "Tax audits, GST compliance, bookkeeping, and banking finance proposal preparations.",
      icon: "Users"
    },
    {
      title: "MSMEs & Emerging Enterprises",
      desc: "Udyam registration, subsidies advisory, working capital management, and CMA data preparation.",
      icon: "TrendingUp"
    },
    {
      title: "Trusts & Educational Institutions",
      desc: "Section 12AB/80G compliance, trust audits, FCRA coordination, and FC6 compliances.",
      icon: "GraduationCap"
    },
    {
      title: "Co-operative Societies & Housing Societies",
      desc: "Statutory audits, finalisation of annual accounts, tax exemption claims, and society returns.",
      icon: "Building"
    },
    {
      title: "High Net-Worth Individuals & Professionals",
      desc: "Personal income-tax planning, capital gains advisory, investment tracking, and scrutiny defense.",
      icon: "UserCheck"
    }
  ],
  whatsappNumber: "+919322165502",
  primaryContactPhone: "+91 93221 65502",
  secondaryContactPhone: "+91 90491 02047"
};
