"use client";
import {
  IconButton,
  InputBase,
  CircularProgress,
  Paper,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TiDelete } from "react-icons/ti";
import { useGetContactsByMobile } from "@/features/hooks/useGetContactInfo";
import { ContactInfo } from "@/features/type/type";
import CustomerCard from "./CustomerCard";
import { PersonAdd } from "@mui/icons-material";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearCustomer, setCustomer } from "@/features/store/customerSlice";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [menuWidth, setMenuWidth] = useState<number | null>(null);

  const { data, isLoading, isSuccess } = useGetContactsByMobile(
    submittedValue,
    {
      enabled: !!submittedValue,
    }
  );

  // گرفتن عرض Box برای هماهنگ‌سازی منو
  useEffect(() => {
    if (boxRef.current) {
      setMenuWidth(boxRef.current.offsetWidth);
    }
  }, [boxRef.current]);

  // وقتی Enter زده شد
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(clearCustomer());
    e.preventDefault();
    const value = searchValue.trim();
    if (!value) return;
    setSubmittedValue(value);
    setAnchorEl(boxRef.current); // منو باز کن
  };

  // وقتی روی input کلیک کرد
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (submittedValue) {
      setAnchorEl(boxRef.current); // فقط اگه قبلاً جستجو انجام شده باشه
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClear = () => {
    setSearchValue("");
    setSubmittedValue("");
    handleClose();
  };
  const dispatch = useDispatch();

  const handleAddNewCustomer = () => {
    if (searchValue.trim()) {
      dispatch(setCustomer({ Mobile: searchValue.trim() }));
    }
    handleClose(); // بستن منو
  };

  return (
    <Box ref={boxRef} className="w-full flex flex-col items-center relative">
      <Paper
        component="form"
        onSubmit={handleSubmit}
        className="flex items-center w-full !rounded-lg p-1 !shadow-md"
      >
        <InputBase
          placeholder="جستجو مشتری"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={handleClick}
          className="flex-1 px-2"
          inputProps={{ "aria-label": "search" }}
          size="small"
        />
        <IconButton type="submit">
          {isLoading ? (
            <CircularProgress size="20px" className="text-gray-800" />
          ) : searchValue !== "" ? (
            <TiDelete onClick={handleClear} className="text-gray-800" />
          ) : (
            <SearchIcon className="text-gray-800" />
          )}
        </IconButton>
      </Paper>

      <Menu
        id="search-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: menuWidth ?? "auto",
              display: "flex",
              flexDirection: "column",
              p: 0,
              mt: 1,
              borderRadius: 2,
              overflow: "hidden", // جلوگیری از بیرون‌زدن محتوای اسکرول
            },
          },
        }}
      >
        {/* بخش نتایج */}
        <Box
          className="!overflow-x-hidden"
          sx={{
            flex: 1,
            width: "100%",
            overflowY: "auto",
            maxHeight: 280, // ارتفاع اسکرول
          }}
        >
          {isLoading && (
            <MenuItem className="!flex !justify-center" disabled>
              در حال جستجو...
            </MenuItem>
          )}

          {isSuccess && data && data.length > 0
            ? data.map((contact: ContactInfo, index) => (
                <CustomerCard key={index} user={contact} />
              ))
            : isSuccess &&
              data?.length === 0 && (
                <MenuItem className="!flex !justify-center" disabled>
                  موردی یافت نشد
                </MenuItem>
              )}
        </Box>
        <Box
          className="flex justify-center"
          sx={{
            p: 1,
            position: "sticky",
            bottom: 0,
            textAlign: "center",
          }}
        >
          <div className="w-full">
            <Link href="/dashboard/add-product" passHref>
              <Button
                fullWidth
                startIcon={<PersonAdd />}
                variant="contained"
                color="secondary"
                onClick={handleAddNewCustomer}
              >
                افزودن مشتری جدید
              </Button>
            </Link>
          </div>
        </Box>
      </Menu>
    </Box>
  );
}

export default Search;
