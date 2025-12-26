import { useState } from "react";
import {  User, Lock } from "lucide-react";
import Logo from '../assets/logo1.svg?react';
import api from "../api/axios";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";


type SignupPageProps = {
  onGoogleSignup: () => void;
  onSignupSuccess: (page: "onboarding" | "mealfeed") => void;
  onGoToLogin: () => void;
  onBackToHome: () => void;
};

export function SignupPage({
  onGoogleSignup,
  onSignupSuccess,
  onGoToLogin,
  onBackToHome,
}: SignupPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [robotChecked, setRobotChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [lastVerifiedEmail, setLastVerifiedEmail] = useState("");
  const { setUser } = useUser();

  useEffect(() => {
    if (email.trim() !== lastVerifiedEmail) {
      setEmailVerified(false);
      setOtpSent(false);
      setOtp("");
    }
  }, [email, lastVerifiedEmail]);
  


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
  
    if (!emailVerified || email.trim() !== lastVerifiedEmail) {
        setErrorMessage("Please verify your email first");
        return;
      }
  
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
  
    if (!robotChecked) {
      setErrorMessage("Please confirm you are not a robot.");
      return;
    }
  
    try {
      const res = await api.post("/auth/signup", {
        name: username,
        email,
        password,
      });
  
      const { token,user } = res.data;
  
      // ✅ Save token
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);

      // optional: persist user
      localStorage.setItem("user", JSON.stringify(user));
      // ✅ Go to onboarding (new user)
      onSignupSuccess("onboarding");
    } catch (err: any) {
      const data = err.response?.data;
  
      if (data?.type === "GOOGLE_ACCOUNT") {
        setErrorMessage(
          "This email is already registered via Google. Please sign in using Google."
        );
      } else {
        setErrorMessage(data?.message || "Signup failed. Please try again.");
      }
    }
  };
  
  


  const handleSendOtp = async () => {
    setErrorMessage("");
  
    if (!email) {
      setErrorMessage("Please enter an email");
      return;
    }
  
    try {
      setLoading(true);
  
      // ✅ STEP 1: CHECK EMAIL FIRST
      await api.post("/auth/check-email", { email });
  
      // ✅ STEP 2: ONLY IF CHECK PASSES → SEND OTP
      await api.post("/auth/send-otp", { email });
  
      setOtpSent(true);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  
const handleVerifyOtp = async () => {
    if (otp.length !== 6 || verifyingOtp) return;
  
    try {
      setVerifyingOtp(true); // 🔒 lock button
  
      await api.post("/auth/verify-otp", {
        email: email.trim(),
        otp: otp.trim(),
      });
  
      // ✅ SUCCESS
      setEmailVerified(true);
  
      // ✅ VERY IMPORTANT: remember WHICH email was verified
      setLastVerifiedEmail(email.trim());
  
      setOtpSent(false); // hide OTP field
      setOtp("");        // clear OTP input
    } catch (err: any) {
      // ❌ invalid otp
      setEmailVerified(false);
    } finally {
      setVerifyingOtp(false); // 🔓 unlock button
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          <Logo className="w-8 h-8 text-green-600" />
          <span className="text-3xl font-semibold tracking-tight">
            <span className="text-green-600">Diet</span>
                <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                    Sync
                </span>
            </span>
        </div>

        <h2 className="text-2xl text-center mb-2">
          Create your account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Start your personalized nutrition journey
        </p>

        {/* Google Signup */}
        <button
          onClick={onGoogleSignup}
          className="w-full border border-gray-300 rounded-lg py-3 mb-4
                     flex items-center justify-center gap-2
                     hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email Signup */}
        <form onSubmit={handleSignup} className="space-y-4">
          
          {/* Username */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg
                           focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
  <label className="text-sm text-gray-600 mb-1 block">Email</label>

  <div className="flex gap-2">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={emailVerified}
      className="flex-1 px-4 py-3 border rounded-lg"
      placeholder="you@example.com"
      required
    />

    {!emailVerified && (
      <button
        type="button"
        onClick={handleSendOtp}
        disabled={!email || loading}
        className="px-4 py-3 bg-green-600 text-white rounded-lg"
      >
        {loading ? "Sending..." : "Verify Email"}
      </button>
    )}
  </div>

  {emailVerified && (
    <p className="text-green-600 text-sm mt-1">✔ Email verified</p>
  )}
</div>

{/* otp */}

{otpSent && !emailVerified && (
  <div>
    <label className="text-sm text-gray-600 mb-1 block">OTP</label>

    <div className="flex gap-2">
        <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
            }
            className="flex-1 px-4 py-3 border rounded-lg"
            placeholder="Enter 6-digit OTP"
        />


<button
  type="button"
  onClick={handleVerifyOtp}
  disabled={otp.length !== 6 || verifyingOtp}
  className="px-4 py-3 bg-blue-600 text-white rounded-lg"
>
  {verifyingOtp ? "Verifying..." : "Verify OTP"}
</button>

    </div>
  </div>
)}


          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg
                           focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg
                           focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Fake reCAPTCHA (frontend placeholder) */}
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={robotChecked}
              onChange={() => setRobotChecked(!robotChecked)}
              className="accent-green-600"
            />
            I am not a robot
          </label>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={!emailVerified}
            className={`w-full py-3 rounded-lg text-white transition ${
                emailVerified
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            >
            Create Account
          </button>
          {errorMessage && (
  <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
    {errorMessage}
  </p>
  
)}
{errorMessage.includes("Google") && (
  <button
    onClick={onGoogleSignup}
    className="w-full mt-2 border border-gray-300 rounded-lg py-3
               flex items-center justify-center gap-2
               hover:bg-gray-50 transition"
  >
    <img
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      className="w-5 h-5"
    />
    Sign in with Google
  </button>
)}

        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={onGoToLogin}
            className="text-green-600 hover:underline"
          >
            Sign in
          </button>
        </p>
        <button
        onClick={onBackToHome}
        className="mt-6 w-full text-sm text-gray-500 hover:text-green-600 transition-colors"
        >
        ← Back to home
        </button>
      </div>
    </div>
  );
}
