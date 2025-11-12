import { useMutation } from "@tanstack/react-query";
import { createWebContact } from "../api/api";
import { ContactInfo, CustomerData, TCreateContact } from "../type/type";

export const useCreateWebContact = (options?: {
  onSuccess?: (data: string) => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation<string, Error, CustomerData>({
    mutationFn: (customer) => {
      if (!customer) {
        throw new Error("No customer selected");
      }

      const payload: TCreateContact = {
        ContactId: "",
        FirstName: customer.FirstName!,
        LastName: customer.LastName!,
        Gender: customer.Gender!,
        PersonType: 0,
        LegalPersonName: "string",
        NationalCode: customer.NationalCode!,
        Phone: "",
        Mobile: customer.Mobile!,
        RegionId: customer.RegionId!,
        Latitude: 0,
        Longitude: 0,
        Address: customer.Address!,
        BirthDate: "2025-11-11T05:11:37.390Z",
        PostalCode: customer.PostalCode!,
      };

      return createWebContact(payload);
    },
    ...options,
  });
};
