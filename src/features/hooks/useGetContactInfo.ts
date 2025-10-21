import { useQuery } from "@tanstack/react-query";
import { getContactInfo } from "../api/api";
import { ContactInfo } from "../type/type";

export const useGetContactInfo = (
  mobile: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<ContactInfo[], Error>({
    queryKey: ["getContactInfo", mobile],
    queryFn: () => getContactInfo(mobile),
    enabled: !!mobile, // وقتی مقدار موبایل وجود دارد اجرا شود
    ...options,
  });
};
