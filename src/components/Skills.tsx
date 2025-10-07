import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import enTranslations from "../locales/en.json";
import esTranslations from "../locales/es.json";
import SplitText from "./effects/SplitText";
import { LogoItem, LogoLoop } from "./effects/LogoLoop";

type Skill = {
  logoPath: string;
  name: string;
};

const specialLogos = ["jquery"];

const getLogoSrc = (skill: Skill, isDark: boolean) => {
  if (specialLogos.some((name) => skill.logoPath.includes(name))) {
    return isDark
      ? `${skill.logoPath}-dark.svg`
      : `${skill.logoPath}-light.svg`;
  }
  return skill.logoPath;
};

export default function Skills() {
  const { language, t } = useLanguage();
  const translations = language === "en" ? enTranslations : esTranslations;
  const categories = translations.skills.categories;
  const [fadeOutColor, setFadeOutColor] = useState("#ffffff");
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const updateIsDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    updateIsDark();
    const observer = new MutationObserver(updateIsDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateFadeOutColor = () => {
      setFadeOutColor(isDark ? "#1a202c" : "#ffffff");
    };

    updateFadeOutColor();
  }, [isDark]);

  return (
    <section
      id="skills"
      className="bg-transparent flex w-full h-fit align-center justify-center"
    >
      <div className="card px-6 pb-6 pt-2 backdrop-blur shadow-md rounded-lg sm:w-full md:max-w-2xl lg:max-w-3xl w-full">
        <div className="tittle-div">
          <SplitText
            key={language + "-skills-title"}
            text={t("skills.title")}
            tag="h1"
          />
        </div>
        <div className="space-y-6 overflow-y-auto max-h-[70vh]">
          {categories.map((category, index) => {
            const logoItems: LogoItem[] = category.skills.map(
              (skill: Skill) => ({
                src: getLogoSrc(skill, isDark),
                alt: skill.name,
                title: skill.name,
              })
            );

            return (
              <div
                key={index}
                className="bg-background rounded-lg shadow-md p-3 sm:p-4"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-4 blue-text">
                  {category.name}
                </h3>
                <div className="w-full overflow-hidden">
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
