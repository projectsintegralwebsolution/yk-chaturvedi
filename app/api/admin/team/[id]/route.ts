import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

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
      "name",
      "designation",
      "qualification",
      "department",
      "experienceYears",
      "specialization",
      "summary",
      "phones",
      "displayOrder",
      "isActive",
    ];

    for (const f of fields) {
      if (data[f] !== undefined) {
        if (f === "phones") {
          updateData[f] = typeof data[f] === "string" ? data[f] : JSON.stringify(data[f]);
        } else if (f === "displayOrder") {
          updateData[f] = Number(data[f]);
        } else if (f === "isActive") {
          updateData[f] = Boolean(data[f]);
        } else {
          updateData[f] = data[f];
        }
      }
    }

    const updated = await prisma.teamMemberProfile.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, member: updated });
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
    await prisma.teamMemberProfile.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Team member deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
