"use client";
import { RootState } from "@/store/store";
import Image from "next/image";
import { IoNotifications } from "react-icons/io5";
import { PiUserDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";

function AppBarHeader() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  return (
    <div className="w-full flex items-center justify-between h-14">
      <div className="relative lg:w-32 w-24 h-12">
        <Image
          alt="logo"
          src={mode === "dark" ? "/LogoWhite.svg" : "/Logo.svg"}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <IoNotifications className="text-gray-600 dark:text-white" size={20} />
        <PiUserDuotone className="text-gray-600 dark:text-white" size={20} />
      </div>
    </div>
  );
}

export default AppBarHeader;
