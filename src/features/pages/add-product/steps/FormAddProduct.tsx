"use client";

import { useGetBrandProducts } from "@/features/hooks/useGetBrandProducts";
import { useGetBrandsForService } from "@/features/hooks/useGetBrandsForService";
import { addProduct } from "@/features/store/productListSlice";
import { Brand, Product } from "@/features/type/type"; // 👈 فرض بر این است که هر دو type در این فایل تعریف شده‌اند
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CustomerFormData } from "../formSchema";

const lifetimes = ["کمتر از 1 سال", "1-3 سال", "3-5 سال", "بیشتر از 5 سال"];
const statuses = ["نو", "کارکرده", "فرسوده"];
const parts = ["قطعه 1", "قطعه 2", "قطعه 3"];

const FormAddProduct = () => {
  const dispatch = useDispatch();
  const {
    control,
    setValue,
    formState: { errors },
    trigger,
    getValues,
    resetField,
  } = useFormContext<CustomerFormData>();

  const { data: Brands = [], isLoading: isLoadingBrands } =
    useGetBrandsForService();
  const selectedBrand = useWatch({ control, name: "brand" });
  const { data: Products = [] } = useGetBrandProducts(selectedBrand);

  const productFields: (keyof CustomerFormData)[] = [
    "brand",
    "product",
    "lifetime",
    "status",
    "parts",
  ];

  const handleAdd = async () => {
    // ✅ بررسی صحت فیلدها
    const valid = await trigger(productFields);
    if (!valid) return;

    // ✅ گرفتن مقدارها
    const values = getValues();

    // ✅ پیدا کردن نام برند و محصول
    const brandObj = Brands.find(
      (b: Brand) => b.Id.toString() === values.brand
    ) ?? {
      Id: "",
      Name: "",
    };

    const productObj = Products.find(
      (p: Product) => p.Id.toString() === values.product
    ) ?? {
      Id: "",
      Name: "",
    };

    // ✅ ساخت آبجکت نهایی برای dispatch
    const valuesObj = {
      brandId: brandObj.Id.toString(),
      brandName: brandObj.Name,
      productId: productObj.Id.toString(),
      productName: productObj.Name,
      lifetime: values.lifetime ?? "",
      status: values.status ?? "",
      parts: values.parts ?? "",
    };

    dispatch(addProduct(valuesObj));

    productFields.forEach((field) => resetField(field));
  };

  return (
    <Box className="flex flex-col lg:flex-row items-center lg:items-start gap-6 p-4">
      <div className="w-full lg:w-11/12">
        <div className="grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-3">
          {/* برند */}
          <Controller
            name="brand"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                select
                label="برند"
                size="small"
                variant="outlined"
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setValue("product", "");
                }}
                helperText={errors.brand?.message ?? ""}
                error={!!errors.brand}
                disabled={isLoadingBrands}
              >
                <MenuItem value="">انتخاب برند</MenuItem>
                {Brands.map((b) => (
                  <MenuItem key={b.Id} value={b.Id.toString()}>
                    {b.Name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* محصول */}
          <Controller
            name="product"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                select
                label="محصول"
                size="small"
                variant="outlined"
                fullWidth
                {...field}
                disabled={!selectedBrand || Products.length === 0}
                error={!!errors.product}
                helperText={errors.product?.message ?? ""}
              >
                <MenuItem value="">انتخاب محصول</MenuItem>
                {Products.map((p) => (
                  <MenuItem key={p.Id} value={p.Id.toString()}>
                    {p.Name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* عمر */}
          <Controller
            name="lifetime"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                select
                label="عمر"
                size="small"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.lifetime}
                helperText={errors.lifetime?.message ?? ""}
              >
                <MenuItem value="">انتخاب عمر</MenuItem>
                {lifetimes.map((l, idx) => (
                  <MenuItem key={idx} value={l}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* وضعیت */}
          <Controller
            name="status"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                select
                label="وضعیت"
                size="small"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.status}
                helperText={errors.status?.message ?? ""}
              >
                <MenuItem value="">انتخاب وضعیت</MenuItem>
                {statuses.map((s, idx) => (
                  <MenuItem key={idx} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* قطعات */}
          <Controller
            name="parts"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                select
                label="قطعات"
                size="small"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.parts}
                helperText={errors.parts?.message ?? ""}
              >
                <MenuItem value="">انتخاب قطعه</MenuItem>
                {parts.map((p, idx) => (
                  <MenuItem key={idx} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
      </div>
      <div className="lg:w-1/12 w-3/12 md:1/12">
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleAdd}
        >
          افزودن
        </Button>
      </div>
    </Box>
  );
};

export default FormAddProduct;
