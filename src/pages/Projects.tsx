import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Database, Cloud, MessageSquare } from 'lucide-react';
import { profile } from '../data/profile';

export const Projects: React.FC = () => {
  const getTechnologyIcon = (tech: string) => {
    if (tech.toLowerCase().includes('react')) return <Code size={16} />;
    if (tech.toLowerCase().includes('python') || tech.toLowerCase().includes('fastapi')) return <Code size={16} />;
    if (tech.toLowerCase().includes('java') || tech.toLowerCase().includes('spring')) return <Code size={16} />;
    if (tech.toLowerCase().includes('mongodb') || tech.toLowerCase().includes('postgresql') || tech.toLowerCase().includes('mysql')) return <Database size={16} />;
    if (tech.toLowerCase().includes('aws') || tech.toLowerCase().includes('kubernetes') || tech.toLowerCase().includes('docker')) return <Cloud size={16} />;
    if (tech.toLowerCase().includes('whatsapp') || tech.toLowerCase().includes('api')) return <MessageSquare size={16} />;
    return <Code size={16} />;
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my work, from AI-powered solutions to modern web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {profile.projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                  <div className="flex space-x-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label="View live project"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {getTechnologyIcon(tech)}
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Open Source Contributions</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Projects Created</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">5+</div>
                <div className="text-gray-600">Technologies Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">300+</div>
                <div className="text-gray-600">Companies Impacted</div>
              </div>
            </div>
            <div className="mt-8">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                <Github size={20} className="mr-2" />
                View All Projects on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 