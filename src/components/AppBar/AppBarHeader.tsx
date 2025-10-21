import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { IoNotifications } from "react-icons/io5";
import { Button } from "@mui/material";
import Search from "@/features/pages/search/Search";

function AppBarHeader() {
  return (
    <>
      <div className="w-full flex items-center justify-between h-14 ">
        <Image
          alt="logo"
          src="/Logo.svg"
          width={100}
          height={100}
          className="h-full lg:w-auto sm:w-3/12 w-5/12"
        />
        <div className="lg:w-4/12 md:hidden hidden lg:block ">
          <Search />
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outlined" color="primary">
            بازگشت به کوانتوم
          </Button>
          <IoNotifications
            className="text-gray-500 dark:text-white"
            size={23}
          />
          <ThemeToggle />
        </div>
      </div>
      <div className="lg:hidden pt-3">
        <Search />
      </div>
    </>
  );
}

export default AppBarHeader;
