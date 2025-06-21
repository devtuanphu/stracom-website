"use client";
import React, { ReactNode, createContext, useState } from "react";

interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{
  children: ReactNode;
  initialLanguage?: string;
}> = ({ children, initialLanguage = "vi" }) => {
  const [language, setLanguage] = useState(initialLanguage);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
