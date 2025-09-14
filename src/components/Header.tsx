import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SunIcon, MoonIcon, MenuIcon, XIcon, GlobeIcon } from 'lucide-react';
const Header: React.FC = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };
  return <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Jonathan Durante</h1>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              {t('header.about')}
            </button>
            <button onClick={() => scrollToSection('experience')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              {t('header.experience')}
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              {t('header.skills')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              {t('header.contact')}
            </button>
            {/* Language Toggle */}
            <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle Language">
              <GlobeIcon className="h-5 w-5" />
              <span className="ml-1 text-sm">
                {language === 'en' ? 'ES' : 'EN'}
              </span>
            </button>
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle Theme">
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </nav>
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')} className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle Language">
              <GlobeIcon className="h-5 w-5" />
            </button>
            <button onClick={toggleTheme} className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle Theme">
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Open Menu">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => scrollToSection('about')} className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700">
              {t('header.about')}
            </button>
            <button onClick={() => scrollToSection('experience')} className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700">
              {t('header.experience')}
            </button>
            <button onClick={() => scrollToSection('skills')} className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700">
              {t('header.skills')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700">
              {t('header.contact')}
            </button>
          </div>
        </div>}
    </header>;
};
export default Header;