import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { MailIcon, Mail, Phone, MapPin, Send } from "lucide-react";
const Contact: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="pt-16">
      <div className="max-w-3xl mx-auto ">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <MailIcon className="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" />
          {t("contact.title")}
        </h2>
        <div
          id="contact"
          className="py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
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
                  <div className="mb-6">
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
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
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

                <div className="flex flex-row justify-center gap-8">
                  <div className="flex items-center mb-4 px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-full mr-4">
                      <Phone className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
                        {t("contact.phone")}
                      </p>
                      <a
                        href="tel:+5491141476732"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                      >
                        +54 9 11 4147-6732
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center mb-4 px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-full mr-4">
                      <MapPin className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
                        {t("contact.location")}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Buenos Aires, Argentina
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
