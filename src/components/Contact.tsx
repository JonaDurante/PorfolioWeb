import { useLanguage } from "../contexts/LanguageContext";
import { Send } from "lucide-react";
import SplitText from "./effects/SplitText";

export default function Contact() {
  const { language, t } = useLanguage();
  return (
    <section
      id="contact"
      className="bg-transparent flex w-full h-fit align-center justify-center"
    >
      <div className="card px-6 pb-6 pt-2 backdrop-blur shadow-md rounded-lg sm:w-full md:max-w-2xl lg:max-w-3xl w-full">
        <div className="tittle-div">
          <SplitText
            key={language + "-contact-title"}
            text={t("contact.title")}
            tag="h1"
          />
        </div>
        <div className="mx-auto w-full max-h-full shadow-slate shadow-lg bg-background rounded-lg">
          <div id="contact" className="bg-background rounded-lg shadow-md">
            <div className="container mx-auto">
              <div className="flex flex-col">
                <form className="bg-background p-4 md:p-6 rounded-lg">
                  <div className="flex flex-col gap-2 mb-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-main font-medium mb-2"
                      >
                        {t("contact.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="imput-form"
                        placeholder={t("contact.yourEmail")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-main font-medium mb-2"
                      >
                        {t("contact.subject")}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="imput-form"
                        placeholder={t("contact.yourSubject")}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="message"
                        className="block text-main font-medium mb-2"
                      >
                        {t("contact.message")}
                      </label>
                      <textarea
                        id="message"
                        rows={8}
                        className="imput-form resize-none"
                        placeholder={t("contact.yourMessage")}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 dark:bg-blue-400 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {t("contact.send")}
                      <Send size={18} className="ml-2" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
