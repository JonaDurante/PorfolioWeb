import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

// Inicializar EmailJS
if (EMAILJS_CONFIG.publicKey) {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

export interface EmailData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_name?: string;
}

export const sendEmail = async (data: EmailData): Promise<void> => {
  try {
    // Validar configuración
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    // Validar datos
    if (!data.from_name || !data.from_email || !data.message) {
      throw new Error('Required fields are missing: name, email, and message are required.');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.from_email)) {
      throw new Error('Invalid email format.');
    }

    const templateParams = {
      name: data.from_name,           // Para {{name}} en el template
      from_name: data.from_name,      // Para {{from_name}} en el template  
      from_email: data.from_email,    // Para {{from_email}} en el template
      email: data.from_email,         // Para {{email}} en el template
      subject: data.subject || 'Contact Form Message',
      message: data.message,          // Para {{message}} en el template
      to_name: data.to_name || 'Jonathan Durante',
      reply_to: data.from_email,      // Para el Reply-To
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error(`EmailJS request failed with status: ${response.status}`);
    }

    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Re-throw with user-friendly message
    if (error instanceof Error) {
      if (error.message.includes('configuration is missing')) {
        throw new Error('Email service is not properly configured. Please contact the administrator.');
      } else if (error.message.includes('Required fields')) {
        throw error; // Keep validation error as is
      } else if (error.message.includes('Invalid email')) {
        throw error; // Keep validation error as is
      } else {
        throw new Error('Failed to send email. Please try again later or contact directly.');
      }
    }
    
    throw new Error('An unexpected error occurred. Please try again later.');
  }
};