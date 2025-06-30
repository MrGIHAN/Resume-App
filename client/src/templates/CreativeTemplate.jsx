import React from 'react';

const CreativeTemplate = ({ resume }) => {
  const { personalInfo, education, experience, skills, colors } = resume;
  
  return (
    <div 
      className="creative-template p-10"
      style={{ 
        backgroundColor: colors.background, 
        color: colors.primary,
        fontFamily: 'Georgia, serif'
      }}
    >
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4" style={{ color: colors.primary }}>
          {personalInfo.name}
        </h1>
        
        <div className="flex justify-center flex-wrap gap-6 mb-6">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
        
        {personalInfo.photoUrl && (
          <div className="flex justify-center mb-6">
            <img 
              src={personalInfo.photoUrl} 
              alt="Profile" 
              className="w-40 h-40 rounded-full object-cover border-4"
              style={{ borderColor: colors.secondary }}
            />
          </div>
        )}
        
        {personalInfo.summary && (
          <div className="max-w-2xl mx-auto">
            <p className="text-lg italic">{personalInfo.summary}</p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {(education.length > 0 || skills.length > 0) && (
          <div>
            {education.length > 0 && (
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary }}>
                  Education
                </h2>
                {education.map((edu, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-semibold mb-1">{edu.institution}</h3>
                    <div className="flex justify-between mb-1">
                      <span>{edu.degree}</span>
                      <span>{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {skills.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary }}>
                  Skills
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-lg text-center"
                      style={{ 
                        backgroundColor: colors.secondary, 
                        color: colors.background 
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {experience.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: colors.primary }}>
              Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-8">
                <div className="flex justify-between mb-2">
                  <h3 className="text-xl font-semibold">{exp.position}</h3>
                  <span>{exp.duration}</span>
                </div>
                <p className="text-lg mb-3" style={{ color: colors.secondary }}>{exp.company}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;