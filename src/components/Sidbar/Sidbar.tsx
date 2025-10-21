"use client";
import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineMenuAlt3 } from "react-icons/hi";
import SidebarMenu from "./SidebarMenu";

function Sidbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState<boolean>(true); // دسکتاپ باز، موبایل بسته
  const toggleDrawer = () => setOpen(!open);
  return (
    <Box
      className={`h-full border-l border-gray-100 p-2 ${open ? "w-2/12  " : "w-14 bg-gray-100"} ${isMobile && "hidden"}`}
    >
      <header
        className={`flex h-14 items-center ${open ? "justify-start" : "justify-center border-b border-gray-200"}`}
      >
        {open ? (
          <HiOutlineMenuAlt3
            className="cursor-pointer"
            size={20}
            onClick={toggleDrawer}
          />
        ) : (
          <HiOutlineMenu
            className="cursor-pointer"
            size={20}
            onClick={toggleDrawer}
          />
        )}
      </header>
      <main>
        <SidebarMenu isOpen={open} />
      </main>
    </Box>
  );
}

export default Sidbar;
