// /app/api/send_email/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, userEmail, userMessage } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,   
        pass: process.env.NODEMAILER_PASSWORD,      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: process.env.EMAIL_RECEIVER || process.env.NODEMAILER_USER,
      subject: `Mensaje de ${name}`,
      text: `Email: ${userEmail}\n\nMensaje:\n${userMessage}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("📧 Email enviado:", info.response);
    return NextResponse.json({ status: "success", messageId: info.messageId });
  } catch (error) {
    console.error("❌ Error al enviar email:", error);
    return new NextResponse("Error al enviar email", { status: 500 });
  }
}
