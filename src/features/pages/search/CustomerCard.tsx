"use client";
import { ContactInfo } from "@/features/type/type";
import { Box, MenuItem, Typography } from "@mui/material";
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
      <MenuItem key={user.ContactId} onClick={() => setOpen(true)}>
        <div className="w-full">
          <div className="flex items-center mb-2">
            <div className="flex-1 flex items-center gap-2 ">
              <div className="rounded-full w-fit border p-1.5 text-gray-300 border-gray-300">
                <FaUserLarge />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="subtitle2" className="text-nowrap">
                  {user.Gender === 1 ? "خانم" : "آقای"} {user.FirstName}{" "}
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
          <Typography
            variant="caption"
            className="!mt-3 text-gray-500 w-full text-wrap"
          >
            استان: {user.ProvinceName} | شهر: {user.CityName} | منطقه:{" "}
            {user.RegionName} | آدرس: {user.Address}
          </Typography>
        </div>
      </MenuItem>

      <UserDetailDialog
        open={open}
        onClose={() => setOpen(false)}
        customer={user}
      />
    </>
  );
}

export default CustomerCard;
