import React from "react";
import ThemeSwitch from "./ThemeSwitch";

export default function ExamNavbar() {
  return (
    <div className="flex items-center justify-start shadow-md z-200 shadow-[#ff6d6d9c] w-full h-12 mb-2">
      <div className="ml-2">
        <ThemeSwitch />
      </div>

      <h1 className="text-2xl mx-auto pr-16 font-bold">Листови.ПГЕЕ</h1>
    </div>
  );
}
