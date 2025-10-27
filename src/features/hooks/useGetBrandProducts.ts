import { useQuery } from "@tanstack/react-query";
import { getBrandProducts } from "../api/api";
import { Product } from "../type/type";

export const useGetBrandProducts = (
  brandId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<Product[], Error>({
    queryKey: ["getBrandProducts", brandId],
    queryFn: () => getBrandProducts(brandId),
    enabled: !!brandId,
    ...options,
  });
};
