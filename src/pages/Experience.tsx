import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, ExternalLink } from 'lucide-react';
import { profile } from '../data/profile';

export const Experience: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My journey in software development, from building scalable systems to AI-powered solutions.
          </p>
        </motion.div>

        <div className="space-y-8">
          {profile.experience.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Building size={16} />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {exp.type}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {exp.achievements.map((achievement, achievementIndex) => (
                  <motion.div
                    key={achievementIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: (index * 0.2) + (achievementIndex * 0.1) }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Education</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            {profile.education.map((edu, index) => (
              <motion.div
                key={`${edu.institution}-${edu.period}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + (index * 0.2) }}
                className="space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">{edu.degree}</h3>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Building size={16} />
                        <span className="font-medium">{edu.institution}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {edu.relevantCoursework && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCoursework.map((course, courseIndex) => (
                        <span
                          key={courseIndex}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.certifications.map((cert, index) => (
              <motion.div
                key={`${cert.name}-${cert.year}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 + (index * 0.1) }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-600 text-sm">{cert.issuer}</p>
                  <p className="text-blue-600 font-medium">{cert.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 