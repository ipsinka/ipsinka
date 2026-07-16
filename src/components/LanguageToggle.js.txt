"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200 text-sm font-medium"
      title={language === "es" ? "Cambiar a Inga" : "Tikrachii Kastillanu simi"}
    >
      <span className="text-lg">🌍</span>
      <span className="hidden sm:inline">
        {language === "es" ? "ES" : "INGA"}
      </span>
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    </button>
  );
}