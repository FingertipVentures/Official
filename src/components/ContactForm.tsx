import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

interface ContactFormProps {
  isDarkMode: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isDarkMode }) => {
  const [state, handleSubmit] = useForm("xeoekwav");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          aria-required="true"
          className={`w-full px-4 py-3 rounded-lg ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 focus:border-purple-500'
              : 'bg-gray-50 border-gray-200 focus:border-purple-500'
          } border focus:ring-2 focus:ring-purple-500 outline-none transition-colors`}
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          aria-required="true"
          className={`w-full px-4 py-3 rounded-lg ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 focus:border-purple-500'
              : 'bg-gray-50 border-gray-200 focus:border-purple-500'
          } border focus:ring-2 focus:ring-purple-500 outline-none transition-colors`}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={4}
          className={`w-full px-4 py-3 rounded-lg ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 focus:border-purple-500'
              : 'bg-gray-50 border-gray-200 focus:border-purple-500'
          } border focus:ring-2 focus:ring-purple-500 outline-none transition-colors`}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
      </div>

      <motion.button
        type="submit"
        disabled={state.submitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity ${
          state.submitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Send className="w-5 h-5" />
        <span>
          {state.submitting ? 'Sending...' : 'Send Message'}
        </span>
      </motion.button>

      {state.succeeded && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-500 text-center"
        >
          Thank you for your message! We'll get back to you soon.
        </motion.p>
      )}

      {state.errors && state.errors.length > 0 && !state.submitting && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-center"
        >
          Something went wrong. Please try again.
        </motion.p>
      )}
    </form>
  );
};

export default ContactForm;