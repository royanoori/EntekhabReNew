"use client";

import { useGetBrandProducts } from "@/features/hooks/useGetBrandProducts";
import { useGetBrandsForService } from "@/features/hooks/useGetBrandsForService";
import { addProduct } from "@/features/store/productListSlice";
import { Brand, Product } from "@/features/type/type";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CustomerFormData } from "../formSchema";
import { lifetimes, statuses, parts } from "../../../store/questions";

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
  const selectedBrand = useWatch({ control, name: "Brand" });
  const { data: Products = [] } = useGetBrandProducts(selectedBrand);

  const productFields: (keyof CustomerFormData)[] = [
    "Brand",
    "Product",
    "ProductLife",
    "ProductionConditions",
    "AccessoryConditions",
  ];

  const handleAdd = async () => {
    // ✅ بررسی صحت فیلدها
    const valid = await trigger(productFields);
    if (!valid) return;

    // ✅ گرفتن مقدارها
    const values = getValues();

    // ✅ پیدا کردن نام برند و محصول
    const brandObj = Brands.find(
      (b: Brand) => b.Id.toString() === values.Brand
    ) ?? {
      Id: "",
      CrmId: "",
      Name: "",
    };

    const productObj = Products.find(
      (p: Product) => p.Id.toString() === values.Product
    ) ?? {
      Id: "",
      CrmId: "",
      Name: "",
    };

    // ✅ ساخت آبجکت نهایی برای dispatch
    const valuesObj = {
      BrandId: brandObj.Id.toString(),
      BrandCrmId: brandObj.CrmId.toString(),
      BrandName: brandObj.Name,
      ProductId: productObj.Id.toString(),
      ProductCrmId: productObj.CrmId.toString(),
      ProductName: productObj.Name,
      ProductLife: values.ProductLife ?? "",
      ProductionConditions: values.ProductionConditions ?? "",
      AccessoryConditions: values.AccessoryConditions ?? "",
    };

    dispatch(addProduct(valuesObj));

    productFields.forEach((field) => resetField(field));
  };

  return (
    <Box className="flex flex-col lg:flex-row items-center lg:items-start gap-6 ">
      <div className="w-full lg:w-11/12">
        <div className="grid lg:grid-cols-5 grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-3">
          {/* برند */}
          <Controller
            name="Brand"
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
                  setValue("Product", "");
                }}
                helperText={errors.Brand?.message ?? ""}
                error={!!errors.Brand}
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
            name="Product"
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
                error={!!errors.Product}
                helperText={errors.Product?.message ?? ""}
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
            name="ProductLife"
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
                error={!!errors.ProductLife}
                helperText={errors.ProductLife?.message ?? ""}
              >
                <MenuItem value="">انتخاب عمر</MenuItem>
                {lifetimes.map((l) => (
                  <MenuItem key={l.id} value={l.id}>
                    {l.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* وضعیت */}
          <Controller
            name="ProductionConditions"
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
                error={!!errors.ProductionConditions}
                helperText={errors.ProductionConditions?.message ?? ""}
              >
                <MenuItem value="">انتخاب وضعیت</MenuItem>
                {statuses.map((s, idx) => (
                  <MenuItem key={idx} value={s.id}>
                    {s.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* قطعات */}
          <Controller
            name="AccessoryConditions"
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
                error={!!errors.AccessoryConditions}
                helperText={errors.AccessoryConditions?.message ?? ""}
              >
                <MenuItem value="">انتخاب قطعه</MenuItem>
                {parts.map((p, idx) => (
                  <MenuItem key={idx} value={p.id}>
                    {p.label}
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
          color="secondary"
          onClick={handleAdd}
        >
          افزودن
        </Button>
      </div>
    </Box>
  );
};

export default FormAddProduct;
