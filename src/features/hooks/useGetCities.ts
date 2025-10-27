import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/api";
import { City } from "../type/type";

export const useGetCities = (
  provinceId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<City[], Error>({
    queryKey: ["getCities", provinceId],
    queryFn: () => getCities(provinceId),
    enabled: !!provinceId,
    ...options,
  });
};
