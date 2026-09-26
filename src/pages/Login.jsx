import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="flex justify-between items-center pt-30 pb-5 px-10">
      <div className="w-[400px] h-[227px] max-md:hidden">
        <p className="text-[#C7C7C7] font-semibold">
          YOUR NEXT GREAT MOVIE STARTS HERE
        </p>
        <h1 className="text-[#FFFFFF] text-[48px] font-semibold">
          Welcome back to the big screen.
        </h1>
        <p className="text-[#BFBFBF] font-normal">
          Your next cinema night is waiting. Sign in to book your next movie.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
