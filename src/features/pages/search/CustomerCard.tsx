"use client";
import { ContactInfo } from "@/features/type/type";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import UserDetailDialog from "./CustomerDetailDialog";

interface userprops {
  user: ContactInfo;
}

function CustomerCard({ user }: userprops) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        className="w-full h-full p-2"
        key={user.ContactId}
        onClick={() => setOpen(true)}
      >
        <div>
          <div className="flex items-center mb-2">
            <div className="flex-1 flex items-center gap-2 ">
              <div className="rounded-full w-fit border dark:border-neutral-700 p-1.5 dark:text-neutral-700 text-gray-300 border-gray-300">
                <FaUserLarge />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="subtitle2" className="text-nowrap">
                  {user.Salutation === "زن" ? "خانم" : "آقای"} {user.FirstName}{" "}
                  {user.LastName}
                </Typography>
              </div>
            </div>
            {user.NationalCode !== "" && (
              <div className="flex justify-end">
                <span className="bg-inherit border border-dashed border-secondary text-secondary rounded-sm p-1.5 text-xs font-extrabold">
                  {user.NationalCode}
                </span>
              </div>
            )}
          </div>
          <Typography variant="caption" color="textSecondary" className="!mt-3">
            استان: {user.ProvinceName} | شهر: {user.CityName} | منطقه:{" "}
            {user.AreaName} | آدرس: {user.Address}
          </Typography>
        </div>
      </Box>

      <UserDetailDialog
        open={open}
        onClose={() => setOpen(false)}
        customer={user}
      />
    </>
  );
}

export default CustomerCard;
