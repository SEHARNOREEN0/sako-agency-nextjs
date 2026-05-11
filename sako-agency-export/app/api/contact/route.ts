import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, company, service, budget, message } = body;

        // Validate required fields
        if (!name || !email || !service || !message) {
            return NextResponse.json(
                { error: "Name, email, service, and message are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Sanitize and limit input lengths
        const sanitized = {
            name: String(name).trim().slice(0, 200),
            email: String(email).toLowerCase().trim().slice(0, 254),
            company: company ? String(company).trim().slice(0, 200) : null,
            service: String(service).trim().slice(0, 100),
            budget: budget ? String(budget).trim().slice(0, 50) : null,
            message: String(message).trim().slice(0, 5000),
        };

        const contactRequest = await prisma.contactRequest.create({
            data: sanitized,
        });

        return NextResponse.json(
            { message: "Message sent successfully", id: contactRequest.id },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
