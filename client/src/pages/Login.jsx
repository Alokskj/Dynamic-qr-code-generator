import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthProvider";

const Login = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(()=>{
    if(auth.user){
      navigate('/')
    }
  },[auth])
  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        console.log(email, password);
        const data = await fetch("http://localhost:3000/api/v1/auth/login", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        const res = await data.json();
        if(res.success){
            toast.success('User Logged in successfully')
            navigate('/')
        }
        else{
            toast.error(res.message)
        }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="container flex flex-col justify-center items-center min-h-screen">
      <div className="title h1 my-8">
        <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl lg:text-3xl capitalize">
          Login your account
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
            Login
          </button>
        </form>
        <div className="already-register flex gap-1 my-1 justify-end  tracking-tight">
          <p>Not registered yet?</p>
          <Link className="font-semibold text-blue-600" to="/register">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
