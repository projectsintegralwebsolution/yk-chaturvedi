import nodemailer from "nodemailer";

export interface EnquiryData {
  id?: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  service: string;
  office?: string;
  message: string;
  submittedAt?: Date | string;
}

// Server-side only email configuration
const INTERNAL_EMAIL = process.env.ENQUIRY_INTERNAL_EMAIL || "princekumarjha80@gmail.com";
const CLIENT_EMAIL = process.env.CLIENT_ENQUIRY_EMAIL || "caykc2007@gmail.com";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || `"Y K Chaturvedi & Co." <${CLIENT_EMAIL}>`;

// Create transporter if SMTP credentials are provided
function getTransporter() {
  if (SMTP_USER && SMTP_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return null;
}

/**
 * 1. INTERNAL NOTIFICATION
 * Sent exclusively to ENQUIRY_INTERNAL_EMAIL (princekumarjha80@gmail.com).
 * This address is strictly private and never exposed to client or submitter.
 */
async function sendInternalNotification(data: EnquiryData, timestampStr: string) {
  const transporter = getTransporter();

  const subject = `[INTERNAL NOTIFICATION] New Website Enquiry — Y K Chaturvedi & Co.`;
  const textContent = `
[INTERNAL BACKEND NOTIFICATION]
New consultation enquiry received via the Y K Chaturvedi & Co. website.

--- ENQUIRY DETAILS ---
Name: ${data.name}
Company / Business: ${data.company || "Not Specified"}
Phone: ${data.phone}
Email: ${data.email}
Service Required: ${data.service}
Preferred Office: ${data.office || "Head Office (Vasai West)"}
Date & Time: ${timestampStr}

--- MESSAGE ---
${data.message}

--------------------------------------------------
This internal copy is routed automatically to the system administrator.
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
    .card { background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background-color: #060d17; color: #ffffff; padding: 20px 24px; border-bottom: 3px solid #0A5084; }
    .badge { display: inline-block; background-color: #0A5084; color: #ffffff; font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; margin-bottom: 8px; }
    .header h2 { margin: 0; font-size: 18px; color: #ffffff; }
    .content { padding: 24px; }
    .field { margin-bottom: 14px; }
    .label { font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 2px; }
    .value { font-size: 15px; font-weight: 500; color: #0f172a; }
    .message-box { background-color: #f1f5f9; padding: 14px; border-radius: 8px; border-left: 4px solid #0A5084; margin-top: 16px; font-size: 14px; color: #334155; }
    .footer { background-color: #f8fafc; padding: 16px 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">Internal System Alert</div>
      <h2>New Website Enquiry Received</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Submitter Name</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Company / Organization</div>
        <div class="value">${data.company || "Not Specified"}</div>
      </div>
      <div class="field">
        <div class="label">Contact Phone</div>
        <div class="value"><a href="tel:${data.phone}" style="color: #0A5084; text-decoration: none;">${data.phone}</a></div>
      </div>
      <div class="field">
        <div class="label">Contact Email</div>
        <div class="value"><a href="mailto:${data.email}" style="color: #0A5084; text-decoration: none;">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Service Required</div>
        <div class="value" style="color: #0A5084; font-weight: bold;">${data.service}</div>
      </div>
      <div class="field">
        <div class="label">Preferred Office Location</div>
        <div class="value">${data.office || "Head Office (Vasai West)"}</div>
      </div>
      <div class="field">
        <div class="label">Submission Date & Time</div>
        <div class="value">${timestampStr}</div>
      </div>
      <div class="field">
        <div class="label">Client Message</div>
        <div class="message-box">${(data.message || "").replace(/\n/g, "<br>")}</div>
      </div>
    </div>
    <div class="footer">
      Internal System Notification • Y K Chaturvedi & Co. Web Platform
    </div>
  </div>
</body>
</html>
`;

  if (transporter) {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: INTERNAL_EMAIL,
      subject,
      text: textContent,
      html: htmlContent,
    });
  } else {
    console.log(`[EMAIL DISPATCH - 1/3 INTERNAL TO ${INTERNAL_EMAIL}]`, {
      subject,
      enquiryId: data.id,
      name: data.name,
      email: data.email,
    });
  }
}

/**
 * 2. CLIENT NOTIFICATION
 * Sent exclusively to CLIENT_ENQUIRY_EMAIL (the firm's official address).
 * Must NEVER contain the internal administrator email anywhere in headers or content.
 */
