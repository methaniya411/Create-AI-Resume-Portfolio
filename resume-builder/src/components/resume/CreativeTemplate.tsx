import React from 'react';
import type { ResumeData } from '../../data/types';
import styles from './CreativeTemplate.module.css';

interface TemplateProps {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, summary, education, experience, skills, projects, socialLinks } = data;

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className={styles.template}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.name}>{personalDetails.fullName || 'Your Name'}</h1>
          <div className={styles.contact}>
            {personalDetails.email && <span>{personalDetails.email}</span>}
            {personalDetails.phone && <span>{personalDetails.phone}</span>}
            {personalDetails.location && <span>{personalDetails.location}</span>}
          </div>
          <div className={styles.social}>
            {socialLinks.linkedin && <a href={socialLinks.linkedin}>LinkedIn</a>}
            {socialLinks.github && <a href={socialLinks.github}>GitHub</a>}
            {socialLinks.website && <a href={socialLinks.website}>Portfolio</a>}
          </div>
        </div>
        <div className={styles.heroAccent} />
      </div>

      <div className={styles.content}>
        {summary && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <p className={styles.summary}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className={styles.experience}>
                <div className={styles.expTimeline}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineLine} />
                </div>
                <div className={styles.expContent}>
                  <div className={styles.expHeader}>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <span className={styles.date}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className={styles.company}>{exp.company}</div>
                  {exp.description && <p className={styles.description}>{exp.description}</p>}
                  {exp.bulletPoints.length > 0 && (
                    <ul className={styles.bullets}>
                      {exp.bulletPoints.filter(b => b).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className={styles.education}>
                <div className={styles.eduHeader}>
                  <h3 className={styles.degree}>{edu.degree} in {edu.field}</h3>
                  <span className={styles.date}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                <div className={styles.institution}>{edu.institution}</div>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
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

        {projects.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>
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
      </div>
    </div>
  );
};