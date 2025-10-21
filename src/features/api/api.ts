import { axiosInstance } from "@/lib/axiosInstance";
import { ContactInfo } from "../type/type";

export const getContactInfo = (mobile: string, password = "cM@$c1") => {
  return axiosInstance
    .get<ContactInfo[]>("/GetContactInfo", { params: { mobile, password } })
    .then((res) => {
      if (!res.data) {
        throw new Error(res.data || "خطای ناشناخته");
      }
      return res.data;
    });
};
