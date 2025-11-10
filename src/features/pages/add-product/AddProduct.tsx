"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CustomerFormData, customerSchema } from "./formSchema";
import CustomerInfoStep from "./steps/CustomerInfoStep";
import FinalStep from "./steps/FinalStep";
import ProductStep from "./steps/ProductStep";

export default function AddProduct() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.customer);
  useEffect(() => {
    if (!user || !user.selectedCustomer?.Mobile) {
      router.replace("/dashboard");
    }
  }, [user, router]);
  const [activeStep, setActiveStep] = useState(0);
  const { showMessage } = useSnackbar();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [closeForm, setCloseForm] = useState(false);
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
      Brand: "",
      ProductLife: "",
      AccessoryConditions: "",
      Product: "",
      ProductionConditions: "",
    },
  });

  const ProductList = useSelector(
    (state: RootState) => state.productList.items
  );

  const steps = [
    { label: "اطلاعات مشتری", component: <CustomerInfoStep /> },
    { label: "اطلاعات محصول", component: <ProductStep /> },
    { label: "تأیید نهایی", component: <FinalStep /> },
  ];

  const stepFields: (keyof CustomerFormData)[][] = [
    ["firstName", "lastName", "mobile"], // مرحله 0
    [
      "Brand",
      "Product",
      "ProductLife",
      "ProductionConditions",
      "AccessoryConditions",
    ], // مرحله 1
    [], // مرحله 2
  ];

  const handleStepChange = (nextStep: number) => {
    if (nextStep === 1 && ProductList.length > 0) {
      stepFields[1].forEach((field) => methods.clearErrors(field));
    }
    setActiveStep(nextStep);
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      if (ProductList.length === 0) {
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

  const finall = () => {
    if (ProductList.length === 0) {
      showMessage("لطفاً حداقل یک محصول اضافه کنید", "error");
      return;
    }

    setOpenSubmit(true);
  };
  const handleBack = () => {
    handleStepChange(activeStep - 1);
  };

  const handleConfirmSubmit = () => {
    setOpenSubmit(false);
  };
  const setCancel = () => {
    setCloseForm(true);
  };
  const onCancel = () => {
    router.replace("/dashboard");
  };
  return (
    <FormProvider {...methods}>
      <form className="h-full flex flex-col gap-3 rounded-md dark:bg-[#282828] bg-gray-100 p-4 shadow-md">
        <header className="rounded-md px-3">
          <Stepper
            activeStep={activeStep}
            className="w-full overflow-auto py-2"
          >
            {steps.map((s) => (
              <Step key={s.label}>
                <StepLabel
                  sx={(theme) => ({
                    // رنگ عمومی متن مراحل
                    "& .MuiStepLabel-label": {
                      color: mode === "dark" ? "#cccc" : "#9f9f9f",
                      whiteSpace: "nowrap", // 👈 جلوگیری از دو خطی شدن
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                    // مرحله فعال
                    "& .MuiStepLabel-label.Mui-active": {
                      color: mode === "dark" ? "#ffff" : "#08234f",
                    },
                    "& .MuiStepLabel-label.Mui-completed": {
                      color: "#9f9f9f !important",
                    },
                    // آیکون مرحله فعال
                    "& .MuiStepIcon-root.Mui-active": {
                      color: theme.palette.primary.main,
                    },
                    // آیکون مرحله کامل‌شده → سبز
                    "& .MuiStepIcon-root.Mui-completed": {
                      color: "#9f9f9f !important",
                    },
                    // آیکون مراحل غیرفعال
                    "& .MuiStepIcon-root": {
                      color: "#9f9f9f",
                    },
                  })}
                >
                  {s.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </header>

        <main className="flex-1 lg:pt-6 overflow-auto lg:px-4  ">
          {steps[activeStep].component}
        </main>

        <footer className="py-2 flex justify-center gap-2">
          <Button variant="outlined" color="error" onClick={setCancel}>
            انصراف
          </Button>

          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            قبلی
          </Button>
          {/* مرحله آخر submit واقعی داره */}
          {activeStep === steps.length - 1 ? (
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={finall}
            >
              ثبت نهایی
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained">
              بعدی
            </Button>
          )}
          <ConfirmDialog
            open={openSubmit}
            title="تأیید ثبت نهایی"
            message="آیا از ثبت اطلاعات زیر اطمینان دارید؟ "
            confirmText="بله، ثبت کن"
            cancelText="لغو"
            confirmColor="success"
            onConfirm={handleConfirmSubmit}
            onClose={() => setOpenSubmit(false)}
          />
          <ConfirmDialog
            open={closeForm}
            title="تأیید انصراف"
            message="آیا از حذف اطلاعات اطمینان دارید؟"
            confirmText="بله، ثبت کن"
            cancelText="لغو"
            confirmColor="success"
            onConfirm={onCancel}
            onClose={() => setCloseForm(false)}
          />
        </footer>
      </form>
    </FormProvider>
  );
}
