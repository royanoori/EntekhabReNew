export interface ContactInfo {
  FirstName: string;
  LastName: string;
  Mobile: string;
  NationalCode: string;
  ProvinceName: string;
  ProvinceCrmId: string;
  CityName: string;
  CityCrmId: string;
  Address: string;
  Salutation: string;
  InfoSource: number;
  ContactId: string;
  IsActive: boolean;
  PostalCode: string;
  HomePhone: string;
  NeighborhoodId_StreetId: string;
  NeighborhoodId: string;
  StreetId: string | null;
  CityAreaId: string | null;
  NeighborhoodId_StreetName: string | null;
  AreaName: string;
  StreetName: string;
}
