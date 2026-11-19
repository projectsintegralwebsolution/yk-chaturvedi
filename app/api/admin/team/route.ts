import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const team = await prisma.teamMemberProfile.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ team });
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
    const member = await prisma.teamMemberProfile.create({
      data: {
        name: data.name,
        designation: data.designation,
        qualification: data.qualification,
        department: data.department || "Audit & Taxation",
        experienceYears: data.experienceYears,
        specialization: data.specialization || null,
        summary: data.summary || null,
        phones: typeof data.phones === "string" ? data.phones : JSON.stringify(data.phones || []),
        displayOrder: Number(data.displayOrder) || 0,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });

    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
