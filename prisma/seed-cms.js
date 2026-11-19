const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding CMS Database ---');

  // 1. Seed Services from data/servicesData.ts
  const servicesDataFile = path.join(process.cwd(), 'data', 'servicesData.ts');
  if (fs.existsSync(servicesDataFile)) {
    const raw = fs.readFileSync(servicesDataFile, 'utf8');
    // Extract JSON or parse servicesData
    const serviceCount = await prisma.serviceItem.count();
    console.log(`Current DB Services count: ${serviceCount}`);

    if (serviceCount === 0) {
      // Evaluate exported array cleanly using node
      const match = raw.match(/export const servicesData: ServiceDetail\[\] = (\[[\s\S]*?\]);/);
      if (match && match[1]) {
        try {
          const services = eval(match[1]);
          console.log(`Extracted ${services.length} services from servicesData.ts`);
          for (let i = 0; i < services.length; i++) {
            const s = services[i];
            await prisma.serviceItem.upsert({
              where: { slug: s.slug },
              update: {},
              create: {
                slug: s.slug,
                title: s.title,
                categoryNumber: s.categoryNumber || (i + 1),
                shortDesc: s.shortDesc || '',
                heroTagline: s.heroTagline || '',
                bannerImage: s.bannerImage || '',
                iconName: s.iconName || 'FileText',
                inclusions: JSON.stringify(s.inclusions || []),
                strategicBenefits: JSON.stringify(s.strategicBenefits || []),
                processSteps: JSON.stringify(s.processSteps || []),
                faqs: JSON.stringify(s.faqs || []),
                relatedSlugs: JSON.stringify(s.relatedSlugs || []),
                displayOrder: i + 1,
                isActive: true,
                metaTitle: `${s.title} | Y K Chaturvedi & Co.`,
                metaDescription: s.shortDesc || ''
              }
            });
          }
          console.log('Services successfully seeded into database!');
        } catch (e) {
          console.error('Error evaluating services array:', e);
        }
      }
    }
  }

  // 2. Seed Partners & Firm Data from data/firmData.ts
  const firmDataFile = path.join(process.cwd(), 'data', 'firmData.ts');
  if (fs.existsSync(firmDataFile)) {
    const partnerCount = await prisma.partnerProfile.count();
    console.log(`Current DB Partners count: ${partnerCount}`);

    if (partnerCount === 0) {
      // Seed default 2 partners
      await prisma.partnerProfile.create({
        data: {
          name: "CA Yogesh Kumar Chaturvedi",
          designation: "Partner",
          qualification: "FCA, Chartered Accountant",
          membershipNo: "408448",
          experienceYears: "19+ years",
          summary: "In continuous practice since January 2013, bringing over 19 years of multi-disciplinary experience spanning banking compliances, cross-border financing, corporate debt, audits, tax advisory, and strategic financial management.",
          expertise: JSON.stringify([
            "Banking Compliances & Consortium Finance",
            "Foreign Direct Investment (FDI) & External Commercial Borrowings (ECB)",
            "Non-Convertible Debentures (NCD) Compliances",
            "Project Finance & Feasibility Studies",
            "Statutory & Internal Audit",
            "Finalisation of Accounts & Corporate Governance",
            "Direct & Indirect Taxation",
            "Management Information Systems (MIS) & Budgeting",
            "Corporate Policy Formulation & Financial Structuring"
          ]),
          pastRoles: JSON.stringify([
            "Senior Manager – Accounts & Finance with a Mumbai-based corporate group",
            "General Manager – Finance with a Mumbai-based corporate group"
          ]),
          phones: JSON.stringify(["+91 93221 65502", "+91 95185 07038"]),
          email: "caykc2007@gmail.com",
          image: "/images/YC.png",
          displayOrder: 1,
          isActive: true
        }
      });

      await prisma.partnerProfile.create({
        data: {
          name: "CA Saurabh Bhutada",
          designation: "Partner",
          qualification: "ACA, Chartered Accountant",
          membershipNo: "176210",
          experienceYears: "12+ years",
          summary: "Qualified as a Chartered Accountant in 2016 with over 12 years of specialized indirect tax and labour codes experience. Regularly represents clients as Authorised Representative in departmental audits, show cause notices, adjudication, and appellate proceedings.",
          expertise: JSON.stringify([
            "Goods & Services Tax (Advisory, Compliance & Regularization)",
            "GST Audits & Departmental Scrutiny Representations",
            "GST Notices, Adjudication & Appellate Representation",
            "GST Refund Claims (Export & Inverted Duty Structure)",
            "Legacy Service Tax & MVAT Assessments & Dispute Resolution",
            "Labour Laws & Transition to Four New Labour Codes",
            "Authorised Representative before Tax Authorities & Tribunals"
          ]),
          pastRoles: JSON.stringify([
            "Manager – Indirect Taxes with a Mumbai-based CA firm",
            "Articleship completed with a Mumbai-based CA firm",
            "Associated with Y K Chaturvedi & Co. since FY 2018-19"
          ]),
          phones: JSON.stringify(["+91 90491 02047", "+91 87889 64743"]),
          email: "caykc2007@gmail.com",
          image: "/images/SB.jpeg",
          displayOrder: 2,
          isActive: true
        }
      });
      console.log('Partners successfully seeded into database!');
    }

    // 3. Seed Key Personnel / Team
    const teamCount = await prisma.teamMemberProfile.count();
    console.log(`Current DB Team count: ${teamCount}`);
    if (teamCount === 0) {
      await prisma.teamMemberProfile.create({
        data: {
          name: "Gopeshwar Chaturvedi",
          designation: "Senior Manager",
          qualification: "M.Com.",
          department: "GST & Audit Operations",
          experienceYears: "15+ years overall experience",
          specialization: "8 years specializing in GST Audit and GST Refund Claims",
          summary: "Holds a Master of Commerce degree and oversees the firm's GST audit, departmental compliance, and refund assignments, coordinating execution and documentation teams.",
          phones: JSON.stringify(["+91 70216 03844", "+91 97308 14321"]),
          displayOrder: 1,
          isActive: true
        }
      });
      console.log('Team member successfully seeded into database!');
    }

    // 4. Seed Site Settings (Firm info, Offices, Timings, Contact, Navigation, Footer, SEO)
    const settingsCount = await prisma.siteSetting.count();
    console.log(`Current DB SiteSetting count: ${settingsCount}`);
    if (settingsCount === 0) {
      const defaultSettings = [
        {
          key: "firm_info",
          value: JSON.stringify({
            name: "Y K Chaturvedi & Co.",
            subtitle: "Chartered Accountants",
            constitution: "Partnership Firm",
            frn: "145633W",
            gstin: "27AACFY3275B1Z9",
            establishedDate: "02 September 2017",
            yearsInPractice: "9+ Years",
            totalTeamMembers: 15,
            email: "caykc2007@gmail.com",
            primaryContactPhone: "+91 93221 65502",
            whatsappNumber: "919322165502",
            officeHours: "Monday – Saturday: 10:30 AM – 7:00 PM"
          })
        },
        {
          key: "offices",
          value: JSON.stringify([
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
              mapDirectionUrl: "https://maps.google.com/?q=C1-118,+Shree+Triveni+CHS,+60+Feet+Road,+Ambadi+Road,+Vasai+West,+Maharashtra+401202"
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
              mapDirectionUrl: "https://maps.google.com/?q=312,+Infinity+Square,+Golani,+Vasai+East,+Maharashtra+401208"
            }
          ])
        },
        {
          key: "homepage_content",
          value: JSON.stringify({
            heroBadge: "Chartered Accountants • Estd 2017",
            heroTitle: "Precision in Audit. Mastery in Taxation.",
            heroSubtitle: "Premier Chartered Accountancy partnership firm with dual offices in Vasai (West) and Vasai (East). Delivering partner-led statutory audit, direct tax litigation, and GST compliance across Mumbai MMR and Palghar.",
            heroPrimaryBtnText: "Book Consultation",
            heroPrimaryBtnLink: "/contact",
            heroSecondaryBtnText: "Explore Services",
            heroSecondaryBtnLink: "/services",
            stats: [
              { label: "Year of Establishment", value: "2017" },
              { label: "Executive Offices", value: "2" },
              { label: "Dedicated Team Members", value: "15" },
              { label: "Practice Experience", value: "9+ Years" }
            ]
          })
        },
        {
          key: "about_content",
          value: JSON.stringify({
            badge: "Executive Leadership & Practice Profile",
            title: "About Y K Chaturvedi & Co.",
            subtitle: "Established in September 2017, Y K Chaturvedi & Co. is a multi-disciplinary Chartered Accountancy partnership firm dedicated to precision, integrity, and proactive compliance.",
            introParagraph1: "Headquartered in Vasai, Dist. Palghar, the firm operates with two fully equipped offices catering to corporate enterprises, manufacturing hubs, MSMEs, service entities, and high-net-worth individuals across the Mumbai Metropolitan Region (MMR).",
            introParagraph2: "Our core ethos centers on direct partner supervision. Every client engagement—from complex search and seizure representations to routine GST filing—benefits from direct review by FCA and ACA leadership."
          })
        },
        {
          key: "navigation_menu",
          value: JSON.stringify([
            { label: "Home", href: "/", isExternal: false, order: 1 },
            { label: "About", href: "/about", isExternal: false, order: 2 },
            { label: "Services", href: "/services", isExternal: false, order: 3 },
            { label: "Partners", href: "/partners", isExternal: false, order: 4 },
            { label: "Team", href: "/team", isExternal: false, order: 5 },
            { label: "Blog", href: "/blog", isExternal: false, order: 6 },
            { label: "Contact", href: "/contact", isExternal: false, order: 7 }
          ])
        },
        {
          key: "footer_content",
          value: JSON.stringify({
            aboutText: "Y K Chaturvedi & Co. (FRN: 145633W) is a premier Chartered Accountancy partnership firm with two offices in Vasai, Maharashtra. Direct partner supervision on every audit, taxation, and advisory engagement.",
            copyrightText: `© ${new Date().getFullYear()} Y K Chaturvedi & Co. Chartered Accountants. All rights reserved.`,
            disclaimerText: "As per ICAI regulations, this website does not solicit work or advertise. It is intended solely for informational purposes."
          })
        },
        {
          key: "seo_settings",
          value: JSON.stringify({
            defaultMetaTitle: "Y K Chaturvedi & Co. | Chartered Accountants | Vasai & Mumbai MMR",
            defaultMetaDescription: "Y K Chaturvedi & Co. (FRN: 145633W, GSTIN: 27AACFY3275B1Z9) is a premier Chartered Accountancy partnership firm with offices in Vasai West & Vasai East. Expert audit, taxation, GST, ROC, project finance, and advisory under direct partner supervision.",
            canonicalBaseUrl: "https://ykchaturvedi.com",
            ogImage: "/images/ca-logo-mark.jpg",
            metaRobots: "index, follow"
          })
        }
      ];

      for (const item of defaultSettings) {
        await prisma.siteSetting.upsert({
          where: { key: item.key },
          update: {},
          create: item
        });
      }
      console.log('Site settings successfully seeded into database!');
    }

    // 5. Seed Media Assets from public/images and public/uploads
    const mediaCount = await prisma.mediaAsset.count();
    console.log(`Current DB Media count: ${mediaCount}`);
    if (mediaCount === 0) {
      const scanDir = (dir, folderName) => {
        if (!fs.existsSync(dir)) return [];
        const files = fs.readdirSync(dir);
        return files.map(f => {
          const fullPath = path.join(dir, f);
          const stat = fs.statSync(fullPath);
          return {
            url: `/${folderName}/${f}`.replace(/\\/g, '/'),
            fileName: f,
            fileType: path.extname(f).slice(1) || 'image',
            fileSize: stat.size,
            altText: f.replace(/[-_.]/g, ' '),
            folder: folderName
          };
        });
      };

      const images = scanDir(path.join(process.cwd(), 'public', 'images'), 'images');
      for (const img of images) {
        await prisma.mediaAsset.upsert({
          where: { url: img.url },
          update: {},
          create: img
        });
      }
      console.log(`Seeded ${images.length} initial media assets into database!`);
    }

    // 6. Ensure default Admin User
    const adminUserCount = await prisma.adminUser.count();
    console.log(`Current AdminUser count: ${adminUserCount}`);
    if (adminUserCount === 0) {
      await prisma.adminUser.create({
        data: {
          username: process.env.ADMIN_USERNAME || "admin",
          password: process.env.ADMIN_PASSWORD || "adminpassword2026",
          name: "Managing Partner (Administrator)",
          role: "Super Admin"
        }
      });
      console.log('Default AdminUser created in database!');
    }
  }

  console.log('--- Database Seeding Complete ---');
}

main()
  .catch(e => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
