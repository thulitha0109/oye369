import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, company, phone, services, deadline, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    // If INQUIRY_EMAIL isn't provided fall back to CONTACT_EMAIL
    const to = process.env.INQUIRY_EMAIL || process.env.CONTACT_EMAIL;

    if (!host || !user || !pass || !to) {
      return NextResponse.json({ success: false, error: "SMTP or target email not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const html = `
      <h3>Inquiry Form</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Company:</b> ${company || "-"}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "-"}</p>
      <p><b>Services:</b> ${Array.isArray(services) ? services.join(", ") : (services || "-")}</p>
      <p><b>Deadline:</b> ${deadline || "-"}</p>
      <p><b>Budget:</b> ${budget || "-"}</p>
      <p><b>Message:</b><br/> ${message}</p>
    `;

    await transporter.sendMail({
      from: `"Website Inquiry" <${user}>`,
      to,
      subject: `Inquiry: ${name} ${company ? `(${company})` : ""}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Inquiry API error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
