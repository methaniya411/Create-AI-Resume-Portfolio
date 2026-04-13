import React from 'react';
import type { ResumeData } from '../../data/types';
import styles from './TechTemplate.module.css';

interface TemplateProps {
  data: ResumeData;
}

export const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, summary, education, experience, skills, projects, socialLinks } = data;

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return `${month}/${year.slice(2)}`;
  };

  return (
    <div className={styles.template}>
      <header className={styles.header}>
        <div className={styles.codeBlock}>
          <span className={styles.keyword}>const</span> <span className={styles.variable}>developer</span> = {' {'}
        </div>
        <div className={styles.headerInfo}>
          <div className={styles.infoLine}>
            <span className={styles.key}>name:</span> <span className={styles.string}>"{personalDetails.fullName || 'Your Name'}"</span>,
          </div>
          <div className={styles.infoLine}>
            <span className={styles.key}>email:</span> <span className={styles.string}>"{personalDetails.email || 'email@example.com'}"</span>,
          </div>
          {personalDetails.location && (
            <div className={styles.infoLine}>
              <span className={styles.key}>location:</span> <span className={styles.string}>"{personalDetails.location}"</span>,
            </div>
          )}
          {socialLinks.github && (
            <div className={styles.infoLine}>
              <span className={styles.key}>github:</span> <span className={styles.string}>"{socialLinks.github}"</span>,
            </div>
          )}
          {socialLinks.linkedin && (
            <div className={styles.infoLine}>
              <span className={styles.key}>linkedin:</span> <span className={styles.string}>"{socialLinks.linkedin}"</span>,
            </div>
          )}
        <div className={styles.codeBlock}>
          {' }'}
        </div>
        </div>
      </header>

      {summary && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.comment}>// Summary</span>
          </div>
          <p className={styles.summary}>{summary}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.comment}>// Skills</span>
          </div>
          <div className={styles.skillsGrid}>
            {['technical', 'soft', 'language'].map(cat => {
              const catSkills = skills.filter(s => s.category === cat);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat} className={styles.skillCategory}>
                  <span className={styles.skillType}>{cat}:</span>
                  <span className={styles.skillList}>
                    {catSkills.map(s => s.name).join(', ')}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.comment}>// Experience</span>
          </div>
          {experience.map(exp => (
            <div key={exp.id} className={styles.experience}>
              <div className={styles.expHeader}>
                <span className={styles.role}>{exp.role}</span>
                <span className={styles.date}>
                  [{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}]
                </span>
              </div>
              <div className={styles.company}>{exp.company}</div>
              {exp.bulletPoints.length > 0 && (
                <ul className={styles.bullets}>
                  {exp.bulletPoints.filter(b => b).map((bullet, i) => (
                    <li key={i}><span className={styles.bulletArrow}>→</span> {bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.comment}>// Projects</span>
          </div>
          {projects.map(project => (
            <div key={project.id} className={styles.project}>
              <div className={styles.projectHeader}>
                <span className={styles.projectName}>{project.name}</span>
                {project.url && <span className={styles.projectLink}>[{project.url}]</span>}
              </div>
              <p className={styles.description}>{project.description}</p>
              {project.techStack.length > 0 && (
                <div className={styles.techStack}>
                  <span className={styles.techLabel}>tech:</span>
                  [{project.techStack.filter(t => t).join(', ')}]
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.comment}>// Education</span>
          </div>
          {education.map(edu => (
            <div key={edu.id} className={styles.education}>
              <span className={styles.degree}>{edu.degree}{edu.field && ` in ${edu.field}`}</span>
              <span className={styles.eduDetails}>
                @ {edu.institution} [{formatDate(edu.startDate)} - {formatDate(edu.endDate)}]
              </span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};