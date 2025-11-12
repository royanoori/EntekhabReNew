export interface ApiResponse<T> {
  IsSuccess: boolean;
  Message: string;
  Exception: string | null;
  Data: T;
}
export interface ContactInfo {
  ProvinceName: string | null;
  CityName: string | null;
  RegionName: string | null;
  ContactId: string;
  FirstName: string | null;
  LastName: string | null;
  Gender: number | null;
  PersonType: number | null;
  LegalPersonName: string | null;
  NationalCode: string | null;
  Phone: string | null;
  Mobile: string | null;
  RegionId: string | null;
  Latitude: number | null;
  Longitude: number | null;
  Address: string | null;
  BirthDate: string | null;
  PostalCode: string | null;
}
export interface Province {
  CrmId: string;
  Id: number;
  ProvinceName: string;
}
export interface City {
  CrmId: string;
  CityId: number;
  CityName: string;
}
export interface Region {
  RegionCrmId: string;
  RegionName: string;
}
export interface Brand {
  Id: number;
  CrmId: string;
  Name: string;
}
export interface Product {
  Id: number;
  CrmId: string;
  Name: string;
}

export interface CustomerData {
  ContactId: string;
  FirstName: string | null;
  LastName: string | null;
  Mobile: string | null;
  NationalCode: string | null;
  RegionId: string | null;
  Gender: number | null;
  Address: string | null;
  PostalCode: string | null;
}

export interface TCreateContact {
  ContactId: string;
  FirstName: string;
  LastName: string;
  Gender: number; // 0=مرد، 1=زن (طبق API شما)
  PersonType: number;
  LegalPersonName: string;
  NationalCode: string;
  Phone: string;
  Mobile: string;
  RegionId: string;
  Latitude: number;
  Longitude: number;
  Address: string;
  BirthDate: string; // ISO string (مثل: "2025-11-11T05:11:37.390Z")
  PostalCode: string;
}

export interface TProductRequest {
  ContactId: string;
  Product: string;
  Brand: string;
  ProductLife: number;
  ProductionConditions: number;
  AccessoryConditions: number;
  DesiredPrice: number;
}
export type TProductRequestList = TProductRequest[];
