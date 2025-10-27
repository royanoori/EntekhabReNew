"use client";
import { setCustomer } from "@/features/store/customerSlice";
import { ContactInfo } from "@/features/type/type";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";

interface CustomerDetailDialogProps {
  open: boolean;
  onClose: () => void;
  customer: ContactInfo;
}

const CreateItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex items-start gap-2 pb-2">
      <Typography variant="caption" className="text-gray-400 whitespace-nowrap">
        {title}:
      </Typography>
      <Typography variant="caption" className="text-justify flex-1">
        {value}
      </Typography>
    </div>
  );
};

function CustomerDetailDialog({
  open,
  onClose,
  customer,
}: CustomerDetailDialogProps) {
  const [tabIndex, setTabIndex] = useState(0); // 0 = اطلاعات, 1 = تاریخچه
  const dispatch = useDispatch();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="flex justify-between items-center !p-2">
        <span className="text-sm">اطلاعات مشتری</span>
        <IconButton onClick={onClose}>
          <CgClose size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <header className="flex w-full items-center gap-2">
          {customer.Gender && (
            <div className="w-2/12 relative">
              <Image
                alt={customer.FirstName || ""}
                src={customer.Gender === 1 ? "/image/1.svg" : "/image/2.svg"}
                width={0}
                height={0}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
          <div>
            <div className="mt-3 w-fit">
              <Typography variant="subtitle2">
                {customer.Gender === 1 ? "خانم" : "آقای"} {customer.FirstName}{" "}
                {customer.LastName}
              </Typography>
            </div>
            <Typography className="mt-2 text-gray-400" variant="caption">
              {customer.Mobile}
            </Typography>
          </div>
        </header>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 1 }}>
          <Tabs
            value={tabIndex}
            onChange={(_, newValue) => setTabIndex(newValue)}
          >
            <Tab label="اطلاعات" />
            <Tab label="تاریخچه" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <main className="flex-1 mt-3">
          {tabIndex === 0 ? (
            <Box className="px-2">
              <CreateItem
                title="جنسیت"
                value={customer.Gender === 0 ? "مرد" : "زن"}
              />
              <CreateItem title="کد ملی" value={customer.NationalCode || ""} />
              <CreateItem title="تلفن" value={customer.Phone || ""} />
              <CreateItem title="استان" value={customer.ProvinceName || ""} />
              <CreateItem title="شهر" value={customer.CityName || ""} />
              <CreateItem title="منطقه" value={customer.RegionName || ""} />
              <CreateItem title="آدرس" value={customer.Address || ""} />
            </Box>
          ) : (
            <Box className="text-center text-xs text-gray-400">
              تاریخچه‌ای موجود نیست
            </Box>
          )}
        </main>

        {/* Footer */}
        <footer className="flex justify-center pt-3">
          <Link href="/dashboard/add-product" passHref>
            <Button
              variant="contained"
              color="primary"
              className="!text-white"
              onClick={() => {
                dispatch(setCustomer(customer)); // ذخیره در Redux
                onClose();
              }}
            >
              ثبت کالای فرسوده
            </Button>
          </Link>
        </footer>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerDetailDialog;
