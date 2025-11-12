import { axiosInstance } from "@/lib/axiosInstance";
import {
  ApiResponse,
  Brand,
  City,
  ContactInfo,
  Product,
  Province,
  Region,
  TCreateContact,
  TProductRequestList,
} from "../type/type";

export const getContactsByMobile = async (
  mobile: string
): Promise<ContactInfo[]> => {
  const res = await axiosInstance.get<ApiResponse<ContactInfo[]>>(
    "/GetContactsByMobile",
    { params: { mobile } }
  );

  if (!res.data.IsSuccess) {
    throw new Error(res.data.Message || "خطای ناشناخته");
  }

  return res.data.Data;
};

export const getAllProvince = async (): Promise<Province[]> => {
  const res =
    await axiosInstance.get<ApiResponse<Province[]>>("/GetAllProvince");

  if (!res.data.IsSuccess) {
    throw new Error(res.data.Message || "خطای ناشناخته");
  }

  return res.data.Data;
};

export const getCities = async (provinceId: string): Promise<City[]> => {
  const res = await axiosInstance.get<ApiResponse<City[]>>("/GetCities", {
    params: { provinceId },
  });

  if (!res.data.IsSuccess) {
    throw new Error(res.data.Message || "خطای ناشناخته");
  }

  return res.data.Data;
};

export const getCityRegions = async (cityId: string): Promise<Region[]> => {
  const res = await axiosInstance.get<ApiResponse<Region[]>>(
    "/GetCityRegions",
    {
      params: { cityId },
    }
  );

  if (!res.data.IsSuccess) {
    throw new Error(res.data.Message || "خطای ناشناخته");
  }

  return res.data.Data;
};

export const getBrandsForService = async (
  serviceType: number
): Promise<Brand[]> => {
  const res = await axiosInstance.get<ApiResponse<Brand[]>>(
    "/GetBrandsForService",
    {
      params: { serviceType },
    }
  );

  if (!res.data.IsSuccess) {
    throw new Error(res.data.Message || "خطای ناشناخته");
  }

  return res.data.Data;
};

export const getBrandProducts = async (brandId: string): Promise<Product[]> => {
  const res = await axiosInstance.get<ApiResponse<Product[]>>(
    "/GetBrandProducts",
    {
      params: { brandId },
    }
  );

  if (!res.data.IsSuccess) {
    throw new Error(res.data.Message || "خطای ناشناخته");
  }

  return res.data.Data;
};

export const createWebContact = async (
  data: TCreateContact
): Promise<string> => {
  const res = await axiosInstance.post<ApiResponse<string>>(
    "/createWebContact",
    data
  );

  if (!res.data.IsSuccess) {
    throw new Error(res.data.Message || "خطای ناشناخته");
  }

  return res.data.Data;
};

export const createUsedProductPurchaseNew = async (
  data: TProductRequestList
): Promise<string> => {
  const res = await axiosInstance.post<ApiResponse<string>>(
    "/createUsedProductPurchaseNew",
    data
  );

  if (!res.data.IsSuccess) {
    throw new Error(res.data.Message || "خطای ناشناخته");
  }

  return res.data.Data;
};
