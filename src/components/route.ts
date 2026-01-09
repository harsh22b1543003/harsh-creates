import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = "work.17akki.akash@gmail.com"; // Your receiving email

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const data = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>", // Must be from a verified domain on Resend, using this for testing
            to: [toEmail],
            subject: `New message from ${name} on your portfolio`,
            reply_to: email,
            html: `<p>You have a new message from your portfolio contact form:</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}