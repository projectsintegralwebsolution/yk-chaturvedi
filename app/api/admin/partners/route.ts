import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const partners = await prisma.partnerProfile.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ partners });
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
    const partner = await prisma.partnerProfile.create({
      data: {
        name: data.name,
        designation: data.designation,
        qualification: data.qualification,
        membershipNo: data.membershipNo || null,
        experienceYears: data.experienceYears,
        summary: data.summary,
        expertise: typeof data.expertise === "string" ? data.expertise : JSON.stringify(data.expertise || []),
        pastRoles: typeof data.pastRoles === "string" ? data.pastRoles : JSON.stringify(data.pastRoles || []),
        phones: typeof data.phones === "string" ? data.phones : JSON.stringify(data.phones || []),
        email: data.email,
        image: data.image || null,
        displayOrder: Number(data.displayOrder) || 0,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });

    return NextResponse.json({ success: true, partner }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
