export interface TQuestion {
  id: string;
  label: string;
}

export const lifetimes: TQuestion[] = [
  { id: "1", label: "1 تا 5 سال" },
  { id: "2", label: "5 تا 10 سال" },
  { id: "3", label: "بیش از 10 سال" },
];

export const statuses: TQuestion[] = [
  { id: "1", label: "سالم" },
  { id: "2", label: "نیازمند تعمیر" },
  { id: "3", label: "غیرقابل تعمیر" },
];

export const parts: TQuestion[] = [
  { id: "1", label: "تمام بخش‌ها و ملحقات کامل هستند" },
  { id: "2", label: "برخی بخش‌ها یا ملحقات وجود ندارند" },
  { id: "3", label: "بدون ملحقات" },
];
