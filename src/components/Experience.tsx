import { useLanguage } from "../contexts/LanguageContext";
import { BriefcaseIcon } from "lucide-react";
import enTranslations from "../locales/en.json";
import esTranslations from "../locales/es.json";
import SplitText from "./effects/SplitText";

function Experience() {
  const { language, t } = useLanguage();
  const translations = language === "en" ? enTranslations : esTranslations;

  const jobs = translations.experience.jobs;

  return (
    <section id="experience" className="py-16">
      <div className="max-w-3xl mx-auto">
        <div className="justify-center mb-8 inline-flex items-center">
          <BriefcaseIcon className="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" />
          <SplitText
            key={language + "-exp-title"}
            text={t("experience.title")}
            tag="h1"
          />
        </div>
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
                      src={job.logo}
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
}
export default Experience;
