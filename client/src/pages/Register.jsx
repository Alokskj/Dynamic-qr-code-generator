import { useAuth } from "@/contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = user.firstName + " " + user.lastName
    await auth.register(name,user.email,user.password);
    navigate('/login')
  };
  const handleGoogleSignIn = async (credential) => {
    const decoded = jwtDecode(credential);
    const { name, email, picture } = decoded;
    await auth.signinWithGoogle(name, email, picture);
  };
  return (
    <div className="container flex flex-col justify-center items-center min-h-screen">
      <Card className=" max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    required
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    required
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <div className="w-full">
                <GoogleLogin
                  useOneTap
                  width={300}
                  onSuccess={(credentialResponse) => {
                    handleGoogleSignIn(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
