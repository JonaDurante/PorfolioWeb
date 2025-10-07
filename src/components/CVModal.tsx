import { useLanguage } from "../contexts/LanguageContext";
import { X, Download, FileText } from "lucide-react";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleDownload = (language: 'es' | 'en') => {
    const fileName = language === 'es' ? 'CV_Jonathan_Durante.pdf' : 'CV_Jonathan_Durante_EN.pdf';
    const link = document.createElement('a');
    link.href = `/${fileName}`;
    link.download = fileName;
    link.click();
    onClose();
  };

  // Prevenir cierre al hacer clic dentro del modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-lg p-6 mx-4 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
        onClick={handleModalClick}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-main flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t("footer.downloadCV")}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={t("modal.close") || "Cerrar"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-main mb-4 text-center">
            {t("footer.selectLanguage") || "Selecciona el idioma del CV:"}
          </p>
          
          <div className="flex flex-col gap-3">
            {/* Spanish CV */}
            <button
              onClick={() => handleDownload('es')}
              className="flex items-center justify-center gap-3 w-full p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇪🇸</span>
                <div className="text-left">
                  <p className="font-medium text-blue-800 dark:text-blue-200">
                    {t("footer.cvSpanish") || "CV en Español"}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    CV_Jonathan_Durante.pdf
                  </p>
                </div>
              </div>
              <Download className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            </button>

            {/* English CV */}
            <button
              onClick={() => handleDownload('en')}
              className="flex items-center justify-center gap-3 w-full p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇺🇸</span>
                <div className="text-left">
                  <p className="font-medium text-green-800 dark:text-green-200">
                    {t("footer.cvEnglish") || "CV in English"}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    CV_Jonathan_Durante_EN.pdf
                  </p>
                </div>
              </div>
              <Download className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            {t("modal.cancel") || "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
}