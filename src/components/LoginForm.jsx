import { useState } from "react";
import { Link } from "react-router-dom";
import SpinnerMini from "../ui/SpinnerMini";
import { useLogin } from "../hooks/useLogin";
import { LockKeyhole, Mail } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
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
        <h1 className="text-[#FFFFFF] font-semibold text-2xl mb-2">Sign in</h1>
        <p className="text-[#9E9E9E] font-normal text-sm">
          Good to see you. Let’s get you to the movies.
        </p>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <label className="text-[#E6E6E6] font-medium text-sm" htmlFor="email">
          Email address
        </label>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Mail className="w-6 h-6 stroke-[#A4A6B0]" />
          </div>
          <input
            className="w-full h-[52px] block rounded-[10px] border border-white/20 bg-white/3.5 pr-3 pl-11 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
            type="email"
            id="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-3">
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
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="flex justify-between text-[#E6E6E6] text-sm">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="rounded border-white/20 cursor-pointer"
          />
          <label htmlFor="remember" className="cursor-pointer">
            Remember me
          </label>
        </div>
        <Link to="#" className="hover:underline text-white/80">
          Forgot password?
        </Link>
      </div>
      <div className="mt-4">
        <button
          disabled={isLoading}
          className="w-full h-[52px] rounded-[10px] bg-[#FFFFFF] text-[#0D0D0D] font-medium hover:bg-[#FFFFFF]/80 cursor-pointer disabled:opacity-50 transition-all delay-100 flex items-center justify-center"
        >
          {!isLoading ? "Sign in" : <SpinnerMini />}
        </button>
      </div>

      <p className="text-center text-white/70 text-sm mt-4">
        New to TAJ Cinemas?{" "}
        <Link to="/Register" className="text-white hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
