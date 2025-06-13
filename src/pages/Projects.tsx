import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  demo: string;
  category: string;
}

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-commerce Microservices',
      description: 'A scalable e-commerce platform built with Spring Boot microservices, featuring product management, order processing, and payment integration.',
      technologies: ['Java', 'Spring Boot', 'Docker', 'Kafka'],
      image: '/projects/ecommerce.jpg',
      github: 'https://github.com/singhtanya05/ecommerce',
      demo: 'https://demo.ecommerce.com',
      category: 'backend',
    },
    {
      id: 2,
      title: 'Real-time Analytics Dashboard',
      description: 'A real-time analytics platform that processes and visualizes data from multiple sources using Spring Cloud Stream and WebSocket.',
      technologies: ['Java', 'Spring Cloud', 'WebSocket', 'Redis'],
      image: '/projects/analytics.jpg',
      github: 'https://github.com/singhtanya05/analytics',
      demo: 'https://demo.analytics.com',
      category: 'backend',
    },
    {
      id: 3,
      title: 'API Gateway Service',
      description: 'A robust API gateway service implementing rate limiting, authentication, and request routing using Spring Cloud Gateway.',
      technologies: ['Java', 'Spring Cloud', 'OAuth2', 'Redis'],
      image: '/projects/gateway.jpg',
      github: 'https://github.com/singhtanya05/gateway',
      demo: 'https://demo.gateway.com',
      category: 'backend',
    },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading mb-6">Projects</h1>
            <p className="text-textSecondary mb-8 max-w-2xl">
              Here are some of my notable projects that showcase my expertise in Java backend
              development, system design, and implementation of best practices.
            </p>

            {/* Filter Buttons */}
            <div className="flex space-x-4 mb-8">
              {['all', 'backend', 'frontend', 'fullstack'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === category
                      ? 'bg-secondary text-primary'
                      : 'bg-tertiary text-textSecondary hover:bg-secondary/10'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-tertiary rounded-lg overflow-hidden"
                >
                  <div className="aspect-video bg-primary relative">
                    {/* Add project image here */}
                    <div className="absolute inset-0 flex items-center justify-center text-textSecondary">
                      Project Image
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-textSecondary mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary rounded-full text-sm text-textSecondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-textSecondary hover:text-secondary transition-colors"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-textSecondary hover:text-secondary transition-colors"
                      >
                        <FaExternalLinkAlt className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects; 