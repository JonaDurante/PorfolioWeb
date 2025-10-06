import { useLanguage } from "../contexts/LanguageContext";
import { MailIcon, Send } from "lucide-react";
import SplitText from "./effects/SplitText";

function Contact() {
  const { language, t } = useLanguage();
  return (
    <section id="contact" className="pt-16 min-w-auto w-full">
      <div className="max-w-7xl mx-auto shadow-slate shadow-lg bg-white dark:bg-gray-800">
        <div className="justify-center mb-8 inline-flex items-center">
          <SplitText
            key={language + "-contact-title"}
            text={t("contact.title")}
            tag="h1"
          />
        </div>
        <div id="contact" className="bg-stone-950 rounded-lg shadow-md">
          <div className="container mx-auto px-2">
            <div className="flex flex-col gap-8">
              <form className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex flex-col gap-6 mb-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                    >
                      {t("contact.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                      placeholder={t("contact.yourName")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                    >
                      {t("contact.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                      placeholder={t("contact.yourEmail")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                    >
                      {t("contact.subject")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                      placeholder={t("contact.yourSubject")}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                    >
                      {t("contact.message")}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                      placeholder={t("contact.yourMessage")}
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    {t("contact.send")}
                    <Send size={18} className="ml-2" />
                  </button>
                </div>
              </form>
            </div>
            <div className="max-w-3xl mx-auto text-center items-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
                  {t("contact.contactInformation")}
                </h3>
                <div className="flex flex-row justify-center gap-6">
                  <div className="flex items-center">
                    <a
                      href="https://www.linkedin.com/in/jonathangdurante/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-colors p-2 rounded-full"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76c.97 0 1.75.79 1.75 1.76s-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className="flex items-center">
                    <a
                      href="https://wa.me/5491141476732"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:bg-green-500 hover:text-white transition-colors p-2 rounded-full"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.028-.967-.271-.099-.468-.149-.666.15-.197.297-.767.967-.941 1.166-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.373-.025-.522-.075-.149-.666-1.611-.916-2.207-.242-.579-.487-.5-.666-.51-.171-.008-.373-.01-.573-.01-.199 0-.522.075-.797.373-.274.298-1.045 1.022-1.045 2.479 0 1.456 1.049 2.868 1.193 3.066.149.198 2.065 3.166 5.017 4.309.702.302 1.249.482 1.674.617.702.224 1.342.192 1.847.117.563-.084 1.758-.719 2.006-1.413.248-.695.248-1.291.173-1.413-.074-.123-.271-.198-.568-.347z" />
                        <path d="M12.004 2.003c-5.523 0-9.997 4.474-9.997 9.997 0 1.762.464 3.479 1.345 4.991l-1.426 5.221 5.352-1.409c1.462.801 3.104 1.236 4.726 1.236 5.523 0 9.997-4.474 9.997-9.997s-4.474-9.997-9.997-9.997zm0 18.13c-1.518 0-3.004-.396-4.293-1.146l-.308-.179-3.176.836.849-3.099-.2-.317c-.845-1.338-1.292-2.885-1.292-4.482 0-4.411 3.588-7.999 7.999-7.999s7.999 3.588 7.999 7.999-3.588 7.999-7.999 7.999z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Contact;