async function sendClientNotification(data: EnquiryData, timestampStr: string) {
  const transporter = getTransporter();

  const subject = `New Website Enquiry — Y K Chaturvedi & Co.`;
  const textContent = `
Dear Partners & Team,

A new client consultation enquiry has been submitted through the firm's website (ykcca.com).

--- ENQUIRY DETAILS ---
Full Name: ${data.name}
Company / Business: ${data.company || "Not Specified"}
Phone Number: ${data.phone}
Email Address: ${data.email}
Service Required: ${data.service}
Preferred Office: ${data.office || "Head Office (Vasai West)"}
Date & Time: ${timestampStr}

--- CLIENT MESSAGE ---
${data.message}

Please assign a team member or partner to review this file and contact the client promptly.

Regards,
Website Enquiry System
Y K Chaturvedi & Co., Chartered Accountants
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
    .card { background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background-color: #060d17; color: #ffffff; padding: 24px; border-bottom: 3px solid #c5a046; }
    .brand { font-size: 13px; font-weight: bold; color: #c5a046; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .header h2 { margin: 0; font-size: 20px; color: #ffffff; }
    .content { padding: 24px; }
    .field { margin-bottom: 14px; }
    .label { font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 2px; }
    .value { font-size: 15px; font-weight: 500; color: #0f172a; }
    .message-box { background-color: #f8fafc; padding: 14px; border-radius: 8px; border-left: 4px solid #c5a046; margin-top: 16px; font-size: 14px; color: #334155; }
    .action-notice { background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-top: 20px; }
    .footer { background-color: #f8fafc; padding: 16px 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">Y K CHATURVEDI & CO. • CHARTERED ACCOUNTANTS</div>
      <h2>New Consultation Enquiry Received</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Client Name</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Company / Organization</div>
        <div class="value">${data.company || "Not Specified"}</div>
      </div>
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value"><a href="tel:${data.phone}" style="color: #0A5084; text-decoration: none; font-weight: bold;">${data.phone}</a></div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${data.email}" style="color: #0A5084; text-decoration: none;">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Practice Area Required</div>
        <div class="value" style="color: #0A5084; font-weight: bold;">${data.service}</div>
      </div>
      <div class="field">
        <div class="label">Preferred Office</div>
        <div class="value">${data.office || "Head Office (Vasai West)"}</div>
      </div>
      <div class="field">
        <div class="label">Submission Date & Time</div>
        <div class="value">${timestampStr}</div>
      </div>
      <div class="field">
        <div class="label">Client Message / Requirement</div>
        <div class="message-box">${(data.message || "").replace(/\n/g, "<br>")}</div>
      </div>
      <div class="action-notice">
        <strong>Next Steps:</strong> Please assign a team member or partner to review this file and connect with the client.
      </div>
    </div>
    <div class="footer">
      Y K Chaturvedi & Co., Chartered Accountants • FRN: 145633W<br>
      Offices in Vasai (West) & Vasai (East), Dist. Palghar
    </div>
  </div>
</body>
</html>
`;

  if (transporter) {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: CLIENT_EMAIL,
      subject,
      text: textContent,
      html: htmlContent,
    });
  } else {
    console.log(`[EMAIL DISPATCH - 2/3 CLIENT TO ${CLIENT_EMAIL}]`, {
      subject,
      enquiryId: data.id,
      name: data.name,
      service: data.service,
    });
  }
}

/**
 * 3. ENQUIRY SUBMITTER CONFIRMATION
 * Sent exclusively to the visitor's entered email address.
 * Must NEVER contain the internal administrator email anywhere in headers or content.
 */
