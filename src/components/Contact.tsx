import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import SplitText from "./effects/SplitText";
import { sendEmail, EmailData } from "../services/emailService";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errorMessage: string;
}

export default function Contact() {
  const { language, t } = useLanguage();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    submitStatus: 'idle',
    errorMessage: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error state when user starts typing
    if (formState.submitStatus === 'error') {
      setFormState(prev => ({
        ...prev,
        submitStatus: 'idle',
        errorMessage: ''
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormState({
      isSubmitting: true,
      submitStatus: 'idle',
      errorMessage: ''
    });
    
    try {
      const emailData: EmailData = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      };
      
      await sendEmail(emailData);
      
      // Success - clear form and show success message
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setFormState({
        isSubmitting: false,
        submitStatus: 'success',
        errorMessage: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          submitStatus: 'idle'
        }));
      }, 5000);
      
    } catch (error) {
      setFormState({
        isSubmitting: false,
        submitStatus: 'error',
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };
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
                <form className="bg-background p-4 md:p-6 rounded-lg" onSubmit={handleSubmit}>
                  {/* Success/Error Messages */}
                  {formState.submitStatus === 'success' && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                      <span className="text-green-800 dark:text-green-200">
                        {t("contact.successMessage") || "Message sent successfully! I'll get back to you soon."}
                      </span>
                    </div>
                  )}
                  
                  {formState.submitStatus === 'error' && (
                    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                      <span className="text-red-800 dark:text-red-200">
                        {formState.errorMessage}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2 mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-main font-medium mb-2"
                      >
                        {t("contact.name") || "Name"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="imput-form"
                        placeholder={t("contact.yourName") || "Your name"}
                        required
                        disabled={formState.isSubmitting}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-main font-medium mb-2"
                      >
                        {t("contact.email")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="imput-form"
                        placeholder={t("contact.yourEmail")}
                        required
                        disabled={formState.isSubmitting}
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
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="imput-form"
                        placeholder={t("contact.yourSubject")}
                        disabled={formState.isSubmitting}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="message"
                        className="block text-main font-medium mb-2"
                      >
                        {t("contact.message")} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={8}
                        className="imput-form resize-none"
                        placeholder={t("contact.yourMessage")}
                        required
                        disabled={formState.isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={formState.isSubmitting || !formData.name || !formData.email || !formData.message}
                      className="px-4 py-2 bg-blue-600 dark:bg-blue-400 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                      {formState.isSubmitting ? (
                        <>
                          <Loader2 size={18} className="mr-2 animate-spin" />
                          {t("contact.sending") || "Sending..."}
                        </>
                      ) : (
                        <>
                          {t("contact.send")}
                          <Send size={18} className="ml-2" />
                        </>
                      )}
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
