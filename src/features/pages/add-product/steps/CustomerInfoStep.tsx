"use client";

import React, { useEffect } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CustomerFormData } from "../formSchema";
import { TextField, MenuItem } from "@mui/material";
import { useGetAllProvince } from "@/features/hooks/useGetAllProvince";
import { useGetCities } from "@/features/hooks/useGetCities";
import { useGetCityRegions } from "@/features/hooks/useGetCityRegions";

const CustomerInfoStep = () => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<CustomerFormData>();

  const customer = useSelector(
    (state: RootState) => state.customer.selectedCustomer
  );

  const { data: provinces, isLoading: isProvincesLoading } =
    useGetAllProvince();

  const provinceValue = useWatch({ control, name: "province" });
  const cityValue = useWatch({ control, name: "city" });

  const { data: cities, isLoading: isCitiesLoading } = useGetCities(
    provinceValue ?? "",
    { enabled: !!provinceValue }
  );

  const { data: regions, isLoading: isRegionLoading } = useGetCityRegions(
    cityValue?.toString() ?? "",
    { enabled: !!cityValue }
  );

  // حالت‌ها
  const isExistingCustomer = !!customer?.FirstName; // مشتری قبلی
  const isNewCustomer = !!customer?.Mobile && !customer?.FirstName; // مشتری جدید

  const isFormDisabled = isExistingCustomer;
  const isMobileDisabled = !!customer?.Mobile;

  // پر کردن فرم
  useEffect(() => {
    if (!customer) return;

    // شماره موبایل همیشه پر و غیرقابل تغییر
    setValue("mobile", customer.Mobile ?? "");

    if (isExistingCustomer) {
      setValue("firstName", customer.FirstName ?? "");
      setValue("lastName", customer.LastName ?? "");
      setValue("nationalCode", customer.NationalCode ?? "");
      setValue(
        "gender",
        customer.Gender === 0 ? "مرد" : customer.Gender === 1 ? "زن" : ""
      );

      if (provinces) {
        const selectedProvince = provinces.find(
          (p) => p.ProvinceName === customer.ProvinceName
        );
        setValue("province", selectedProvince?.Id?.toString() ?? "");
      }

      if (cities && customer.CityName) {
        const selectedCity = cities.find(
          (c) => c.CityName === customer.CityName
        );
        setValue("city", selectedCity?.CityId?.toString() ?? "");
      }

      if (regions && customer.RegionName) {
        const selectedRegion = regions.find(
          (r) => r.RegionName === customer.RegionName
        );
        setValue("region", selectedRegion?.RegionCrmId?.toString() ?? "");
      }

      setValue("address", customer.Address ?? "");
      setValue("postalCode", customer.PostalCode ?? "");
    }
    // برای مشتری جدید فقط شماره موبایل پر می‌شود و بقیه فیلدها خالی و قابل تغییر هستند
  }, [customer, provinces, cities, regions, setValue, isExistingCustomer]);

  return (
    <div className="flex flex-col gap-y-8 gap-x-3 p-4">
      <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-3 lg:gap-y-10 gap-y-5 gap-x-3">
        <TextField
          required
          {...register("firstName")}
          label="نام"
          variant="outlined"
          size="small"
          disabled={isFormDisabled}
          error={!!errors.firstName}
          helperText={errors.firstName?.message ?? ""}
        />
        <TextField
          required
          {...register("lastName")}
          label="نام خانوادگی"
          variant="outlined"
          size="small"
          disabled={isFormDisabled}
          error={!!errors.lastName}
          helperText={errors.lastName?.message ?? ""}
        />
        <TextField
          {...register("nationalCode")}
          label="کد ملی"
          variant="outlined"
          size="small"
          disabled={isFormDisabled}
          error={!!errors.nationalCode}
          helperText={errors.nationalCode?.message ?? ""}
        />
        <TextField
          required
          {...register("mobile")}
          label="شماره موبایل"
          variant="outlined"
          size="small"
          disabled={isMobileDisabled}
          error={!!errors.mobile}
          helperText={errors.mobile?.message ?? ""}
        />

        {/* جنسیت */}
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              select
              label="جنسیت"
              variant="outlined"
              size="small"
              {...field}
              value={field.value ?? ""}
              disabled={isFormDisabled}
              error={!!errors.gender}
              helperText={errors.gender?.message ?? ""}
            >
              <MenuItem value="">انتخاب جنسیت</MenuItem>
              <MenuItem value="مرد">مرد</MenuItem>
              <MenuItem value="زن">زن</MenuItem>
            </TextField>
          )}
        />

        {/* استان */}
        <Controller
          name="province"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              select
              label="استان"
              variant="outlined"
              size="small"
              fullWidth
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                field.onChange(e);
                setValue("city", "");
                setValue("region", "");
              }}
              disabled={isFormDisabled || isProvincesLoading}
              error={!!errors.province}
              helperText={errors.province?.message ?? ""}
            >
              <MenuItem value="">انتخاب استان</MenuItem>
              {provinces?.map((province) => (
                <MenuItem key={province.Id} value={province.Id.toString()}>
                  {province.ProvinceName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* شهر */}
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              select
              label="شهر"
              variant="outlined"
              size="small"
              fullWidth
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                field.onChange(e);
                setValue("region", "");
              }}
              disabled={isFormDisabled || !provinceValue || isCitiesLoading}
              error={!!errors.city}
              helperText={errors.city?.message ?? ""}
            >
              <MenuItem value="">انتخاب شهر</MenuItem>
              {cities?.map((city) => (
                <MenuItem key={city.CityId} value={city.CityId.toString()}>
                  {city.CityName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* منطقه */}
        <Controller
          name="region"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              select
              label="منطقه"
              variant="outlined"
              size="small"
              fullWidth
              {...field}
              value={field.value ?? ""}
              disabled={isFormDisabled || !cityValue || isRegionLoading}
              error={!!errors.region}
              helperText={errors.region?.message ?? ""}
            >
              <MenuItem value="">انتخاب منطقه</MenuItem>
              {regions?.map((region) => (
                <MenuItem
                  key={region.RegionCrmId}
                  value={region.RegionCrmId.toString()}
                >
                  {region.RegionName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <TextField
          {...register("postalCode")}
          label="کد پستی"
          variant="outlined"
          size="small"
          disabled={isFormDisabled}
          error={!!errors.postalCode}
          helperText={errors.postalCode?.message ?? ""}
        />
      </div>

      <TextField
        {...register("address")}
        label="آدرس"
        variant="outlined"
        size="small"
        multiline
        rows={3}
        disabled={isFormDisabled}
        error={!!errors.address}
        helperText={errors.address?.message ?? ""}
      />
    </div>
  );
};

export default CustomerInfoStep;
