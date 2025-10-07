import { useLanguage } from "../contexts/LanguageContext";
import enTranslations from "../locales/en.json";
import esTranslations from "../locales/es.json";
import SplitText from "./effects/SplitText";

export default function Experience() {
  const { language, t } = useLanguage();
  const translations = language === "en" ? enTranslations : esTranslations;

  const jobs = translations.experience.jobs;

  return (
    <section id="experience" className="bg-transparent h-fit">
      <div className="max-w-3xl mx-auto max-h-dvh">
        <div className="card pl-6 pr-4 pb-6 pt-2 backdrop-blur shadow-md rounded-lg">
          <div className="tittle-div">
            <SplitText
              key={language + "-exp-title"}
              text={t("experience.title")}
              tag="h1"
            />
          </div>
          <div className="space-y-6 overflow-auto max-h-[70vh] pr-2">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-background rounded-lg shadow-md p-6 border-l-4 border-blue"
              >
                <div className="flex flex-col md:flex-row p-3 items-center">
                  <div className="md:w-1/4 flex justify-center align-middle items-center  mb-4 md:mb-0 md:mr-6">
                    <div className="bg-background rounded-lg shadow-sm">
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold blue-text">
                        {job.company}
                      </h3>
                      <span className="text-sm text-main mt-1 sm:mt-0">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-main font-medium mb-3">{job.position}</p>
                    <p className="text-main">{job.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
