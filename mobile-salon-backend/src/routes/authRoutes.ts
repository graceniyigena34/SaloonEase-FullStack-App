import { Router } from 'express';
import * as authCtrl from '../controllers/authController';
import { auth, ownerOnly } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import * as authSchemas from '../validation/auth';

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: grace@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error (e.g. missing fields)
 *       401:
 *         description: Invalid credentials (wrong email or password)
 *       403:
 *         description: Account not verified (OTP required)
 */
router.post('/login', validateBody(authSchemas.loginSchema), authCtrl.login);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User created successfully. OTP sent.
 *       400:
 *         description: User already exists
 */
router.post('/signup', validateBody(authSchemas.signupSchema), authCtrl.signup);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify User OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otpEntered
 *             properties:
 *               email:
 *                 type: string
 *               otpEntered:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verified successfully
 *       400:
 *         description: Invalid code
 */
router.post('/verify-otp', validateBody(authSchemas.verifyOtpSchema), authCtrl.verifyOtp);
router.post('/resend-otp', validateBody(authSchemas.resendOtpSchema), authCtrl.resendOtp);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Request password reset code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset code sent
 *       404:
 *         description: User not found
 */
router.post('/forgot-password', validateBody(authSchemas.requestPasswordResetSchema), authCtrl.requestPasswordReset);
router.post('/reset-password', validateBody(authSchemas.resetPasswordSchema), authCtrl.resetPassword);
router.post('/send-otp', authCtrl.sendOtpToPhone);

router.get('/me', auth, async (req, res) => { /* logic */ });
router.get('/users', auth, ownerOnly, async (req, res) => { /* logic */ });
router.put('/users/:id', auth, async (req, res) => { /* logic */ });
router.delete('/users/:id', auth, async (req, res) => { /* logic */ });

export default router;