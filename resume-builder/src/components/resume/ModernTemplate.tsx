import React from 'react';
import type { ResumeData } from '../../data/types';
import styles from './ModernTemplate.module.css';

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, summary, education, experience, skills, projects, certifications, socialLinks } = data;

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className={styles.template}>
      <div className={styles.sidebar}>
        {personalDetails.photo && (
          <img src={personalDetails.photo} alt={personalDetails.fullName} className={styles.photo} />
        )}
        <h1 className={styles.name}>{personalDetails.fullName || 'Your Name'}</h1>
        
        <div className={styles.contact}>
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>{personalDetails.phone}</span>}
          {personalDetails.location && <span>{personalDetails.location}</span>}
        </div>

        <div className={styles.socialLinks}>
          {socialLinks.linkedin && <a href={socialLinks.linkedin}>LinkedIn</a>}
          {socialLinks.github && <a href={socialLinks.github}>GitHub</a>}
          {socialLinks.website && <a href={socialLinks.website}>Website</a>}
        </div>

        {skills.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Skills</h3>
            {skills.filter(s => s.category === 'technical').length > 0 && (
              <div className={styles.skillCategory}>
                <span className={styles.categoryLabel} style={{ color: '#6366f1' }}>Technical</span>
                <div className={styles.skills}>
                  {skills.filter(s => s.category === 'technical').map(skill => (
                    <span key={skill.id} className={styles.skill}>{skill.name}</span>
                  ))}
                </div>
              </div>
            )}
            {skills.filter(s => s.category === 'soft').length > 0 && (
              <div className={styles.skillCategory}>
                <span className={styles.categoryLabel} style={{ color: '#8b5cf6' }}>Soft Skills</span>
                <div className={styles.skills}>
                  {skills.filter(s => s.category === 'soft').map(skill => (
                    <span key={skill.id} className={styles.skillSoft}>{skill.name}</span>
                  ))}
                </div>
              </div>
            )}
            {skills.filter(s => s.category === 'language').length > 0 && (
              <div className={styles.skillCategory}>
                <span className={styles.categoryLabel} style={{ color: '#10b981' }}>Languages</span>
                <div className={styles.skills}>
                  {skills.filter(s => s.category === 'language').map(skill => (
                    <span key={skill.id} className={styles.skillLang}>{skill.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.main}>
        {summary && (
          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Professional Summary</h2>
            <p className={styles.summary}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className={styles.experience}>
                <div className={styles.experienceHeader}>
                  <div>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <span className={styles.company}>{exp.company}</span>
                  </div>
                  <span className={styles.date}>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && <p className={styles.description}>{exp.description}</p>}
                {exp.bulletPoints.length > 0 && (
                  <ul className={styles.bullets}>
                    {exp.bulletPoints.filter(b => b).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className={styles.education}>
                <div className={styles.educationHeader}>
                  <div>
                    <h3 className={styles.degree}>{edu.degree} in {edu.field}</h3>
                    <span className={styles.institution}>{edu.institution}</span>
                  </div>
                  <span className={styles.date}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.gpa && <span className={styles.gpa}>GPA: {edu.gpa}</span>}
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Projects</h2>
            {projects.map(project => (
              <div key={project.id} className={styles.project}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.description}>{project.description}</p>
                {project.techStack.length > 0 && (
                  <div className={styles.techStack}>
                    {project.techStack.filter(t => t).map((tech, i) => (
                      <span key={i} className={styles.tech}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Certifications</h2>
            {certifications.map(cert => (
              <div key={cert.id} className={styles.certification}>
                <span className={styles.certName}>{cert.name}</span>
                <span className={styles.certIssuer}>{cert.issuer}</span>
              </div>
            ))}
          </div>
        )}

        {data.achievements.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionHeading}>Achievements</h2>
            {data.achievements.map(ach => (
              <div key={ach.id} className={styles.certification}>
                <span className={styles.certName}>{ach.title}</span>
                <span className={styles.certIssuer}>{ach.date}</span>
                {ach.description && <p className={styles.description}>{ach.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};