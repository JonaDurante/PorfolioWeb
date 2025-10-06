import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { SunIcon, MoonIcon, MenuIcon, XIcon, GlobeIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // const scrollToSection = (id: string) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //     setIsMenuOpen(false);
  //   }
  // };
  return (
    <header className="bg-trans shadow-md sticky top-0 z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center h-16">
        <div className="flex justify-between md:grid md:grid-cols-3 mx-auto w-full h-16 items-center">
          <div className="flex items-center justify-start">
            <h1 className="text-dark dark:text-gray-400 text-xl font-bold">
              Jonathan Durante
            </h1>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {t("header.about")}
              </Link>
              <Link
                to="/experience"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {t("header.experience")}
              </Link>
              <Link
                to="/skills"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {t("header.skills")}
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {t("header.contact")}
              </Link>
            </nav>
          </div>

          <div className="flex items-center text-center justify-end">
            <div className="hidden md:flex items-center justify-end">
              <button
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                className="flex items-center text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
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
                className="text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <SunIcon className="text-gray-700 dark:text-gray-300 h-5 w-5" />
                ) : (
                  <MoonIcon className="text-gray-700 dark:text-gray-300 h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex items-center md:hidden justify-end">
              <button
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                className="flex items-center text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
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
                className="text-gray-700 dark:text-gray-300 p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
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
                className="text-gray-700 dark:text-gray-300 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
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
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {t("header.about")}
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {t("header.experience")}
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {t("header.skills")}
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {t("header.contact")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
