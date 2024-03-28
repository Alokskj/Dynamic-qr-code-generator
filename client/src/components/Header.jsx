import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthProvider";
const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "Generate", href: "#" },
  { label: "Qr codes", href: "#" },
  { label: "Profile", href: "#" },
];
const Header = () => {
  const auth = useAuth();
  return (
    <header className="py-3  border-b border-gray-400">
      <div className="container-max flex justify-between items-center">
        <div className="logo">
          <p className="text-3xl font-black">DynoQr</p>
        </div>
        <nav>
          <ul className="flex items-center gap-x-3 font-medium ">
            {NAV_LINKS.map((link) => {
              return (
                <li key={link.label}>
                  <Link to={link.href}>
                    <Button className="capitalize" variant="link">
                      {link.label}
                    </Button>
                  </Link>
                </li>
              );
            })}
            {!auth?.user && (
              <>
                <Link to="/register">
                  <Button variant="outline">Sign Up</Button>
                </Link>
                <Link to="/login">
                  <Button>Sign In</Button>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