async function sendSubmitterConfirmation(data: EnquiryData) {
  const transporter = getTransporter();

  const subject = `Enquiry Received — Y K Chaturvedi & Co.`;
  const textContent = `
Dear ${data.name},

Thank you for contacting Y K Chaturvedi & Co.

We have successfully received your enquiry and our team will review your request.

Your enquiry details:

Service Required:
${data.service}

Message:
${data.message}

We appreciate your interest in Y K Chaturvedi & Co.

Regards,
Y K Chaturvedi & Co.
Chartered Accountants
FRN: 145633W | GSTIN: 27AACFY3275B1Z9
Offices: Vasai (West) & Vasai (East), Dist. Palghar
Phone: +91 93221 65502 / +91 90491 02047
Website: https://ykcca.com
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
    .card { background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background-color: #060d17; color: #ffffff; padding: 24px; border-bottom: 3px solid #c5a046; }
    .brand { font-size: 13px; font-weight: bold; color: #c5a046; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .header h2 { margin: 0; font-size: 20px; color: #ffffff; }
    .content { padding: 24px; }
    .greeting { font-size: 16px; font-weight: bold; color: #0f172a; margin-bottom: 12px; }
    .intro { font-size: 14px; color: #334155; margin-bottom: 20px; }
    .details-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
    .field-title { font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
    .field-val { font-size: 14px; color: #0f172a; margin-bottom: 12px; }
    .closing { font-size: 14px; color: #334155; margin-bottom: 20px; }
    .contact-card { background-color: #f1f5f9; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #475569; }
    .footer { background-color: #f8fafc; padding: 16px 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">Y K CHATURVEDI & CO.</div>
      <h2>Enquiry Received Confirmation</h2>
    </div>
    <div class="content">
      <div class="greeting">Dear ${data.name},</div>
      <div class="intro">
        Thank you for contacting <strong>Y K Chaturvedi & Co.</strong><br>
        We have successfully received your enquiry and our partner team will review your request.
      </div>

      <div class="details-box">
        <div class="field-title">Service Required:</div>
        <div class="field-val" style="color: #0A5084; font-weight: bold;">${data.service}</div>

        <div class="field-title" style="margin-top: 12px;">Message:</div>
        <div class="field-val" style="margin-bottom: 0;">${(data.message || "").replace(/\n/g, "<br>")}</div>
      </div>

      <div class="closing">
        We appreciate your interest in Y K Chaturvedi & Co. A senior practitioner will connect with you promptly.
      </div>

      <div class="contact-card">
        <strong>Direct Contact Lines:</strong><br>
        • Vasai (West) Head Office: +91 93221 65502<br>
        • Vasai (East) Branch Office: +91 90491 02047<br>
        • Official Email: ${CLIENT_EMAIL}
      </div>
    </div>
    <div class="footer">
      <strong>Y K Chaturvedi & Co., Chartered Accountants</strong><br>
      FRN: 145633W • GSTIN: 27AACFY3275B1Z9<br>
      Direct Partner Supervision across Maharashtra & Mumbai MMR
    </div>
  </div>
</body>
</html>
`;

  if (transporter) {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: data.email,
      subject,
      text: textContent,
      html: htmlContent,
    });
  } else {
    console.log(`[EMAIL DISPATCH - 3/3 SUBMITTER CONFIRMATION TO ${data.email}]`, {
      subject,
      enquiryId: data.id,
      name: data.name,
      service: data.service,
    });
  }
}

/**
 * Master 3-Way Notification Dispatcher
 * Sends three completely independent emails:
 * 1. Internal notification -> ENQUIRY_INTERNAL_EMAIL
 * 2. Client notification   -> CLIENT_ENQUIRY_EMAIL
 * 3. Submitter confirm     -> data.email
 */
export async function sendThreeWayEnquiryNotifications(data: EnquiryData): Promise<{
  internalSent: boolean;
  clientSent: boolean;
  submitterSent: boolean;
}> {
  const timestamp = new Date();
  const timestampStr = timestamp.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  // Execute all three dispatches in isolated promises so no recipient or header leakage can ever occur
  const [internalResult, clientResult, submitterResult] = await Promise.allSettled([
    sendInternalNotification(data, timestampStr),
    sendClientNotification(data, timestampStr),
    sendSubmitterConfirmation(data),
  ]);

  if (internalResult.status === "rejected") {
    console.error("[Email Dispatch Error] Failed to send internal notification:", internalResult.reason);
  }
  if (clientResult.status === "rejected") {
    console.error("[Email Dispatch Error] Failed to send client notification:", clientResult.reason);
  }
  if (submitterResult.status === "rejected") {
    console.error("[Email Dispatch Error] Failed to send submitter confirmation:", submitterResult.reason);
  }

  return {
    internalSent: internalResult.status === "fulfilled",
    clientSent: clientResult.status === "fulfilled",
    submitterSent: submitterResult.status === "fulfilled",
  };
}
