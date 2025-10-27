import AppBarHeader from "@/components/AppBar/AppBarHeader";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex h-screen w-screen lg:px-4 !overflow-hidden">
      <Box className="flex flex-col p-2 h-full w-full ">
        <AppBarHeader />
        <main className="flex-1 w-full pt-5 overflow-hidden">{children}</main>
      </Box>
    </Box>
  );
}
