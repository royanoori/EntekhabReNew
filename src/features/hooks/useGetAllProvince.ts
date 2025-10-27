import { useQuery } from "@tanstack/react-query";
import { getAllProvince } from "../api/api";
import { Province } from "../type/type";

export const useGetAllProvince = () => {
  return useQuery<Province[], Error>({
    queryKey: ["getAllProvince"],
    queryFn: () => getAllProvince(),
    enabled: true,
  });
};
