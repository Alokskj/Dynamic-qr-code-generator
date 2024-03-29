import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        const data = await fetch("/api/v1/auth/register", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        const res = await data.json();
        if(res.success){
            toast.success('User registred successfully')
        }
        else{
            toast.error(res.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }

  };
  return (
    <div className="container flex flex-col justify-center items-center min-h-screen">
      <div className="title h1 my-8">
        <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl lg:text-3xl capitalize">
          Create your account
        </h1>
      </div>
      <div className="form-container w-80">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-y-4 items-center w-full"
        >
          <input
            className="border border-gray-300 bg-gray-50 text-gray-900 outline-blue-600  rounded-lg p-2.5 w-full"
            placeholder="Email"
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 bg-gray-50 text-gray-900 outline-blue-600 rounded-lg p-2.5 w-full"
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="px-6 py-3 flex w-full justify-center items-center rounded-lg bg-blue-600 text-white text-sm uppercase font-semibold">
            Register
          </button>
        </form>
        <div className="already-register flex gap-1 my-1 justify-end">
          <p>Already registered?</p>
          <Link
            className="font-semibold text-blue-600 tracking-tight"
            to="/login"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
