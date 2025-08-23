import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Received request body:", body); 

    const { name, email, country, mobile, requirement } = body;

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

    const text = `
      New Inquiry:
      Name: ${name}
      Email: ${email}
      Country: ${country}
      Mobile: ${mobile}
      Requirement: ${requirement}
    `;

    await transporter.sendMail({
      from: email,
      to: process.env.GMAIL_USER,
      subject: "New Inquiry from Website",
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
