import { redirect } from "next/navigation";

export default function Page() {
  // ریدایرکت به صفحه فروشگاه
  redirect("/dashboard");
  return <p>Redirecting...</p>;
}
