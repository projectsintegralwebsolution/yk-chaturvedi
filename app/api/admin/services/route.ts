import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await prisma.serviceItem.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ services });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const {
      slug,
      title,
      categoryNumber,
      shortDesc,
      heroTagline,
      bannerImage,
      iconName,
      inclusions,
      strategicBenefits,
      processSteps,
      faqs,
      relatedSlugs,
      displayOrder,
      isActive,
      metaTitle,
      metaDescription,
    } = data;

    if (!slug || !title) {
      return NextResponse.json({ error: "Slug and title are required" }, { status: 400 });
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-");

    const service = await prisma.serviceItem.create({
      data: {
        slug: cleanSlug,
        title,
        categoryNumber: Number(categoryNumber) || 1,
        shortDesc: shortDesc || "",
        heroTagline: heroTagline || "",
        bannerImage: bannerImage || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop",
        iconName: iconName || "FileText",
        inclusions: typeof inclusions === "string" ? inclusions : JSON.stringify(inclusions || []),
        strategicBenefits: typeof strategicBenefits === "string" ? strategicBenefits : JSON.stringify(strategicBenefits || []),
        processSteps: typeof processSteps === "string" ? processSteps : JSON.stringify(processSteps || []),
        faqs: typeof faqs === "string" ? faqs : JSON.stringify(faqs || []),
        relatedSlugs: typeof relatedSlugs === "string" ? relatedSlugs : JSON.stringify(relatedSlugs || []),
        displayOrder: Number(displayOrder) || 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        metaTitle: metaTitle || `${title} | Y K Chaturvedi & Co.`,
        metaDescription: metaDescription || shortDesc || "",
      },
    });

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
