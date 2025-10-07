import { useLanguage } from "../contexts/LanguageContext";
import SplitText from "./effects/SplitText";

export default function AboutMe() {
  const { language, t } = useLanguage();
  return (
    <section id="about" className="bg-transparent ">
      <div className="max-w-3xl mx-auto">
        <div className="card px-6 pb-6 pt-2 backdrop-blur shadow-md rounded-lg">
          <div className="tittle-div">
            <SplitText
              key={language + "-about.title"}
              text={t("about.title")}
              tag="h1"
            />
          </div>
          <div className="bg-background rounded-lg shadow-md ">
            <div className="flex flex-col md:flex-row p-3 items-center">
              <div className="md:w-1/3 flex justify-center align-middle items-center mb-6 md:mb-0 md:mr-6">
                <img
                  src="/img.jpg"
                  alt="Jonathan Durante"
                  className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-blue shadow-md"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-semibold mb-2 blue-text">
                  Jonathan Durante
                </h3>
                <p className="text-xl text-main mb-4">{t("about.role")}</p>
                <p className="text-main leading-relaxed">
                  {t("about.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
