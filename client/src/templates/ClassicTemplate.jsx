import React from 'react';

const ClassicTemplate = ({ resume }) => {
  const { personalInfo, education, experience, skills, colors } = resume;
  
  return (
    <div className="classic-template" 
         style={{ 
           backgroundColor: colors.background, 
           color: colors.primary,
           fontFamily: 'Arial, sans-serif',
           padding: '40px'
         }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        borderBottom: `2px solid ${colors.secondary}`,
        paddingBottom: '20px'
      }}>
        {personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profile" 
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '15px'
            }}
          />
        )}
        <h1 style={{ 
          margin: '5px 0', 
          fontSize: '36px',
          color: colors.primary
        }}>
          {personalInfo.name}
        </h1>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '20px',
          marginTop: '10px'
        }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </header>
      
      {personalInfo.summary && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ 
            borderBottom: `1px solid ${colors.secondary}`,
            paddingBottom: '5px',
            marginBottom: '15px'
          }}>
            Summary
          </h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}
      
      {education.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ 
            borderBottom: `1px solid ${colors.secondary}`,
            paddingBottom: '5px',
            marginBottom: '15px'
          }}>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={{ margin: '5px 0', fontWeight: 'bold' }}>{edu.institution}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{edu.degree}</span>
                <span>{edu.year}</span>
              </div>
            </div>
          ))}
        </section>
      )}
      
      {experience.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ 
            borderBottom: `1px solid ${colors.secondary}`,
            paddingBottom: '5px',
            marginBottom: '15px'
          }}>
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={{ margin: '5px 0', fontWeight: 'bold' }}>{exp.position} - {exp.company}</h3>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '5px'
              }}>
                <span>{exp.duration}</span>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}
      
      {skills.length > 0 && (
        <section>
          <h2 style={{ 
            borderBottom: `1px solid ${colors.secondary}`,
            paddingBottom: '5px',
            marginBottom: '15px'
          }}>
            Skills
          </h2>
          <ul style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '10px',
            paddingLeft: '0',
            listStyle: 'none'
          }}>
            {skills.map((skill, index) => (
              <li key={index} style={{ 
                backgroundColor: colors.secondary,
                color: colors.background,
                padding: '5px 15px',
                borderRadius: '20px'
              }}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;