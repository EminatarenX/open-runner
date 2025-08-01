import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, MessageSquare, Shield, Zap, Globe } from 'lucide-react';
import { profile } from '../data/profile';

export const Skills: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'languages':
        return <Code size={24} />;
      case 'databases':
        return <Database size={24} />;
      case 'cloud & devops':
        return <Cloud size={24} />;
      case 'event-driven':
        return <Zap size={24} />;
      case 'healthcare standards':
        return <Shield size={24} />;
      case 'apis & integrations':
        return <MessageSquare size={24} />;
      case 'methodologies':
        return <Globe size={24} />;
      default:
        return <Code size={24} />;
    }
  };

  const getSkillLevel = (skill: string) => {
    // Define skill levels based on experience and importance
    const expertSkills = ['Java (Spring Boot)', 'Python (Flask/FastAPI)', 'TypeScript (NestJS)', 'AWS (EC2, S3)', 'Kafka', 'MongoDB'];
    const advancedSkills = ['JavaScript', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'REST', 'GraphQL'];
    const intermediateSkills = ['PHP (Laravel)', 'MySQL', 'CI/CD', 'Nginx', 'Unix', 'WebSockets', 'HL7', 'FHIR'];
    
    if (expertSkills.some(expert => skill.includes(expert.split('(')[0]))) return 95;
    if (advancedSkills.some(advanced => skill.includes(advanced.split('(')[0]))) return 85;
    if (intermediateSkills.some(intermediate => skill.includes(intermediate.split('(')[0]))) return 75;
    return 70;
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across various domains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {profile.skills.map((skillCategory, categoryIndex) => (
            <motion.div
              key={skillCategory.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  {getCategoryIcon(skillCategory.category)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{skillCategory.category}</h3>
              </div>

              <div className="space-y-4">
                {skillCategory.skills.map((skill, skillIndex) => {
                  const level = getSkillLevel(skill);
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{skill}</span>
                        <span className="text-sm text-gray-600">{level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${level}%` }}
                          transition={{ duration: 1, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.5 }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Backend Development</h3>
                <p className="text-gray-600">Expert in building scalable microservices and APIs with Java, Python, and TypeScript.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cloud & DevOps</h3>
                <p className="text-gray-600">Proficient in AWS, Kubernetes, Docker, and CI/CD pipelines for production deployments.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI & Automation</h3>
                <p className="text-gray-600">Experience with AI-powered solutions, NLP, and automation systems used by 300+ companies.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
              <div className="text-gray-600">NLP Accuracy Improvement</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">30%</div>
              <div className="text-gray-600">Latency Reduction</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">22%</div>
              <div className="text-gray-600">Cloud Cost Reduction</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
              <div className="text-gray-600">Monthly Interactions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 