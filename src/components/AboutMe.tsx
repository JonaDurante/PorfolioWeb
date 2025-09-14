import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { UserIcon } from "lucide-react";
const AboutMe: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <UserIcon className="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" />
          {t("about.title")}
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0 md:mr-6">
              <img
                src="/img.jpg"
                alt="Jonathan Durante"
                className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-blue-600 dark:border-blue-400 shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Jonathan Durante
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                {t("about.role")}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("about.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutMe;
