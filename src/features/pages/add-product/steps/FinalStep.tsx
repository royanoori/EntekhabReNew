"use client";

import { RootState } from "@/store/store";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { CustomerFormData } from "../formSchema";

import { Alert, Box, Typography } from "@mui/material";
import { FaUser } from "react-icons/fa";
import ProductTable from "./ProductTable";

const FinalStep: React.FC = () => {
  const { getValues } = useFormContext<CustomerFormData>();
  const productList = useSelector(
    (state: RootState) => state.productList.items
  );

  const customerData = getValues();

  return (
    <Box className="w-full h-full flex flex-col text-black dark:text-white">
      <header className="mb-2">
        <Alert severity="warning">
          درصورت تایید اطلاعات زیر روی دکمه ثبت نهایی کلیک کنید
        </Alert>
      </header>
      <main className="flex gap-4 flex-1 flex-col lg:flex-row overflow-auto">
        <Box className="lg:w-4/12 w-full border-1 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-inherit flex flex-col gap-1 overflow-auto">
          <div className="flex flex-col gap-3 items-center">
            <div className="w-16 h-16 rounded-full flex justify-center items-center dark:bg-[#4e4e4e] bg-[#e5e5e5] text-[#7a7a7a] dark:text-white">
              <FaUser size={35} />
            </div>
            <Typography variant="body1">
              {Number(customerData.gender) === 1 ? "آقای" : "خانم"}{" "}
              {customerData.firstName} {customerData.lastName}
            </Typography>
          </div>
          {[
            { label: "کد ملی", value: customerData.nationalCode },
            { label: "موبایل", value: customerData.mobile },
            { label: "استان", value: customerData.province },
            { label: "شهر", value: customerData.city },
            { label: "آدرس", value: customerData.address },
            { label: "کدپستی", value: customerData.postalCode },
          ].map((field, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                gap: "2px",
                py: 0.5,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {field.label}:
              </Typography>
              <Typography variant="body2">{field.value || "-"}</Typography>
            </Box>
          ))}
        </Box>
        <Box className="lg:w-8/12 w-full rounded-lg dark:bg-inherit flex flex-col gap-1">
          <ProductTable readOnly={true} />
        </Box>
      </main>
    </Box>
  );
};

export default FinalStep;
