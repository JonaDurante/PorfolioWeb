import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Download } from "lucide-react";
import CVModal from "./CVModal";

export default function Footer() {
  const { t } = useLanguage();
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const handleCVClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCVModalOpen(true);
  };
  return (
    <footer className="max-w-full h-fit flex flex-row items-center justify-center text-sm bg-black text-gray-100 py-1 gap-3">
      <div className="flex flex-row justify-start ">
        © {new Date().getFullYear()} Jonathan Durante - Portfolio
      </div>
      <div className="flex flex-row justify-end gap-1">
        <div className="flex items-center">
          <a
            href="https://www.linkedin.com/in/jonathangdurante/"
            target="_blank"
            rel="noopener noreferrer"
            title={t("footer.linkedinTitle")}
            aria-label={t("footer.linkedinTitle")}
            className=" text-gray-100 hover:bg-blue-600 hover:text-white transition-colors p-2 rounded-full"
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
            title={t("footer.whatsappTitle")}
            aria-label={t("footer.whatsappTitle")}
            className="text-gray-100 hover:bg-green-500 hover:text-white transition-colors p-2 rounded-full"
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
        <div className="flex items-center">
          <a
            href="https://github.com/JonaDurante"
            target="_blank"
            rel="noopener noreferrer"
            title={t("footer.githubTitle")}
            aria-label={t("footer.githubTitle")}
            className="text-gray-100 hover:bg-orange-700 hover:text-white transition-colors p-2 rounded-full"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.867 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.135 20.19 22 16.437 22 12.012 22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleCVClick}
            title={t("footer.downloadCV")}
            aria-label={t("footer.downloadCV")}
            className="text-gray-100 hover:bg-blue-500 hover:text-white transition-colors p-2 rounded-full flex items-center gap-1"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* CV Selection Modal */}
      <CVModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />
    </footer>
  );
}
