// lib/axiosInstance.ts
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/proxy",
  headers: { Accept: "application/json" }, // فقط هدر استاندارد
});

// هیچ نیازی به interceptor برای Caller-Id / Password نیست
// چون آنها فقط در Server Route اضافه می‌شوند
