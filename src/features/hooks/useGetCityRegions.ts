import { useQuery } from "@tanstack/react-query";
import { getCityRegions } from "../api/api";
import { Region } from "../type/type";

export const useGetCityRegions = (
  cityId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<Region[], Error>({
    queryKey: ["getCityRegions", cityId],
    queryFn: () => getCityRegions(cityId),
    enabled: !!cityId,
    ...options,
  });
};
