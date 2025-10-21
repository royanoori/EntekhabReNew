"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { FaList } from "react-icons/fa";
import { IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";

interface MenuItem {
  title: string;
  href: string;
  icon: IconType; // ✅ اینجا ReactNode رو با IconType جایگزین کردیم
}

const menuItems: MenuItem[] = [
  {
    title: "خانه",
    href: "/dashboard",
    icon: AiFillHome,
  },
  {
    title: "ثبت کالای فرسوده",
    href: "/dashboard/add-product",
    icon: HiViewGridAdd,
  },
  { title: "لیست پذیرش‌ها", href: "/dashboard/acceptance-list", icon: FaList },
  { title: "تنظیمات", href: "/dashboard/settings", icon: FiSettings },
];

export default function SidebarMenu({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  return (
    <ul className="mt-4 space-y-2">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon; // کامپوننت آیکن

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-md transition-all 
                ${isActive ? "bg-secondary text-white" : "text-gray-700 hover:bg-gray-200"}
                ${isOpen ? "justify-start" : "justify-center"}
              `}
            >
              <Icon
                size={18}
                className={isActive ? "text-white" : "text-gray-500"}
              />
              {isOpen && <span>{item.title}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
