import { Box } from "@mui/material";
import Image from "next/image";

function Loading() {
  return (
    <Box className="dark:bg-black bg-white h-screen w-full flex justify-center items-center">
      <Image
        alt="logo"
        src="/Logo.svg"
        width={100}
        height={100}
        className="h-full lg:w-auto w-5/12 animate-[zoomIn_0.6s_ease-out_forwards]"
      />
    </Box>
  );
}

export default Loading;
