import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendThreeWayEnquiryNotifications } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, phone, email, service, office, message } = body;

    // 1. Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide your full name.",
        },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid phone number.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your message or enquiry requirement.",
        },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: name.trim().slice(0, 150),
      company: company ? String(company).trim().slice(0, 150) : null,
      phone: phone.trim().slice(0, 30),
      email: email.trim().toLowerCase().slice(0, 150),
      service: service ? String(service).trim().slice(0, 120) : "Audit & Assurance",
      office: office ? String(office).trim().slice(0, 120) : "Head Office (Vasai West)",
      message: message.trim().slice(0, 3000),
    };

    // 2. Persist enquiry in database
    let savedEnquiry = null;
    try {
      savedEnquiry = await prisma.enquiry.create({
        data: sanitizedData,
      });
    } catch (dbError) {
      console.error("[Database Save Error] Failed to persist enquiry to database:", dbError);
      // Non-fatal: continue to email notifications
    }

    // 3, 4, 5. Send isolated 3-Way Email Notifications
    // - Internal Administrator (ENQUIRY_INTERNAL_EMAIL)
    // - Client Official Desk (CLIENT_ENQUIRY_EMAIL)
    // - Enquiry Submitter Confirmation (user's email)
    try {
      await sendThreeWayEnquiryNotifications({
        id: savedEnquiry?.id,
        name: sanitizedData.name,
        company: sanitizedData.company || undefined,
        phone: sanitizedData.phone,
        email: sanitizedData.email,
        service: sanitizedData.service,
        office: sanitizedData.office || undefined,
        message: sanitizedData.message,
        submittedAt: savedEnquiry?.createdAt || new Date(),
      });
    } catch (emailError) {
      console.error("[Email Notification Error] 3-way email dispatch failure:", emailError);
      // Log technical error only on the server, never expose to client
    }

    // 6. Return professional success message
    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your enquiry has been submitted successfully. A confirmation has been sent to your email address.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Enquiry API Error] Unexpected server error processing enquiry:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while submitting your enquiry. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
