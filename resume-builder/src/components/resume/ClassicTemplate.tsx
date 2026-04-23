import React from 'react';
import type { ResumeData } from '../../data/types';
import styles from './ClassicTemplate.module.css';

interface TemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, summary, education, experience, skills, projects, certifications, socialLinks } = data;

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className={styles.template}>
      <header className={styles.header}>
        <h1 className={styles.name}>{personalDetails.fullName || 'Your Name'}</h1>
        <div className={styles.contact}>
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>{personalDetails.phone}</span>}
          {personalDetails.location && <span>{personalDetails.location}</span>}
        </div>
        <div className={styles.social}>
          {socialLinks.linkedin && <span>LinkedIn: {socialLinks.linkedin}</span>}
          {socialLinks.github && <span>GitHub: {socialLinks.github}</span>}
        </div>
      </header>

      {summary && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>PROFESSIONAL SUMMARY</h2>
          <p className={styles.summary}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</h2>
          {experience.map(exp => (
            <div key={exp.id} className={styles.experience}>
              <div className={styles.expHeader}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.date}>
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <div className={styles.company}>{exp.company}{exp.location && `, ${exp.location}`}</div>
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
        </section>
      )}

      {education.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>EDUCATION</h2>
          {education.map(edu => (
            <div key={edu.id} className={styles.education}>
              <div className={styles.eduHeader}>
                <h3 className={styles.degree}>{edu.degree}{edu.field && ` in ${edu.field}`}</h3>
                <span className={styles.date}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
              <div className={styles.institution}>{edu.institution}</div>
              {edu.gpa && <div className={styles.gpa}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>SKILLS</h2>
          {skills.filter(s => s.category === 'technical').length > 0 && (
            <div className={styles.skillCategory}>
              <span className={styles.categoryLabel}>Technical:</span>
              <div className={styles.skills}>
                {skills.filter(s => s.category === 'technical').map(skill => (
                  <span key={skill.id} className={styles.skill}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {skills.filter(s => s.category === 'soft').length > 0 && (
            <div className={styles.skillCategory}>
              <span className={styles.categoryLabel}>Soft Skills:</span>
              <div className={styles.skills}>
                {skills.filter(s => s.category === 'soft').map(skill => (
                  <span key={skill.id} className={styles.skill}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {skills.filter(s => s.category === 'language').length > 0 && (
            <div className={styles.skillCategory}>
              <span className={styles.categoryLabel}>Languages:</span>
              <div className={styles.skills}>
                {skills.filter(s => s.category === 'language').map(skill => (
                  <span key={skill.id} className={styles.skill}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {projects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>PROJECTS</h2>
          {projects.map(project => (
            <div key={project.id} className={styles.project}>
              <h3 className={styles.projectName}>{project.name}</h3>
              <p className={styles.description}>{project.description}</p>
              {project.techStack.length > 0 && (
                <div className={styles.tech}>Technologies: {project.techStack.filter(t => t).join(', ')}</div>
              )}
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>CERTIFICATIONS</h2>
          {certifications.map(cert => (
            <div key={cert.id} className={styles.certification}>
              <span className={styles.certName}>{cert.name}</span>
              <span className={styles.certIssuer}>{cert.issuer} - {formatDate(cert.date)}</span>
            </div>
          ))}
        </section>
      )}

      {data.achievements.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>ACHIEVEMENTS</h2>
          {data.achievements.map(ach => (
            <div key={ach.id} className={styles.certification}>
              <span className={styles.certName}>{ach.title}</span>
              <span className={styles.certIssuer}>{formatDate(ach.date)}</span>
              {ach.description && <p className={styles.description}>{ach.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};