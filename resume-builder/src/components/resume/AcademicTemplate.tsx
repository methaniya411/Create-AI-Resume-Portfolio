import React from 'react';
import type { ResumeData } from '../../data/types';
import styles from './AcademicTemplate.module.css';

interface TemplateProps {
  data: ResumeData;
}

export const AcademicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, summary, education, experience, skills, projects, certifications, achievements, socialLinks } = data;

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return `${month}/${year}`;
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
          {socialLinks.linkedin && <span>LinkedIn</span>}
          {socialLinks.github && <span>GitHub</span>}
          {socialLinks.website && <span>Website</span>}
        </div>
      </header>

      {summary && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Research Interests</h2>
          <p className={styles.summary}>{summary}</p>
        </section>
      )}

      {education.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} className={styles.education}>
              <div className={styles.eduMain}>
                <h3 className={styles.degree}>{edu.degree}{edu.field && ` in ${edu.field}`}</h3>
                <span className={styles.institution}>{edu.institution}</span>
              </div>
              <div className={styles.eduDetails}>
                <span className={styles.date}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                {edu.gpa && <span className={styles.gpa}>GPA: {edu.gpa}</span>}
              </div>
              {edu.description && <p className={styles.eduDesc}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Research & Professional Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className={styles.experience}>
              <div className={styles.expMain}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.company}>{exp.company}</span>
              </div>
              <div className={styles.expDetails}>
                <span className={styles.date}>
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
                {exp.location && <span className={styles.location}>{exp.location}</span>}
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
        </section>
      )}

      {projects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Research Projects</h2>
          {projects.map(project => (
            <div key={project.id} className={styles.project}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectName}>{project.name}</h3>
                {project.url && <span className={styles.projectLink}>{project.url}</span>}
              </div>
              <p className={styles.description}>{project.description}</p>
              {project.techStack.length > 0 && (
                <div className={styles.techStack}>
                  <span className={styles.techLabel}>Technologies:</span> {project.techStack.filter(t => t).join(', ')}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <div className={styles.skillsList}>
            {['technical', 'soft', 'language'].map(cat => {
              const catSkills = skills.filter(s => s.category === cat);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat} className={styles.skillCategory}>
                  <span className={styles.skillType}>{cat === 'technical' ? 'Technical:' : cat === 'soft' ? 'Soft Skills:' : 'Languages:'}</span>
                  <span className={styles.skillNames}>
                    {catSkills.map(s => s.name).join(', ')}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Certifications & Training</h2>
          {certifications.map(cert => (
            <div key={cert.id} className={styles.certification}>
              <span className={styles.certName}>{cert.name}</span>
              <span className={styles.certDetails}>{cert.issuer} | {formatDate(cert.date)}</span>
            </div>
          ))}
        </section>
      )}

      {achievements.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Awards & Honors</h2>
          {achievements.map(ach => (
            <div key={ach.id} className={styles.achievement}>
              <span className={styles.achTitle}>{ach.title}</span>
              {ach.date && <span className={styles.achDate}>{formatDate(ach.date)}</span>}
              {ach.description && <p className={styles.achDesc}>{ach.description}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};