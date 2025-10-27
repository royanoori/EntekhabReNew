import { useQuery } from "@tanstack/react-query";
import { getContactsByMobile } from "../api/api";
import { ContactInfo } from "../type/type";

export const useGetContactsByMobile = (
  mobile: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<ContactInfo[], Error>({
    queryKey: ["getContactsByMobile", mobile],
    queryFn: () => getContactsByMobile(mobile),
    enabled: !!mobile,
    ...options,
  });
};
