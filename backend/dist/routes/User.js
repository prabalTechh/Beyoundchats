"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const db_1 = __importDefault(require("../db/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const router = express_1.default.Router();
// @ts-ignore
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield db_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        // Hash the password
        const hash = yield bcryptjs_1.default.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiryTime = new Date(Date.now() + 5 * 60 * 1000); // OTP expiry in 5 minutes
        yield db_1.default.user.create({
            data: {
                name,
                email,
                password: hash, // Store the hashed password, not plain text
                otp: otp.toString(),
                otpExpiry: expiryTime,
                isVerified: false,
            },
        });
        // Send verification email with OTP
        yield transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            html: `
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">NoteKeep</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing NoteKeep. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />NoteKeep</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>NoteKeep Inc</p>
        <p>123 MG Road</p>
        <p>Bangalore, India</p>
        <p>Contact: +91-9876543210</p>
      </div>
    </div>
  </div>
        `,
        });
        res.status(200).json({ message: "Registration initiated successfully" });
    }
    catch (error) {
        console.log("Error in signup", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
//@ts-ignore
router.post("/verify-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const user = yield db_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified please SignIn" });
        }
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if (!user.otpExpiry || new Date() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired" });
        }
        // Update the user's verification status
        yield db_1.default.user.update({
            where: { email },
            data: { isVerified: true, otp: null, otpExpiry: null },
        });
        res.status(200).json({ message: "User verified successfully" });
    }
    catch (error) {
        console.log("Error in OTP verification", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
//@ts-ignore
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    try {
        // Find user by email
        const user = yield db_1.default.user.findUnique({
            where: { email },
        });
        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        // Check if user is verified
        if (!user.isVerified) {
            return res
                .status(403)
                .json({
                error: "User is not verified. Please verify your account before signing in.",
            });
        }
        // Compare password
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password." });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Sign-in successful.",
            token,
        });
    }
    catch (error) {
        console.error("Error during sign-in:", error);
        res
            .status(500)
            .json({
            error: "An error occurred during sign-in. Please try again later.",
        });
    }
}));
router.get("/profile", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    try {
        const users = yield db_1.default.user.findFirst({
            where: {
                id: userId
            }
        });
        res.json({ data: users });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
