import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../services/supabase";

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
      }

      setUser(user);
      setIsLoading(false);
    }

    getUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <div className="min-h-screen text-[#FFFFFF] pt-28 px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-3">Your profile</h1>
      <p className="text-[#FFFFFF]/70">
        A few details to make every cinema visit feel more like you.
      </p>

      <div className="flex justify-between">
        <div className="w-[280px] h-[348px] bg-[#FFFFFF]/3.5 border border-[#FFFFFF]/10 rounded-2xl "></div>
        <div></div>
      </div>
    </div>
  );
}

export default Profile;
