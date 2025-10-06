import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { SunIcon, MoonIcon, MenuIcon, XIcon, GlobeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-transparent backdrop-blur shadow-md sticky top-0 z-10 opacity-95 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center h-16">
        <div className="flex justify-between md:grid md:grid-cols-3 mx-auto w-full h-16 items-center">
          <div className="flex items-center justify-start">
            <h1 className="tittle-text text-xl font-bold">Jonathan Durante</h1>
          </div>
          <div className="hidden md:flex items-center justify-center bg-transparent rounded-xl px-6 py-2">
            <nav className="flex items-center space-x-8">
              <div className="div-nav">
                <Link to="/" className="link-style">
                  {t("header.about")}
                </Link>
              </div>
              <div className="div-nav">
                <Link to="/experience" className="link-style">
                  {t("header.experience")}
                </Link>
              </div>
              <div className="div-nav">
                <Link to="/skills" className="link-style">
                  {t("header.skills")}
                </Link>
              </div>
              <div className="div-nav">
                <Link to="/contact" className="link-style">
                  {t("header.contact")}
                </Link>
              </div>
            </nav>
          </div>
          <div className="flex items-center text-center justify-end">
            <div className="hidden md:flex items-center justify-end">
              <button
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                className="flex items-center text-main p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                aria-label="Toggle Language"
                title={
                  language === "en"
                    ? t("languageToggle.en")
                    : t("languageToggle.es")
                }
              >
                {language === "en" ? (
                  <>
                    <GlobeIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">EN</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm mr-1">ES</span>
                    <GlobeIcon className="h-5 w-5" />
                  </>
                )}
              </button>
              <button
                onClick={toggleTheme}
                className="text-main p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
                aria-label="Toggle Theme"
                title={
                  theme === "dark"
                    ? t("themeToggle.light")
                    : t("themeToggle.dark")
                }
              >
                {theme === "dark" ? (
                  <SunIcon className="text-main h-5 w-5" />
                ) : (
                  <MoonIcon className="text-main h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex items-center md:hidden justify-end">
              <button
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                className="flex items-center text-main p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                aria-label="Toggle Language"
              >
                {language === "en" ? (
                  <>
                    <GlobeIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">EN</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm mr-1">ES</span>
                    <GlobeIcon className="h-5 w-5" />
                  </>
                )}
              </button>
              <button
                onClick={toggleTheme}
                className="text-main p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={toggleMenu}
                className="text-main p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Open Menu"
              >
                {isMenuOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 text-main"
            >
              {t("header.about")}
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 text-main"
            >
              {t("header.experience")}
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 text-main"
            >
              {t("header.skills")}
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 text-main"
            >
              {t("header.contact")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
