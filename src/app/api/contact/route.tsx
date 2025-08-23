import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from "@/template/emailTemplate";

export async function POST(request: NextRequest) {
  try {

    const { name, email, country, mobile, requirement } = await request.json();

    if (!email || !requirement) {
      return NextResponse.json({ error: "Email and requirement required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const logoUrl =  `${process.env.DOMAIN}/images/Logo11.jpg`

    const html = EmailTemplate({ name, email, country, mobile, requirement, logoUrl });

    await transporter.sendMail({
      from: email,
      to: process.env.GMAIL_USER,
      subject: "New Inquiry for Dev Vansh Engineers",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
