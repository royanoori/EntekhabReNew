export interface TQuestion {
  id: string;
  label: string;
}

export const lifetimes: TQuestion[] = [
  { id: "0", label: "1 تا 5 سال" },
  { id: "1", label: "5 تا 10 سال" },
  { id: "2", label: "بیش از 10 سال" },
];

export const statuses: TQuestion[] = [
  { id: "0", label: "سالم" },
  { id: "1", label: "نیازمند تعمیر" },
  { id: "2", label: "غیرقابل تعمیر" },
];

export const parts: TQuestion[] = [
  { id: "0", label: "تمام بخش‌ها و ملحقات کامل هستند" },
  { id: "1", label: "برخی بخش‌ها یا ملحقات وجود ندارند" },
  { id: "2", label: "بدون ملحقات" },
];
