import { useState } from "react";
import { Link } from "react-router-dom";
import SpinnerMini from "../ui/SpinnerMini";
import { useLogin } from "../hooks/useLogin";
import { CircleAlert, LockKeyhole, Mail } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, reset } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    login({ email: email.trim(), password });
  }

  return (
    <form
      className="flex w-full max-w-[480px] flex-col rounded-3xl border border-white/10 bg-[#1A1D25]/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-9"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">Sign in</h1>
        <p className="text-sm leading-6 text-white/55">
          Good to see you. Let’s get you to the movies.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {error && (
            <p
              id="email-auth-error"
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs leading-5 text-red-200"
            >
              <CircleAlert className="mt-0.5 size-4 shrink-0" />
              <span>{error.message}</span>
            </p>
          )}
          <label className="text-[#E6E6E6] font-medium text-sm" htmlFor="email">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="w-6 h-6 stroke-[#A4A6B0]" />
            </div>
            <input
              className={`block h-12 w-full rounded-xl border bg-white/[0.04] py-3 pl-11 pr-3 text-white placeholder-white/40 transition focus:outline-none focus:ring-2 focus:ring-white/10 ${
                error
                  ? "border-red-400/60 focus:border-red-300"
                  : "border-white/20 focus:border-white/40"
              }`}
              type="email"
              id="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "email-auth-error" : undefined}
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                reset();
              }}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      <div className="mb-5 flex flex-col gap-2">
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
            className="block h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] py-3 pl-11 pr-4 text-white placeholder-white/40 transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/10"
            type="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              reset();
            }}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/70">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="size-4 cursor-pointer rounded border-white/20 accent-white"
          />
          <label htmlFor="remember" className="cursor-pointer">
            Remember me
          </label>
        </div>
        <Link to="#" className="hover:underline text-white/80">
          Forgot password?
        </Link>
      </div>
      <div className="mt-6">
        <button
          disabled={isLoading}
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-white font-semibold text-[#0D0D0D] transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1D25] disabled:cursor-wait disabled:opacity-60"
        >
          {!isLoading ? "Sign in" : <SpinnerMini />}
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-white/60">
        New to TAJ Cinemas?{" "}
        <Link to="/Register" className="font-medium text-white underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
