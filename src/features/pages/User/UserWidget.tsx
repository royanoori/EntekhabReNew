import { Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const CreateItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex items-center justify-between pb-2 w-full">
      <Typography variant="body2">{title}</Typography>
      <Typography variant="caption">{value}</Typography>
    </div>
  );
};
function UserWidget() {
  return (
    <Paper className="!shadow-none p-3 flex flex-col justify-center items-center w-full rounded-md gap-3">
      <div className="w-fit p-1 rounded-full border border-gray-300">
        <Image
          alt="علیرضا عطاری"
          src="/image/man.svg"
          width={130}
          height={130}
        />
      </div>
      <Typography variant="body1">علیرضا عطاری</Typography>
      <div className="flex flex-col gap-3 w-full mt-3">
        <CreateItem title="سمت" value="کارشناس نرم افزار" />
        <CreateItem title="آخرین ورود" value="25 مهر ماه 1404" />
      </div>
      <Button variant="contained" color="secondary">
        خروج
      </Button>
    </Paper>
  );
}

export default UserWidget;
