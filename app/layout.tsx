import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { ConsultationModal } from "@/components/ConsultationModal";
import { ModalProvider } from "@/components/ModalContext";
import { firmData } from "@/data/firmData";


export const metadata: Metadata = {
  metadataBase: new URL("https://ykchaturvedi.com"),
  title: {
    default: "Y K Chaturvedi & Co. | Chartered Accountants | Vasai & Mumbai MMR",
    template: "%s | Y K Chaturvedi & Co. Chartered Accountants",
  },
  description:
    "Y K Chaturvedi & Co. (FRN: 145633W, GSTIN: 27AACFY3275B1Z9) is a premier Chartered Accountancy partnership firm with offices in Vasai West & Vasai East. Expert audit, taxation, GST, ROC, project finance, and advisory under direct partner supervision.",
  keywords: [
    "Chartered Accountants Vasai",
    "CA Firm Palghar",
    "Y K Chaturvedi & Co",
    "GST Consultants Vasai",
    "Tax Audit Palghar",
    "Income Tax Advisory Mumbai MMR",
    "Company Incorporation Vasai",
    "GST Refunds Section 54",
    "Project Finance CA",
    "Labour Codes Advisory",
  ],
  icons: {
    icon: "/images/ca-logo-mark.jpg",
    apple: "/images/ca-logo-mark.jpg",
  },
  authors: [{ name: "Y K Chaturvedi & Co." }],
  creator: "Y K Chaturvedi & Co.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ykchaturvedi.com",
    title: "Y K Chaturvedi & Co. | Chartered Accountants",
    description:
      "Partner-led professional services across audit, direct taxation, GST, ROC compliance, project finance, and business advisory from two offices in Vasai, Dist. Palghar.",
    siteName: "Y K Chaturvedi & Co. Chartered Accountants",
    images: [{ url: "/images/ca-logo-mark.jpg" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "ProfessionalService", "LocalBusiness"],
    name: "Y K Chaturvedi & Co., Chartered Accountants",
    legalName: "Y K Chaturvedi & Co.",
    foundingDate: "2017-09-02",
    taxID: firmData.gstin,
    identifier: firmData.frn,
    url: "https://ykchaturvedi.com",
    logo: "https://ykchaturvedi.com/images/ca-logo-mark.jpg",
    email: firmData.email,
    telephone: firmData.primaryContactPhone,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "C1-118, Shree Triveni CHS, 60 Feet Road, Ambadi Road",
        addressLocality: "Vasai (West)",
        addressRegion: "Maharashtra",
        postalCode: "401202",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "312, Infinity Square, Third Floor, Golani",
        addressLocality: "Vasai (East)",
        addressRegion: "Maharashtra",
        postalCode: "401208",
        addressCountry: "IN",
      },
    ],
    priceRange: "$$",
    openingHours: "Mo-Sa 09:30-19:30",
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/ca-logo-mark.jpg" type="image/jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <ModalProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
          <ConsultationModal />
        </ModalProvider>
      </body>
    </html>
  );
}
