"use client";

import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const createRtlCache = () =>
  createCache({
    key: "mui-rtl", // کلید cache برای RTL
    stylisPlugins: [prefixer, rtlPlugin],
    prepend: true, // این باعث میشه استایل‌های MUI بالاتر از بقیه قرار بگیرن
  });

export default createRtlCache;
