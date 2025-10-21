import { Box } from "@mui/material";
import Image from "next/image";

function Loading() {
  return (
    <Box className="dark:bg-black bg-white h-screen w-full flex justify-center items-center">
      <Image alt="logo" src="/Logo.svg" width={160} height={160} />
    </Box>
  );
}

export default Loading;
