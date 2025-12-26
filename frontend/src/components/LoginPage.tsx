import { useState } from 'react';
import {Mail, Lock } from 'lucide-react';
import Logo from '../assets/logo1.svg?react';
import api from "../api/axios";

type LoginPageProps = {
    onGoogleLogin: () => void;
    onLoginSuccess: () => void;
    onGoToSignup: () => void;
    onBackToHome: () => void;   // 👈 NEW
  };
  

  export function LoginPage({
    onGoogleLogin,
    onLoginSuccess,
    onGoToSignup,
    onBackToHome,
  }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


const handleEmailLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    onLoginSuccess();
  } catch (err: any) {
    alert(err.response?.data?.message || "Login failed");
  }
};


//   const handleGoogleLogin = () => {
//     // 🔐 Later: Google OAuth
//     console.log('Google login');
//     onLoginSuccess();
//   };

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
          Welcome back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Log in to continue your healthy journey
        </p>

        {/* Google Login */}
        <button
          onClick={onGoogleLogin}
          className="w-full border border-gray-300 rounded-lg py-3 mb-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
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

        {/* Email Login */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-green-600"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-green-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{' '}
          <button
            onClick={onGoToSignup}
            className="text-green-600 hover:underline"
          >
            Sign up
          </button>
        </p>
        {/* 👇 Back to Home */}
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
