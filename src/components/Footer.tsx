import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-tertiary py-8">
      <div className="container-padding mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-textSecondary">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/singhtanya05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077b6] hover:text-[#03045e] transition-colors"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/tanyatanyaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077b6] hover:text-[#03045e] transition-colors"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="mailto:tanyakv1511@gmail.com"
              className="text-[#0077b6] hover:text-[#03045e] transition-colors"
            >
              <FaEnvelope className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 