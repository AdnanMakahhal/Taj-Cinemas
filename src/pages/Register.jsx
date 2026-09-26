import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <div className="flex justify-between items-center pt-30 pb-5 px-10">
      <div className="w-[344px] h-[227px] max-md:hidden">
        <p className="text-[#C7C7C7] font-semibold">
          YOUR NEXT GREAT MOVIE STARTS HERE
        </p>
        <h1 className="text-[#FFFFFF] text-[48px] font-semibold">
          Great stories. Better together.
        </h1>
        <p className="text-[#BFBFBF] font-normal">
          Create your account and make your next cinema night one to remember.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}

export default Register;
