"use client";
import {
  IconButton,
  InputBase,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useGetContactInfo } from "@/features/hooks/useGetContactInfo";
import { ContactInfo } from "@/features/type/type";
import CustomerCard from "./CustomerCard";
import { TiDelete } from "react-icons/ti";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [submittedMobile, setSubmittedMobile] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // کنترل باز و بسته بودن

  const { data, isLoading, isSuccess } = useGetContactInfo(submittedMobile, {
    enabled: !!submittedMobile,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsDropdownOpen(false); // وقتی تایپ می‌کنه، لیست بسته باشه
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedMobile(searchValue.trim());
    setIsDropdownOpen(true); // بعد از سابمیت، لیست باز بشه
  };

  const handleInputClick = () => {
    // وقتی روی Input کلیک شد، لیست عکس حالت فعلی میشه
    if (submittedMobile) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      <Paper
        component="form"
        onSubmit={handleSubmit}
        className="flex items-center w-full !rounded-lg p-1 !shadow-md"
      >
        <InputBase
          placeholder="جستجو مشتری"
          value={searchValue}
          onChange={handleChange}
          onClick={handleInputClick} // کنترل باز و بسته شدن
          className="flex-1 px-2"
          inputProps={{ "aria-label": "search" }}
          size="small"
        />
        <IconButton type="submit">
          {isLoading ? (
            <CircularProgress size="20px" />
          ) : searchValue !== "" ? (
            <TiDelete
              onClick={() => {
                setSearchValue("");
                setIsDropdownOpen(false); // پاک کردن Input => لیست بسته شود
              }}
            />
          ) : (
            <SearchIcon />
          )}
        </IconButton>
      </Paper>

      {submittedMobile && isDropdownOpen && (
        <Paper className="absolute top-13 w-full !shadow-md !rounded-lg overflow-hidden z-50 dark:!bg-neutral-900">
          <div className="w-full h-full overflow-y-auto flex flex-col max-h-64">
            {isLoading && (
              <div className="p-4 text-center text-gray-500">
                در حال جستجوی مشتری...
              </div>
            )}

            {isSuccess && data && data.length > 0 ? (
              data.map((contact: ContactInfo, index) => (
                <div key={contact.ContactId} className="cursor-pointer">
                  <CustomerCard user={contact} />
                  {index !== data.length - 1 && <Divider variant="fullWidth" />}
                </div>
              ))
            ) : isSuccess && data?.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                موردی یافت نشد
              </div>
            ) : null}
          </div>
        </Paper>
      )}
    </div>
  );
}

export default Search;
