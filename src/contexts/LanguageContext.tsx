import React, { useEffect, useState, createContext, useContext } from "react";
import i18n from "../utils/i18n";
import { getStorageItem, setStorageItem } from "../utils/localStorage";
type Language = "en" | "es";
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  t: (key: string) => key,
});
export const useLanguage = () => useContext(LanguageContext);
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("es");
  useEffect(() => {
    const result = getStorageItem<Language>("language", "es");

    if (
      result.success &&
      result.data &&
      (result.data === "en" || result.data === "es")
    ) {
      setLanguageState(result.data);
      try {
        i18n.changeLanguage(result.data);
      } catch (error) {
        console.warn("Error changing i18n language:", error);
        setLanguageState("es");
        i18n.changeLanguage("es");
      }
    } else {
      if (!result.success) {
        console.warn("Error loading language from storage:", result.error);
      }
      setLanguageState("es");
      i18n.changeLanguage("es");
    }
  }, []);
  const setLanguage = (lang: Language) => {
    try {
      setLanguageState(lang);
      i18n.changeLanguage(lang);

      const result = setStorageItem("language", lang);
      if (!result.success) {
        console.warn("Failed to save language preference:", result.error);
      }
    } catch (error) {
      console.error("Error setting language:", error);
    }
  };
  const t = (key: string) => {
    try {
      const translation = i18n.t(key);
      return translation || key;
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return key;
    }
  };
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
