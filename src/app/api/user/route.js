import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { hash } from "bcrypt";
import * as z from 'zod'
import { rateLimit } from '@/app/lib/rate-limit'
import { Prisma } from '@prisma/client';

const userSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email')
    .max(255, 'Email is too long'),
  firstname: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long')
    .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
  lastname: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name is too long')
    .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password is too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

export async function POST(req) {
    try {
        // Apply rate limiting
        const ip = req.headers.get('x-forwarded-for')
        const { success } = await rateLimit(ip)
        
        if (!success) {
            return NextResponse.json(
                { error: 'Too many requests' },
                { status: 429 }
            )
        }

        const body = await req.json();
        console.log('Received body:', body); // Debug log

        const { email, firstname, lastname, password } = userSchema.parse(body);
        console.log('Validated data:', { email, firstname, lastname }); // Debug log (exclude password)

        // Check if all required fields are present
        if (!email || !firstname || !lastname || !password) {
            return NextResponse.json(
                { error: "Missing required fields" }, 
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });

        if (existingUserByEmail) {
            return NextResponse.json(
                { error: "User with this email already exists" }, 
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hash(password, 10);

        // Create new user
        const newUser = await db.user.create({
            data: {
                email,
                firstname,
                lastname,
                password: hashedPassword,
                status: 'ACTIVE',
                role: 'USER',
            },
            select: {
                id: true,
                uuid: true,
                email: true,
                firstname: true,
                lastname: true,
                role: true,
                status: true,
                createdAt: true,
            }
        });

        console.log('User created successfully:', newUser); // Debug log

        return NextResponse.json({ 
            user: newUser,
            message: "Account created successfully" 
        }, { status: 201 });

    } catch (error) {
        console.error("Registration error:", error);

        // Handle Prisma-specific errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json({ 
                    error: "A user with this email already exists" 
                }, { status: 409 });
            }
            return NextResponse.json({ 
                error: "Database error", 
                code: error.code 
            }, { status: 500 });
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({ 
                error: "Validation failed", 
                details: error.errors 
            }, { status: 400 });
        }

        return NextResponse.json({ 
            error: "An error occurred during registration",
            details: error.message 
        }, { status: 500 });
    }
}
