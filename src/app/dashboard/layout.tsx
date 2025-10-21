import AppBarHeader from "@/components/AppBar/AppBarHeader";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="flex h-screen w-full lg:px-4 !overflow-hidden">
      <Box className="flex-1 flex flex-col p-2 ">
        <AppBarHeader />
        <main className="flex-1 w-full pt-5">{children}</main>
      </Box>
    </Box>
  );
}
