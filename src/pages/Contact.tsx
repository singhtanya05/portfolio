import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
// import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Commented out email functionality
    /*
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
    */
    
    // Temporary success message
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData): FormData => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading mb-6">Get in Touch</h1>
            <p className="text-textSecondary mb-8 max-w-2xl">
              I'm always open to discussing new projects, creative ideas, or opportunities to be
              part of your vision. Feel free to reach out through the contact form or connect
              with me on social media.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-tertiary p-6 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full px-6 py-3 bg-secondary text-primary rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                  {status === 'success' && (
                    <p className="text-green-500">Message sent successfully!</p>
                  )}
                  {status === 'error' && (
                    <p className="text-red-500">Failed to send message. Please try again.</p>
                  )}
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  <p className="text-textSecondary">
                    Feel free to reach out through any of these channels. I'll get back to you
                    as soon as possible.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href="mailto:tanyakv1511@gmail.com"
                    className="text-[#0077b6] hover:text-[#03045e] transition-colors"
                  >
                    <FaEnvelope className="text-2xl" />
                  </a>
                  <span className="text-[#03045e]">tanyakv1511@gmail.com</span>
                  <a
                    href="https://github.com/singhtanya05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0077b6] hover:text-[#03045e] transition-colors"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                  <span className="text-[#03045e]">github.com/singhtanya05</span>
                  <a
                    href="https://www.linkedin.com/in/tanyatanyaa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0077b6] hover:text-[#03045e] transition-colors"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                  <span className="text-[#03045e]">linkedin.com/in/tanyatanyaa</span>
                </div>

                <div className="bg-primary p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Location</h3>
                  <p className="text-textSecondary">
                    Based in Your City, Country
                    <br />
                    Available for remote work and local opportunities
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 