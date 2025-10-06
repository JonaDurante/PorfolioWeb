import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import enTranslations from "../locales/en.json";
import esTranslations from "../locales/es.json";
import SplitText from "./effects/SplitText";
import { LogoItem, LogoLoop } from "./effects/LogoLoop";

function Skills() {
  const { language, t } = useLanguage();
  const translations = language === "en" ? enTranslations : esTranslations;
  const categories = translations.skills.categories;

  const [fadeOutColor, setFadeOutColor] = useState("#ffffff");

  useEffect(() => {
    const updateFadeOutColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setFadeOutColor(isDark ? "#1a202c" : "#ffffff");
    };

    updateFadeOutColor();

    const observer = new MutationObserver(updateFadeOutColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills">
      <div className="max-w-3xl mx-auto">
        <div className="justify-center mb-4 inline-flex items-center">
          <SplitText
            key={language + "-skills-title"}
            text={t("skills.title")}
            tag="h1"
          />
        </div>
        <div className="space-y-8">
          {categories.map((category, index) => {
            const logoItems: LogoItem[] = category.skills.map((skill: any) => ({
              src: skill.logoPath,
              alt: skill.name,
              title: skill.name,
            }));

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2 overflow-visible">
                  <LogoLoop logos={logoItems} fadeOutColor={fadeOutColor} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Skills;
