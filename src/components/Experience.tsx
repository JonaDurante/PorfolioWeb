import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { BriefcaseIcon } from "lucide-react";
import enTranslations from "../locales/en.json";
import esTranslations from "../locales/es.json";
const Experience: React.FC = () => {
  const { language, t } = useLanguage();
  // Get the jobs array directly from the translation files
  const translations = language === "en" ? enTranslations : esTranslations;
  const jobs = translations.experience.jobs;
  // Company logos
  const companyLogos = {
    "Heinleing Grouppe":
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    "Setup Informática":
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    "EY (Ernst & Young)":
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    Accusys:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  };
  return (
    <section id="experience" className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <BriefcaseIcon className="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" />
          {t("experience.title")}
        </h2>
        <div className="space-y-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-600 dark:border-blue-400"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 flex justify-center items-start mb-4 md:mb-0 md:mr-6">
                  <div className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-sm">
                    <img
                      src={
                        companyLogos[job.company] ||
                        "https://via.placeholder.com/150"
                      }
                      alt={`${job.company} logo`}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                      {job.company}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium mb-3">
                    {job.position}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Experience;
