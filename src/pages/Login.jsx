import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 pb-8 pt-24 sm:px-8 lg:px-12">
      <div className="grid w-full max-w-6xl items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(360px,480px)] lg:gap-16">
        <div className="hidden max-w-lg md:block">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/55">
            YOUR NEXT GREAT MOVIE STARTS HERE
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white lg:text-5xl">
            Welcome back to the big screen.
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-white/60">
            Your next cinema night is waiting. Sign in to book your next movie.
          </p>
        </div>
        <div className="flex w-full justify-center md:justify-end">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default Login;
