import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // If you have nodemailer set up, uncomment and configure:
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    // });
    // await transporter.sendMail({
    //   from: email,
    //   to: process.env.EMAIL_USER,
    //   subject: `[Portfolio] ${subject}`,
    //   text: `From: ${name} (${email})\n\n${message}`,
    // });

    console.log("Contact form submission:", { name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
