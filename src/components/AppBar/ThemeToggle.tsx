"use client";

import { toggleMode } from "@/store/slices/themeSlice";
import { RootState } from "@/store/store";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function ThemeToggle() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <div
      key="changeMode"
      onClick={() => dispatch(toggleMode())}
      className="cursor-pointer"
    >
      {mode === "light" ? (
        <MdOutlineDarkMode className="text-gray-500" size={23} />
      ) : (
        <MdLightMode className="text-yellow-500" size={23} />
      )}
    </div>
  );
}
