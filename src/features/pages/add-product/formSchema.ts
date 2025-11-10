import * as z from "zod";

export type CustomerFormData = {
  // اطلاعات مشتری
  firstName: string;
  lastName: string;
  mobile: string;
  nationalCode?: string | null;
  gender?: "مرد" | "زن" | "" | null;
  province?: string | null;
  city?: string | null;
  region?: string | null;
  address?: string | null;
  postalCode?: string | null;

  // اطلاعات محصول - الزامی
  Brand: string;
  Product: string;
  ProductLife: string;
  ProductionConditions: string;
  AccessoryConditions: string;
};

export const customerSchema = z.object({
  // اطلاعات مشتری
  firstName: z.string().nonempty("نام الزامی است"),
  lastName: z.string().nonempty("نام خانوادگی الزامی است"),
  mobile: z.string().nonempty("شماره موبایل الزامی است"),
  nationalCode: z.string().optional().nullable(),
  gender: z
    .union([z.literal("مرد"), z.literal("زن"), z.literal("")])
    .optional()
    .nullable(),
  province: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),

  // اطلاعات محصول - الزامی
  Brand: z.string().nonempty("انتخاب برند الزامی است"),
  Product: z.string().nonempty("انتخاب محصول الزامی است"),
  ProductLife: z.string().nonempty("انتخاب عمر الزامی است"),
  ProductionConditions: z.string().nonempty("انتخاب وضعیت الزامی است"),
  AccessoryConditions: z.string().nonempty("انتخاب قطعه الزامی است"),
});
