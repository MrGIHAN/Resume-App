import React from 'react';

const ModernTemplate = ({ resume }) => {
  const { personalInfo, education, experience, skills, colors } = resume;
  
  return (
    <div 
      className="modern-template p-10"
      style={{ 
        backgroundColor: colors.background, 
        color: colors.primary,
        fontFamily: 'Helvetica, Arial, sans-serif'
      }}
    >
      <div className="flex items-start">
        {personalInfo.photoUrl && (
          <div className="mr-6">
            <img 
              src={personalInfo.photoUrl} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4"
              style={{ borderColor: colors.primary }}
            />
          </div>
        )}
        
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
            {personalInfo.name}
          </h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {personalInfo.email && (
              <div className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center">
                <span className="mr-2">📱</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.address && (
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {personalInfo.summary && (
        <div className="mb-8">
          <div className="w-20 h-1 mb-3" style={{ backgroundColor: colors.primary }}></div>
          <p className="text-lg">{personalInfo.summary}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(education.length > 0 || experience.length > 0) && (
          <div>
            {education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: colors.primary }}>
                  Education
                </h2>
                {education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">{edu.institution}</h3>
                      <span className="text-sm">{edu.year}</span>
                    </div>
                    <p className="text-gray-700">{edu.degree}</p>
                  </div>
                ))}
              </div>
            )}
            
            {experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: colors.primary }}>
                  Experience
                </h2>
                {experience.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <span className="text-sm">{exp.duration}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{exp.company}</p>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: colors.primary }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: colors.primary, 
                    color: colors.background 
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;