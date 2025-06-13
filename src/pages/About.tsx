import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaCloud } from 'react-icons/fa';

interface Skill {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const About: React.FC = () => {
  const skills: Skill[] = [
    {
      name: 'Backend Development',
      icon: <FaServer className="w-6 h-6" />,
      description: 'Expert in Java and Spring Boot for building robust backend systems',
    },
    {
      name: 'System Design',
      icon: <FaCode className="w-6 h-6" />,
      description: 'Experience in designing scalable and maintainable architectures',
    },
    {
      name: 'Database Management',
      icon: <FaDatabase className="w-6 h-6" />,
      description: 'Proficient in SQL and NoSQL databases, data modeling, and optimization',
    },
    {
      name: 'Cloud Technologies',
      icon: <FaCloud className="w-6 h-6" />,
      description: 'Skilled in cloud platforms and containerization technologies',
    },
  ];

  const experiences: Experience[] = [
    {
      title: 'Senior Backend Developer',
      company: 'Tech Company',
      period: '2020 - Present',
      description: [
        'Led the development of microservices architecture using Spring Boot',
        'Implemented CI/CD pipelines and automated testing',
        'Optimized database performance and reduced query time by 40%',
      ],
    },
    {
      title: 'Backend Developer',
      company: 'Software Solutions',
      period: '2018 - 2020',
      description: [
        'Developed RESTful APIs and backend services',
        'Collaborated with frontend team for seamless integration',
        'Implemented security best practices and authentication systems',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading mb-6">About Me</h1>
            <p className="text-textSecondary mb-8 max-w-2xl">
              I'm a passionate Java backend developer with expertise in building scalable and
              efficient systems. With a strong foundation in software engineering principles
              and a focus on clean code, I strive to create solutions that are both
              performant and maintainable.
            </p>

            {/* Skills Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-tertiary p-6 rounded-lg"
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-secondary mr-4">{skill.icon}</div>
                      <h3 className="text-xl font-bold">{skill.name}</h3>
                    </div>
                    <p className="text-textSecondary">{skill.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
              <div className="space-y-8">
                {experiences.map((exp) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-tertiary p-6 rounded-lg"
                  >
                    <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                    <p className="text-secondary mb-2">{exp.company}</p>
                    <p className="text-textSecondary mb-4">{exp.period}</p>
                    <ul className="list-disc list-inside space-y-2">
                      {exp.description.map((item, index) => (
                        <li key={index} className="text-textSecondary">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 