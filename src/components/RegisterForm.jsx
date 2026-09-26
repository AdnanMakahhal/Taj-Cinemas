import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import SpinnerMini from "../ui/SpinnerMini";
import { LockKeyhole, Mail, UserRound } from "lucide-react";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading } = useRegister();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName || !email || !password) return;
    register(
      { fullName, email, password },
      {
        onSettled: () => {
          setFullName("");
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <form
      className="max-w-[480px] max-h-[657px] bg-[#1A1D25]/68 flex flex-col p-9 border rounded-[24px] border-[#FFFFFF]/12 shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xs"
      onSubmit={handleSubmit}
    >
      <div className="mb-8">
        <h1 className="text-[#FFFFFF] font-semibold text-2xl mb-2">
          Create your account
        </h1>
        <p className="text-[#9E9E9E] font-normal text-sm">
          Your next cinema night starts here.
        </p>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <label
            className="text-[#E6E6E6] font-medium text-sm"
            htmlFor="fullName"
          >
            Full name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <UserRound className="w-6 h-6 stroke-[#A4A6B0]" />
            </div>
            <input
              className="w-full h-[52px] block rounded-[10px] border border-white/20 bg-white/3.5 pr-3 pl-11 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              autoComplete="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#E6E6E6] font-medium text-sm" htmlFor="email">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="w-6 h-6 stroke-[#A4A6B0]" />
            </div>
            <input
              className="w-full h-[52px] block rounded-[10px] border border-white/20 bg-white/3.5 pr-3 pl-11 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
              type="email"
              id="email"
              placeholder="you@example.com"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-[#E6E6E6] font-medium text-sm"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockKeyhole className="w-6 h-6 stroke-[#A4A6B0]" />
            </div>
            <input
              className="w-full h-[52px] block rounded-[10px] border border-white/20 bg-white/3.5 pr-4 pl-11 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
              type="password"
              id="password"
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <p className="text-white/60 text-xs mt-1">
            Use at least 8 characters.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 my-4">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 rounded cursor-pointer"
        />
        <label htmlFor="terms" className="text-white/70 text-sm cursor-pointer">
          I agree to the Terms of Service and Privacy Policy.
        </label>
      </div>

      <div className="mt-auto">
        <button
          disabled={isLoading}
          className="w-full h-[52px] rounded-[10px] bg-[#FFFFFF] text-[#0D0D0D] font-medium hover:bg-[#FFFFFF]/80 cursor-pointer disabled:opacity-50 transition-all delay-100 flex items-center justify-center"
        >
          {!isLoading ? "Create Account" : <SpinnerMini />}
        </button>
      </div>
      <p className="text-center text-white/70 text-sm mt-4">
        Already have an account?{" "}
        <Link to="/Login" className="text-white hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
