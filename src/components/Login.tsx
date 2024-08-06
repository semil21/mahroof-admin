"use client";
import React from "react";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => handleLogin()}
      >
        Sign in
      </button>
    </>
  );
};

export default Login;
