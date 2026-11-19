import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const service = await prisma.serviceItem.findUnique({
      where: { id: params.id },
    });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ service });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const updateData: any = {};

    const fields = [
      "slug",
      "title",
      "categoryNumber",
      "shortDesc",
      "heroTagline",
      "bannerImage",
      "iconName",
      "inclusions",
      "strategicBenefits",
      "processSteps",
      "faqs",
      "relatedSlugs",
      "displayOrder",
      "isActive",
      "metaTitle",
      "metaDescription",
    ];

    for (const f of fields) {
      if (data[f] !== undefined) {
        if (["inclusions", "strategicBenefits", "processSteps", "faqs", "relatedSlugs"].includes(f)) {
          updateData[f] = typeof data[f] === "string" ? data[f] : JSON.stringify(data[f]);
        } else if (f === "categoryNumber" || f === "displayOrder") {
          updateData[f] = Number(data[f]);
        } else if (f === "isActive") {
          updateData[f] = Boolean(data[f]);
        } else {
          updateData[f] = data[f];
        }
      }
    }

    const updated = await prisma.serviceItem.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.serviceItem.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
