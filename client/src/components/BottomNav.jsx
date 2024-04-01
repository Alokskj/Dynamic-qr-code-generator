import {
  CirclePlus,
  CircleUserRound,
  HomeIcon,
  QrCode,
  ScanLine,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const NAV_LINKS = [
  { label: "home", href: "/", icon: <HomeIcon /> },
  { label: "Scan", href: "/scan", icon: <ScanLine /> },
  { label: "Generate", href: "/generate", icon: <CirclePlus /> },
  { label: "Qr codes", href: "/qr-codes", icon: <QrCode /> },
  { label: "Profile", href: "#", icon: <CircleUserRound /> },
];
const BottomNav = () => {
  return (
    <ul className="fixed lg:hidden bottom-5 inset-x-5 flex justify-between items-center h-16  bg-[#0F172A] rounded-xl font-medium ">
      {NAV_LINKS.map((link) => {
        return (
          <li key={link.label}>
            <Link to={link.href}>
              <Button className="capitalize text-white" variant="link">
                {link.icon}
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default BottomNav;
