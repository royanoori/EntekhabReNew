import { useQuery } from "@tanstack/react-query";
import { getBrandsForService, getCityRegions } from "../api/api";
import { Brand, Region } from "../type/type";

export const useGetBrandsForService = (options?: { enabled?: boolean }) => {
  return useQuery<Brand[], Error>({
    queryKey: ["getCityRegions"],
    queryFn: () => getBrandsForService(2),
    enabled: true,
    ...options,
  });
};
