import Otp from "../models/Otp.models.js";
import User from "../models/User.models.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendEmail } from "../utils/sendEmail.js";

/* ---------------- SEND OTP ---------------- */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const otp = String(generateOtp());
    const expiresAt = new Date(
      Date.now() + Number(process.env.OTP_EXPIRY_MINUTES) * 60 * 1000
    );

    // delete old OTPs
    await Otp.deleteMany({ email });

    await Otp.create({ email, otp, expiresAt });

    await sendEmail({
      to: email,
      subject: "Verify your email - DietSync",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in ${process.env.OTP_EXPIRY_MINUTES} minutes.</p>
      `,
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* ---------------- VERIFY OTP ---------------- */
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }
  
    const record = await Otp.findOne({ email })
    .sort({ createdAt: -1 }) // 🔥 LATEST OTP ONLY
    .select("+otp");
  
  
    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }
  
    if (record.expiresAt < new Date()) {
      await Otp.deleteMany({ email });
      return res.status(400).json({ message: "OTP expired" });
    }
  
    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  
    // ✅ OTP verified successfully
    await Otp.deleteMany({ email });
  
    return res.json({
      message: "Email verified successfully",
      emailVerified: true,
    });
  };
  