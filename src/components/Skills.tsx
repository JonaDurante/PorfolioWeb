import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CodeIcon } from 'lucide-react';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';
const Skills: React.FC = () => {
  const {
    language,
    t
  } = useLanguage();
  // Get the categories array directly from the translation files
  const translations = language === 'en' ? enTranslations : esTranslations;
  const categories = translations.skills.categories;
  return <section id="skills" className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <CodeIcon className="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" />
          {t('skills.title')}
        </h2>
        <div className="space-y-8">
          {categories.map((category, index) => <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => <span key={skillIndex} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>)}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Skills;