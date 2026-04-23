import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Globe, ExternalLink, Hash, Cpu, Settings, X, Palette, Sparkles, Download, Check, FileText, Code } from 'lucide-react';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { InnovationSpotlight } from '../components/portfolio/InnovationSpotlight';
import { useResumeStore } from '../stores/resumeStore';
import styles from './Portfolio.module.css';

const THEMES = {
  dark: {
    bgStart: '#1a1a2e',
    bgEnd: '#0f0f1a',
    textMain: '#e0e0e0',
    textMuted: '#aaa',
  },
  light: {
    bgStart: '#f8fafc',
    bgEnd: '#e2e8f0',
    textMain: '#1e293b',
    textMuted: '#64748b',
  },
  midnight: {
    bgStart: '#020617',
    bgEnd: '#0f172a',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
  },
  ocean: {
    bgStart: '#0c4a6e',
    bgEnd: '#082f49',
    textMain: '#f0f9ff',
    textMuted: '#bae6fd',
  },
};

const ANIMATIONS = {
  fade: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.6 }
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  none: {
    initial: {},
    whileInView: {},
    transition: {}
  }
};

export const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const { data, portfolioSettings, setPortfolioSettings } = useResumeStore();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'html' | 'json' | null>(null);
  const { personalDetails, summary, skills, projects, experience, education, socialLinks } = data;

  const handleDownloadJSON = () => {
    try {
      setIsDownloading(true);
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${personalDetails.fullName || 'portfolio'}-data.json`;
      link.click();
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setDownloadFormat('json');
      setTimeout(() => { setDownloadSuccess(false); setDownloadFormat(null); }, 2000);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download JSON. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadHTML = () => {
    try {
      setIsDownloading(true);
      const htmlContent = generateStandaloneHTML(data, portfolioSettings);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${personalDetails.fullName || 'portfolio'}.html`;
      link.click();
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setDownloadFormat('html');
      setTimeout(() => { setDownloadSuccess(false); setDownloadFormat(null); }, 2000);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download HTML. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const generateStandaloneHTML = (portfolioData: typeof data, settings: typeof portfolioSettings) => {
    const theme = THEMES[settings.theme] || THEMES.dark;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolioData.personalDetails.fullName || 'Portfolio'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: radial-gradient(circle at top center, ${theme.bgStart} 0%, ${theme.bgEnd} 100%); color: ${theme.textMain}; min-height: 100vh; padding: 2rem; }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { font-size: 3rem; margin-bottom: 0.5rem; }
    .location { color: ${theme.textMuted}; margin-bottom: 2rem; }
    .section { margin-bottom: 3rem; }
    .section h2 { font-size: 1.5rem; margin-bottom: 1rem; color: ${settings.primaryColor}; }
    .summary { font-size: 1.2rem; line-height: 1.8; color: ${theme.textMuted}; }
    .skills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .skill { padding: 0.5rem 1rem; background: rgba(255,255,255,0.1); border-radius: 100px; font-size: 0.875rem; }
    .project { background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; }
    .project h3 { margin-bottom: 0.5rem; }
    .project p { color: ${theme.textMuted}; }
    .experience { margin-bottom: 1.5rem; }
    .experience h3 { font-size: 1.25rem; }
    .company { color: ${settings.primaryColor}; margin-bottom: 0.5rem; }
    .date { color: ${theme.textMuted}; font-size: 0.875rem; }
    ul { margin-left: 1.5rem; color: ${theme.textMuted}; }
    .contact { display: flex; gap: 1rem; margin-top: 2rem; }
    .contact a { color: ${settings.primaryColor}; text-decoration: none; }
    @media (max-width: 768px) { h1 { font-size: 2rem; } }
  </style>
</head>
<body>
  <div class="container">
    <h1>${portfolioData.personalDetails.fullName || 'Your Name'}</h1>
    ${portfolioData.personalDetails.location ? `<p class="location">${portfolioData.personalDetails.location}</p>` : ''}
    ${portfolioData.personalDetails.email ? `<div class="contact"><a href="mailto:${portfolioData.personalDetails.email}">${portfolioData.personalDetails.email}</a></div>` : ''}
    ${portfolioData.summary ? `
    <div class="section">
      <h2>About Me</h2>
      <p class="summary">${portfolioData.summary}</p>
    </div>` : ''}
    ${portfolioData.skills.length > 0 ? `
    <div class="section">
      <h2>Skills</h2>
      <div class="skills">
        ${portfolioData.skills.map(s => `<span class="skill">${s.name}</span>`).join('')}
      </div>
    </div>` : ''}
    ${portfolioData.projects.length > 0 ? `
    <div class="section">
      <h2>Projects</h2>
      ${portfolioData.projects.map(p => `
        <div class="project">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
        </div>`).join('')}
    </div>` : ''}
    ${portfolioData.experience.length > 0 ? `
    <div class="section">
      <h2>Experience</h2>
      ${portfolioData.experience.map(e => `
        <div class="experience">
          <h3>${e.role}</h3>
          <p class="company">${e.company}</p>
          <p class="date">${e.startDate} - ${e.current ? 'Present' : e.endDate}</p>
          ${e.description ? `<p>${e.description}</p>` : ''}
        </div>`).join('')}
    </div>` : ''}
    ${portfolioData.education.length > 0 ? `
    <div class="section">
      <h2>Education</h2>
      ${portfolioData.education.map(e => `
        <div class="experience">
          <h3>${e.degree}${e.field ? ' in ' + e.field : ''}</h3>
          <p class="company">${e.institution}</p>
          <p class="date">${e.startDate} - ${e.endDate}</p>
        </div>`).join('')}
    </div>` : ''}
  </div>
</body>
</html>`;
  };

  const currentTheme = THEMES[portfolioSettings.theme] || THEMES.dark;

  const dynamicStyles = {
    '--primary-color': portfolioSettings.primaryColor,
    '--bg-start': currentTheme.bgStart,
    '--bg-end': currentTheme.bgEnd,
    '--text-main': currentTheme.textMain,
    '--text-muted': currentTheme.textMuted,
  } as React.CSSProperties;

  const animationProps = ANIMATIONS[portfolioSettings.animationStyle] || ANIMATIONS.none;

  return (
    <div className={styles.portfolio} style={dynamicStyles}>
      <nav className={styles.nav}>
        <button className={styles.backButton} onClick={() => navigate('/preview')}>
          <ArrowLeft size={18} />
          Back to Resume
        </button>
        <div className={styles.navActions}>
          <div className={styles.downloadContainer}>
            <button 
              className={`${styles.downloadButton} ${downloadSuccess ? styles.downloadSuccess : ''}`}
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              disabled={isDownloading}
            >
              <Download size={18} />
              Download
            </button>
            {showDownloadMenu && (
              <div className={styles.downloadMenu}>
                <button 
                  className={styles.downloadOption}
                  onClick={() => { handleDownloadHTML(); setShowDownloadMenu(false); }}
                  disabled={isDownloading}
                >
                  <Code size={16} />
                  HTML Archive
                </button>
                <button 
                  className={styles.downloadOption}
                  onClick={() => { handleDownloadJSON(); setShowDownloadMenu(false); }}
                  disabled={isDownloading}
                >
                  <FileText size={16} />
                  JSON Data
                </button>
              </div>
            )}
          </div>
          <button 
            className={styles.backButton} 
            onClick={() => setIsPanelOpen(true)}
          >
            <Settings size={18} />
            Customize
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isPanelOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={styles.customizationPanel}
          >
            <div className={styles.panelHeader}>
              <h2><Palette size={20} /> Customization</h2>
              <button onClick={() => setIsPanelOpen(false)} className={styles.closeButton}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.panelContent}>
              <div className={styles.settingGroup}>
                <label>Theme</label>
                <div className={styles.themeGrid}>
                  {Object.entries(THEMES).map(([name, colors]) => (
                    <button 
                      key={name}
                      className={`${styles.themeOption} ${portfolioSettings.theme === name ? styles.themeActive : ''}`}
                      onClick={() => setPortfolioSettings({ theme: name as any })}
                      style={{ background: `linear-gradient(135deg, ${colors.bgStart}, ${colors.bgEnd})` }}
                      title={name}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.settingGroup}>
                <label>Primary Color</label>
                <div className={styles.colorPicker}>
                  <input 
                    type="color" 
                    value={portfolioSettings.primaryColor} 
                    onChange={(e) => setPortfolioSettings({ primaryColor: e.target.value })}
                  />
                  <input 
                    type="text" 
                    value={portfolioSettings.primaryColor} 
                    onChange={(e) => setPortfolioSettings({ primaryColor: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.settingGroup}>
                <label>Animations <Sparkles size={14} /></label>
                <div className={styles.optionGrid}>
                  {(['none', 'fade', 'slide'] as const).map(style => (
                    <button 
                      key={style}
                      className={`${styles.optionButton} ${portfolioSettings.animationStyle === style ? styles.optionActive : ''}`}
                      onClick={() => setPortfolioSettings({ animationStyle: style })}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <motion.h1 
            {...animationProps}
            className={styles.name}
          >
            {personalDetails.fullName || 'Your Name'}
          </motion.h1>
          {personalDetails.location && (
            <motion.p 
              {...animationProps}
              transition={{ ...animationProps.transition, delay: 0.1 }}
              className={styles.location}
            >
              {personalDetails.location}
            </motion.p>
          )}
          <motion.p 
            {...animationProps}
            transition={{ ...animationProps.transition, delay: 0.2 }}
            className={styles.heroSubtitle}
          >
            Building <span>intelligent solutions</span> with data & code
          </motion.p>
          
          <motion.div 
            {...animationProps}
            transition={{ ...animationProps.transition, delay: 0.3 }}
            className={styles.contactInfo}
          >
            {personalDetails.email && (
              <a href={`mailto:${personalDetails.email}`} className={styles.contactItem}>
                <Mail size={16} />
                {personalDetails.email}
              </a>
            )}
          </motion.div>
          
          <motion.div 
            {...animationProps}
            transition={{ ...animationProps.transition, delay: 0.4 }}
            className={styles.socialLinks}
          >
            {socialLinks.linkedin && (
              <a href="https://www.linkedin.com/in/methaniya-harsh-429419281" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaLinkedin size={20} />
              </a>
            )}
            {socialLinks.github && (
              <a href="https://github.com/methaniya411" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaGithub size={20} />
              </a>
            )}
            {socialLinks.website && (
              <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <ExternalLink size={20} />
              </a>
            )}
          </motion.div>
        </div>
      </header>

      {skills.length > 0 && (
        <motion.section {...animationProps} className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            
            <div className={styles.topSkills}>
              {skills.slice(0, 6).map(skill => (
                <span key={skill.id} className={styles.topSkill}>{skill.name}</span>
              ))}
            </div>
            
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
        </motion.section>
      )}

      <InnovationSpotlight 
        projectName="AI Duplicate Photo Detector"
        evolution={[
          {
            version: 'v1.0',
            title: 'Binary Hashing',
            description: 'Used MD5 hashing to find identical files. Extremely fast but failed if the image was resized or slightly edited.',
            tech: 'Python, Hashlib',
            icon: <Hash size={20} />
          },
          {
            version: 'v2.0',
            title: 'AI Feature Embeddings',
            description: 'Leveraged a pre-trained ResNet-18 model to extract visual embeddings, allowing for "semantic" similarity detection.',
            tech: 'PyTorch, Torchvision',
            icon: <Cpu size={20} />
          }
        ]}
      />

      {projects.length > 0 && (
        <motion.section {...animationProps} className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <div className={styles.projectsGrid}>
              {projects.map((project, index) => (
                <div key={project.id} className={styles.projectCard}>
                  <div className={styles.projectIcon}>
                    <Code size={24} />
                  </div>
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
                      <a href="https://github.com/methaniya411" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        <FaGithub size={14} /> Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {experience.length > 0 && (
        <motion.section {...animationProps} className={styles.section}>
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
        </motion.section>
      )}

      {education.length > 0 && (
        <motion.section {...animationProps} className={styles.section}>
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
        </motion.section>
      )}

      {summary && (
        <motion.section {...animationProps} className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <p className={styles.summary}>{summary}</p>
          </div>
        </motion.section>
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
              <a href="https://www.linkedin.com/in/methaniya-harsh-429419281" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                <FaLinkedin size={18} />
                LinkedIn
              </a>
            )}
            {socialLinks.github && (
              <a href="https://github.com/methaniya411" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                <FaGithub size={18} />
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