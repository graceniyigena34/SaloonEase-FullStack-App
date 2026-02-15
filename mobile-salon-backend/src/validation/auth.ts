import { z } from 'zod';

const passwordSchema = z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const signupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    password: passwordSchema,
    role: z.enum(['customer', 'owner']).optional(),
});

export const verifyOtpSchema = z.object({
    email: z.string().email(),
    otpEntered: z.string().length(4),
});

export const resendOtpSchema = z.object({
    email: z.string().email(),
});

export const requestPasswordResetSchema = z.object({
    email: z.string().email(),
});

export const resetPasswordSchema = z.object({
    email: z.string().email(),
    code: z.string().length(4),
    newPassword: passwordSchema,
});
