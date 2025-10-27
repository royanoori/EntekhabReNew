import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { IoNotifications } from "react-icons/io5";
import { Button } from "@mui/material";
import Search from "@/features/pages/search/Search";

function AppBarHeader() {
  return (
    <>
      <div className="w-full flex items-center justify-between h-14 dark:bg-gray-200 px-2 py-4 rounded-md">
        <Image
          alt="logo"
          src="/Logo.svg"
          width={100}
          height={100}
          className="h-full lg:w-32 sm:w-22 w-20"
        />
        <div className="flex gap-2 items-center">
          <Button variant="outlined" color="primary">
            بازگشت به انتخاب سرویس
          </Button>
          <IoNotifications className="text-blue-950 " size={23} />
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export default AppBarHeader;
