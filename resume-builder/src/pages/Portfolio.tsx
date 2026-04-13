import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Globe, ExternalLink } from 'lucide-react';
import { useResumeStore } from '../stores/resumeStore';
import styles from './Portfolio.module.css';

export const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useResumeStore();
  const { personalDetails, summary, skills, projects, experience, education, socialLinks } = data;

  return (
    <div className={styles.portfolio}>
      <nav className={styles.nav}>
        <button className={styles.backButton} onClick={() => navigate('/preview')}>
          <ArrowLeft size={18} />
          Back to Resume
        </button>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.name}>{personalDetails.fullName || 'Your Name'}</h1>
          {personalDetails.location && <p className={styles.location}>{personalDetails.location}</p>}
          <div className={styles.contactInfo}>
            {personalDetails.email && (
              <a href={`mailto:${personalDetails.email}`} className={styles.contactItem}>
                <Mail size={16} />
                {personalDetails.email}
              </a>
            )}
          </div>
          <div className={styles.socialLinks}>
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Globe size={20} />
              </a>
            )}
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Globe size={20} />
              </a>
            )}
            {socialLinks.website && (
              <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Globe size={20} />
              </a>
            )}
          </div>
        </div>
      </header>

      {summary && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <p className={styles.summary}>{summary}</p>
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className={styles.skillsGrid}>
              {['technical', 'soft', 'language'].map(cat => {
                const catSkills = skills.filter(s => s.category === cat);
                if (catSkills.length === 0) return null;
                return (
                  <div key={cat} className={styles.skillCategory}>
                    <h3 className={styles.skillCategoryTitle}>
                      {cat === 'technical' ? 'Technical' : cat === 'soft' ? 'Soft Skills' : 'Languages'}
                    </h3>
                    <div className={styles.skillTags}>
                      {catSkills.map(skill => (
                        <span key={skill.id} className={styles.skillTag}>{skill.name}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <div className={styles.projectsGrid}>
              {projects.map(project => (
                <div key={project.id} className={styles.projectCard}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                  {project.techStack.filter(t => t).length > 0 && (
                    <div className={styles.projectTech}>
                      {project.techStack.filter(t => t).map((tech, i) => (
                        <span key={i} className={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                  )}
                  <div className={styles.projectLinks}>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        <Globe size={14} /> Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className={styles.timeline}>
              {experience.map((exp) => (
                <div key={exp.id} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <div className={styles.expHeader}>
                      <h3 className={styles.expRole}>{exp.role}</h3>
                      <span className={styles.expDate}>
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className={styles.expCompany}>{exp.company}</p>
                    {exp.description && <p className={styles.expDesc}>{exp.description}</p>}
                    {exp.bulletPoints.filter(b => b).length > 0 && (
                      <ul className={styles.expBullets}>
                        {exp.bulletPoints.filter(b => b).map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.educationGrid}>
              {education.map(edu => (
                <div key={edu.id} className={styles.eduCard}>
                  <h3 className={styles.eduDegree}>{edu.degree}{edu.field && ` in ${edu.field}`}</h3>
                  <p className={styles.eduInstitution}>{edu.institution}</p>
                  <span className={styles.eduDate}>
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className={styles.footer}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <p className={styles.footerText}>
            Feel free to reach out for collaborations, job opportunities, or just to say hello!
          </p>
          <div className={styles.footerContact}>
            {personalDetails.email && (
              <a href={`mailto:${personalDetails.email}`} className={styles.footerLink}>
                <Mail size={18} />
                {personalDetails.email}
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                <Globe size={18} />
                LinkedIn
              </a>
            )}
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                <Globe size={18} />
                GitHub
              </a>
            )}
          </div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {personalDetails.fullName || 'Your Name'}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};