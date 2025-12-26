import nodemailer from "nodemailer";

export const sendOtpMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: "DietSync <no-reply@dietsync.com>",
    to: email,
    subject: "Verify your email",
    html: `<h3>Your OTP is <b>${otp}</b></h3>`
  });
};
