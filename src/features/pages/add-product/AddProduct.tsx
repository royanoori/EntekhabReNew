"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import CustomerInfoStep from "./steps/CustomerInfoStep";
import BrandStep from "./steps/FinalStep";
import ProductStep from "./steps/ProductStep";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CustomerFormData, customerSchema } from "./formSchema";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FinalStep from "./steps/FinalStep";

export default function AddProduct() {
  const [activeStep, setActiveStep] = useState(0);
  const { showMessage } = useSnackbar();

  const methods = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      mobile: "",
      gender: "",
      province: "",
      city: "",
      address: "",
      postalCode: "",
      region: "",
      brand: "",
      lifetime: "",
      parts: "",
      product: "",
      status: "",
    },
  });

  const productList = useSelector(
    (state: RootState) => state.productList.items
  );

  const steps = [
    { label: "اطلاعات مشتری", component: <CustomerInfoStep /> },
    { label: "اطلاعات محصول", component: <ProductStep /> },
    { label: "تأیید نهایی", component: <FinalStep /> },
  ];

  const stepFields: (keyof CustomerFormData)[][] = [
    ["firstName", "lastName", "mobile"], // مرحله 0
    ["brand", "product", "lifetime", "status", "parts"], // مرحله 1
    [], // مرحله 2
  ];

  const handleStepChange = (nextStep: number) => {
    // اگر به تب اطلاعات محصول می‌رویم و محصولی اضافه شده است، خطاهای فرم مرحله 1 را پاک کن
    if (nextStep === 1 && productList.length > 0) {
      stepFields[1].forEach((field) => methods.clearErrors(field));
    }
    setActiveStep(nextStep);
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      if (productList.length === 0) {
        await methods.trigger(stepFields[activeStep]);
        showMessage("لطفاً حداقل یک محصول اضافه کنید", "error");
        return;
      }
    } else {
      const valid = await methods.trigger(stepFields[activeStep]);
      if (!valid) return;
    }

    handleStepChange(activeStep + 1);
  };
  const handleBack = () => {
    handleStepChange(activeStep - 1);
  };

  const onSubmit = (data: CustomerFormData) => {
    debugger;
    console.log("📦 Final data:", data);
    // مثال: نمایش پیام موفقیت
    showMessage("اطلاعات با موفقیت ثبت شد", "success");
    // یا ارسال داده‌ها به سرور
    // await axios.post("/api/submit", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="h-full flex flex-col gap-3"
      >
        <header>
          <Stepper activeStep={activeStep}>
            {steps.map((s) => (
              <Step key={s.label}>
                <StepLabel>{s.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </header>

        <main className="flex-1 pt-4 overflow-auto">
          {steps[activeStep].component}
        </main>

        <footer className="py-2 flex justify-center shadow">
          <Button disabled={activeStep === 0} onClick={handleBack}>
            قبلی
          </Button>
          {/* مرحله آخر submit واقعی داره */}
          {activeStep === steps.length - 1 ? (
            <Button type="submit">ثبت نهایی</Button>
          ) : (
            <Button onClick={handleNext} variant="contained">
              بعدی
            </Button>
          )}
        </footer>
      </form>
    </FormProvider>
  );
}
