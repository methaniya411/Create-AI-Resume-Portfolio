import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import type { ResumeData, TemplateType } from '../../data/types';

Font.register({
  family: 'Outfit',
  src: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4E.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Outfit',
    fontSize: 10,
    color: '#1a1a2e',
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 8,
  },
  contact: {
    fontSize: 9,
    color: '#4a4a68',
    marginBottom: 4,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#6366f1',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5ea',
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#4a4a68',
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: 600,
  },
  entrySubtitle: {
    fontSize: 10,
    color: '#6366f1',
  },
  entryDate: {
    fontSize: 9,
    color: '#8888a0',
  },
  entryDesc: {
    fontSize: 9,
    color: '#4a4a68',
    marginTop: 2,
  },
  bullet: {
    fontSize: 9,
    color: '#4a4a68',
    marginLeft: 10,
    marginBottom: 2,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 9,
    padding: '3 8',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  projectTech: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginTop: 4,
  },
  tech: {
    fontSize: 8,
    color: '#6366f1',
  },
});

const formatDate = (date: string): string => {
  if (!date) return '';
  const parts = date.split('-');
  if (parts.length !== 2) return date;
  const [year, month] = parts;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = parseInt(month) - 1;
  return months[monthIndex] ? `${months[monthIndex]} ${year}` : date;
};

const getDateRange = (startDate: string, endDate: string, current: boolean): string => {
  const start = formatDate(startDate);
  const end = current ? 'Present' : formatDate(endDate);
  return [start, end].filter(Boolean).join(' - ');
};

const renderModernTemplate = (data: ResumeData) => {
  const { personalDetails, summary, education, experience, skills, projects, socialLinks } = data;
  const technicalSkills = skills.filter(s => s.category === 'technical');
  const softSkills = skills.filter(s => s.category === 'soft');
  const languageSkills = skills.filter(s => s.category === 'language');
  return (
    <Page size="A4" style={styles.page} wrap={false} fixed>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: 240, backgroundColor: '#6366f1', padding: 25, marginRight: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 15 }}>
            {personalDetails.fullName || 'Your Name'}
          </Text>
          <Text style={{ fontSize: 9, color: 'white', marginBottom: 5, opacity: 0.9 }}>
            {personalDetails.email}
          </Text>
          {personalDetails.phone && (
            <Text style={{ fontSize: 9, color: 'white', marginBottom: 5, opacity: 0.9 }}>
              {personalDetails.phone}
            </Text>
          )}
          {personalDetails.location && (
            <Text style={{ fontSize: 9, color: 'white', marginBottom: 15, opacity: 0.9 }}>
              {personalDetails.location}
            </Text>
          )}
          {socialLinks.github && (
            <Text style={{ fontSize: 9, color: 'white', marginBottom: 3, opacity: 0.9 }}>
              GitHub: {socialLinks.github}
            </Text>
          )}
          {socialLinks.linkedin && (
            <Text style={{ fontSize: 9, color: 'white', marginBottom: 3, opacity: 0.9 }}>
              LinkedIn: {socialLinks.linkedin}
            </Text>
          )}
          {skills.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 9, color: 'white', opacity: 0.8, marginBottom: 10, textTransform: 'uppercase' }}>
                Skills
              </Text>
              {technicalSkills.length > 0 && (
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 8, color: 'white', opacity: 0.7, marginBottom: 4 }}>Technical</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                    {technicalSkills.map((skill, i) => (
                      <Text key={i} style={{ fontSize: 8, color: 'white', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2 8', borderRadius: 10 }}>
                        {skill.name}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
              {softSkills.length > 0 && (
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 8, color: 'white', opacity: 0.7, marginBottom: 4 }}>Soft Skills</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                    {softSkills.map((skill, i) => (
                      <Text key={i} style={{ fontSize: 8, color: 'white', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2 8', borderRadius: 10 }}>
                        {skill.name}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
              {languageSkills.length > 0 && (
                <View>
                  <Text style={{ fontSize: 8, color: 'white', opacity: 0.7, marginBottom: 4 }}>Languages</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                    {languageSkills.map((skill, i) => (
                      <Text key={i} style={{ fontSize: 8, color: 'white', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2 8', borderRadius: 10 }}>
                        {skill.name}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
        <View style={{ flex: 1, paddingTop: 5 }}>
          {summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{summary}</Text>
            </View>
          )}
          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp, i) => (
                <View key={i} style={styles.entry}>
                  <View style={styles.entryHeader}>
                    <View>
                      <Text style={styles.entryTitle}>{exp.role}</Text>
                      <Text style={styles.entrySubtitle}>{exp.company}</Text>
                    </View>
                    <Text style={styles.entryDate}>
                      {getDateRange(exp.startDate, exp.endDate, exp.current)}
                    </Text>
                  </View>
                  {exp.description && <Text style={styles.entryDesc}>{exp.description}</Text>}
                  {exp.bulletPoints && exp.bulletPoints.filter(b => b).map((bullet, j) => (
                    <Text key={j} style={styles.bullet}>• {bullet}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}
          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={styles.entry}>
                  <View style={styles.entryHeader}>
                    <View>
                      <Text style={styles.entryTitle}>{edu.degree}{edu.field && ` in ${edu.field}`}</Text>
                      <Text style={styles.entrySubtitle}>{edu.institution}</Text>
                    </View>
                    <Text style={styles.entryDate}>{getDateRange(edu.startDate, edu.endDate, false)}</Text>
                  </View>
                  {edu.gpa && <Text style={{ fontSize: 9, color: '#8888a0' }}>GPA: {edu.gpa}</Text>}
                </View>
              ))}
            </View>
          )}
          {projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((project, i) => (
                <View key={i} style={styles.entry}>
                  <Text style={styles.entryTitle}>{project.name}</Text>
                  <Text style={styles.entryDesc}>{project.description}</Text>
                  {project.techStack && project.techStack.filter(t => t).length > 0 && (
                    <View style={styles.projectTech}>
                      {project.techStack.filter(t => t).map((tech, j) => (
                        <Text key={j} style={styles.tech}>{tech}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  );
};

const renderClassicTemplate = (data: ResumeData) => {
  const { personalDetails, summary, education, experience, skills, projects, socialLinks } = data;
  const technicalSkills = skills.filter(s => s.category === 'technical');
  const softSkills = skills.filter(s => s.category === 'soft');
  const languageSkills = skills.filter(s => s.category === 'language');
  return (
    <Page size="A4" style={{ ...styles.page, fontFamily: 'Times-Roman' }}>
      <View style={{ textAlign: 'center', marginBottom: 20, paddingBottom: 15, borderBottomWidth: 2, borderBottomColor: '#1a1a2e' }}>
        <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{personalDetails.fullName || 'Your Name'}</Text>
        <Text style={{ fontSize: 10, color: '#4a4a68' }}>
          {personalDetails.email} | {personalDetails.phone} | {personalDetails.location}
        </Text>
        <Text style={{ fontSize: 9, color: '#6366f1', marginTop: 4 }}>
          {socialLinks.linkedin && `LinkedIn: ${socialLinks.linkedin} `}
          {socialLinks.github && `GitHub: ${socialLinks.github}`}
        </Text>
      </View>
      {summary && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, fontSize: 11 }}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.summary}>{summary}</Text>
        </View>
      )}
      {experience.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, fontSize: 11 }}>PROFESSIONAL EXPERIENCE</Text>
          {experience.map((exp, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{exp.role}</Text>
                <Text style={styles.entryDate}>{getDateRange(exp.startDate, exp.endDate, exp.current)}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{exp.company}</Text>
              {exp.description && <Text style={styles.entryDesc}>{exp.description}</Text>}
              {exp.bulletPoints && exp.bulletPoints.filter(b => b).map((bullet, j) => (
                <Text key={j} style={styles.bullet}>• {bullet}</Text>
              ))}
            </View>
          ))}
        </View>
      )}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, fontSize: 11 }}>EDUCATION</Text>
          {education.map((edu, i) => (
            <View key={i} style={{ ...styles.entry, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.entryTitle}>{edu.degree}{edu.field && ` in ${edu.field}`}</Text>
                <Text style={styles.entrySubtitle}>{edu.institution}</Text>
              </View>
              <Text style={styles.entryDate}>{getDateRange(edu.startDate, edu.endDate, false)}</Text>
            </View>
          ))}
        </View>
      )}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, fontSize: 11 }}>PROJECTS</Text>
          {projects.map((project, i) => (
            <View key={i} style={styles.entry}>
              <Text style={styles.entryTitle}>{project.name || 'Untitled Project'}</Text>
              <Text style={styles.entryDesc}>{project.description || ''}</Text>
              {project.techStack && Array.isArray(project.techStack) && project.techStack.filter((t) => t).length > 0 && (
                <Text style={{ fontSize: 9, color: '#6366f1', marginTop: 2 }}>
                  Tech: {project.techStack.filter((t) => t).join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, fontSize: 11 }}>SKILLS</Text>
          {technicalSkills.length > 0 && (
            <View style={{ marginBottom: 6 }}>
              <Text style={{ fontSize: 10, fontWeight: 600, marginBottom: 2 }}>Technical:</Text>
              <Text style={styles.entryDesc}>{technicalSkills.map(s => s.name).join(', ')}</Text>
            </View>
          )}
          {softSkills.length > 0 && (
            <View style={{ marginBottom: 6 }}>
              <Text style={{ fontSize: 10, fontWeight: 600, marginBottom: 2 }}>Soft Skills:</Text>
              <Text style={styles.entryDesc}>{softSkills.map(s => s.name).join(', ')}</Text>
            </View>
          )}
          {languageSkills.length > 0 && (
            <View>
              <Text style={{ fontSize: 10, fontWeight: 600, marginBottom: 2 }}>Languages:</Text>
              <Text style={styles.entryDesc}>{languageSkills.map(s => s.name).join(', ')}</Text>
            </View>
          )}
        </View>
      )}
    </Page>
  );
};

const renderCreativeTemplate = (data: ResumeData) => {
  const { personalDetails, summary, education, experience, skills, projects, socialLinks } = data;
  const technicalSkills = skills.filter(s => s.category === 'technical');
  const softSkills = skills.filter(s => s.category === 'soft');
  const languageSkills = skills.filter(s => s.category === 'language');
  return (
    <Page size="A4" style={styles.page} wrap={false} fixed>
      <View style={{ backgroundColor: '#f97316', padding: 30, marginBottom: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 10 }}>{personalDetails.fullName || 'Your Name'}</Text>
        <Text style={{ fontSize: 10, color: 'white', opacity: 0.9 }}>
          {personalDetails.email} | {personalDetails.phone} | {personalDetails.location}
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          {socialLinks.linkedin && <Text style={{ fontSize: 9, color: 'white', backgroundColor: 'rgba(255,255,255,0.2)', padding: '3 10', borderRadius: 10 }}>LinkedIn</Text>}
          {socialLinks.github && <Text style={{ fontSize: 9, color: 'white', backgroundColor: 'rgba(255,255,255,0.2)', padding: '3 10', borderRadius: 10 }}>GitHub</Text>}
        </View>
      </View>
      {summary && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: '#f97316' }}>About Me</Text>
          <Text style={styles.summary}>{summary}</Text>
        </View>
      )}
      {experience.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: '#f97316' }}>Experience</Text>
          {experience.map((exp, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{exp.role}</Text>
                <Text style={styles.entryDate}>{getDateRange(exp.startDate, exp.endDate, exp.current)}</Text>
              </View>
              <Text style={{ ...styles.entrySubtitle, color: '#f97316' }}>{exp.company}</Text>
              {exp.bulletPoints.filter(b => b).map((bullet, j) => (
                <Text key={j} style={styles.bullet}>• {bullet}</Text>
              ))}
            </View>
          ))}
        </View>
      )}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: '#f97316' }}>Education</Text>
          {education.map((edu, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{edu.degree}{edu.field && ` in ${edu.field}`}</Text>
                <Text style={styles.entryDate}>{getDateRange(edu.startDate, edu.endDate, false)}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{edu.institution}</Text>
            </View>
          ))}
        </View>
      )}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: '#f97316' }}>Projects</Text>
          {projects.map((project, i) => (
            <View key={i} style={styles.entry}>
              <Text style={styles.entryTitle}>{project.name}</Text>
              <Text style={styles.entryDesc}>{project.description}</Text>
              {project.techStack && project.techStack.filter(t => t).length > 0 && (
                <Text style={{ fontSize: 9, color: '#f97316', marginTop: 2 }}>
                  Tech: {project.techStack.filter(t => t).join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: '#f97316' }}>Skills</Text>
          {technicalSkills.length > 0 && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 10, fontWeight: 600, marginBottom: 4, color: '#f97316' }}>Technical</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {technicalSkills.map((skill, i) => (
                  <Text key={i} style={{ fontSize: 10, color: 'white', backgroundColor: '#f97316', padding: '5 12', borderRadius: 15 }}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {softSkills.length > 0 && (
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 10, fontWeight: 600, marginBottom: 4, color: '#f97316' }}>Soft Skills</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {softSkills.map((skill, i) => (
                  <Text key={i} style={{ fontSize: 10, color: 'white', backgroundColor: '#f97316', padding: '5 12', borderRadius: 15 }}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {languageSkills.length > 0 && (
            <View>
              <Text style={{ fontSize: 10, fontWeight: 600, marginBottom: 4, color: '#f97316' }}>Languages</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {languageSkills.map((skill, i) => (
                  <Text key={i} style={{ fontSize: 10, color: 'white', backgroundColor: '#f97316', padding: '5 12', borderRadius: 15 }}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </Page>
  );
};

const renderTechTemplate = (data: ResumeData) => {
  const { personalDetails, summary, education, experience, skills, projects } = data;
  const technicalSkills = skills.filter(s => s.category === 'technical');
  const softSkills = skills.filter(s => s.category === 'soft');
  const languageSkills = skills.filter(s => s.category === 'language');
  return (
    <Page size="A4" style={{ ...styles.page, backgroundColor: '#1a1a2e', color: '#e5e5ea' }}>
      <View style={{ backgroundColor: '#252540', padding: 25, borderRadius: 8, marginBottom: 20 }}>
        <Text style={{ fontSize: 14, color: '#c084fc', marginBottom: 5 }}>
          <Text style={{ color: '#c084fc' }}>const</Text> <Text style={{ color: '#818cf8' }}>developer</Text> = {' {'}
        </Text>
        <View style={{ paddingLeft: 20, marginBottom: 5 }}>
          <Text style={{ fontSize: 10 }}><Text style={{ color: '#818cf8' }}>name:</Text> <Text style={{ color: '#34d399' }}>"{personalDetails.fullName || 'Your Name'}"</Text>,</Text>
          <Text style={{ fontSize: 10 }}><Text style={{ color: '#818cf8' }}>email:</Text> <Text style={{ color: '#34d399' }}>"{personalDetails.email || ''}"</Text>,</Text>
          {personalDetails.location && <Text style={{ fontSize: 10 }}><Text style={{ color: '#818cf8' }}>location:</Text> <Text style={{ color: '#34d399' }}>"{personalDetails.location}"</Text>,</Text>}
        </View>
        <Text style={{ fontSize: 14, color: '#c084fc' }}>{' }'}</Text>
      </View>
      {summary && (
        <View style={styles.section}>
          <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 5 }}>// Summary</Text>
          <Text style={{ fontSize: 10, color: '#e5e5ea' }}>{summary}</Text>
        </View>
      )}
      {experience.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: '#f97316' }}>Experience</Text>
          {experience.map((exp, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{exp.role}</Text>
                <Text style={styles.entryDate}>{getDateRange(exp.startDate, exp.endDate, exp.current)}</Text>
              </View>
              <Text style={{ ...styles.entrySubtitle, color: '#f97316' }}>{exp.company}</Text>
              {exp.bulletPoints && exp.bulletPoints.filter(b => b).map((bullet, j) => (
                <Text key={j} style={styles.bullet}>• {bullet}</Text>
              ))}
            </View>
          ))}
        </View>
      )}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: '#f97316' }}>Education</Text>
          {education.map((edu, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{edu.degree}{edu.field && ` in ${edu.field}`}</Text>
                <Text style={styles.entryDate}>{getDateRange(edu.startDate, edu.endDate, false)}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{edu.institution}</Text>
            </View>
          ))}
        </View>
      )}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, color: '#f97316' }}>Projects</Text>
          {projects.map((project, i) => (
            <View key={i} style={styles.entry}>
              <Text style={styles.entryTitle}>{project.name || 'Untitled Project'}</Text>
              <Text style={styles.entryDesc}>{project.description || ''}</Text>
              {project.techStack && Array.isArray(project.techStack) && project.techStack.filter((t) => t).length > 0 && (
                <Text style={{ fontSize: 9, color: '#f97316', marginTop: 2 }}>
                  Tech: {project.techStack.filter((t) => t).join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 5 }}>// Skills</Text>
          <View style={{ backgroundColor: '#252540', padding: 15, borderRadius: 8 }}>
            {technicalSkills.length > 0 && (
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 9, color: '#c084fc', marginBottom: 3 }}>technical: [{technicalSkills.map(s => s.name).join(', ')}]</Text>
              </View>
            )}
            {softSkills.length > 0 && (
              <View style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 9, color: '#c084fc', marginBottom: 3 }}>softSkills: [{softSkills.map(s => s.name).join(', ')}]</Text>
              </View>
            )}
            {languageSkills.length > 0 && (
              <View>
                <Text style={{ fontSize: 9, color: '#c084fc', marginBottom: 3 }}>languages: [{languageSkills.map(s => s.name).join(', ')}]</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </Page>
  );
};

const renderAcademicTemplate = (data: ResumeData) => {
  const { personalDetails, summary, education, experience, skills, certifications, achievements } = data;
  const technicalSkills = skills.filter(s => s.category === 'technical');
  const softSkills = skills.filter(s => s.category === 'soft');
  const languageSkills = skills.filter(s => s.category === 'language');
  return (
    <Page size="A4" style={styles.page} wrap={false} fixed>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: 200, backgroundColor: '#f5f5f5', padding: 20, marginRight: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: 700, marginBottom: 15 }}>{personalDetails.fullName || 'Your Name'}</Text>
          <Text style={{ fontSize: 9, color: '#4a4a68', marginBottom: 5 }}>{personalDetails.email}</Text>
          {personalDetails.location && <Text style={{ fontSize: 9, color: '#4a4a68', marginBottom: 10 }}>{personalDetails.location}</Text>}
          {skills.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: 600, marginBottom: 8 }}>Expertise</Text>
              {technicalSkills.length > 0 && (
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 9, fontWeight: 600, color: '#6366f1', marginBottom: 4 }}>Technical</Text>
                  {technicalSkills.map((skill, i) => (
                    <Text key={i} style={{ fontSize: 9, color: '#4a4a68', marginBottom: 3 }}>{skill.name}</Text>
                  ))}
                </View>
              )}
              {softSkills.length > 0 && (
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 9, fontWeight: 600, color: '#8B5CF6', marginBottom: 4 }}>Soft Skills</Text>
                  {softSkills.map((skill, i) => (
                    <Text key={i} style={{ fontSize: 9, color: '#4a4a68', marginBottom: 3 }}>{skill.name}</Text>
                  ))}
                </View>
              )}
              {languageSkills.length > 0 && (
                <View>
                  <Text style={{ fontSize: 9, fontWeight: 600, color: '#10B981', marginBottom: 4 }}>Languages</Text>
                  {languageSkills.map((skill, i) => (
                    <Text key={i} style={{ fontSize: 9, color: '#4a4a68', marginBottom: 3 }}>{skill.name}</Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
        <View style={{ flex: 1, paddingTop: 5 }}>
          {summary && (
            <View style={styles.section}>
              <Text style={{ ...styles.sectionTitle, fontSize: 11 }}>Research Interests</Text>
              <Text style={styles.summary}>{summary}</Text>
            </View>
          )}
          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={{ ...styles.sectionTitle, fontSize: 11 }}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={{ ...styles.entry, padding: 10, backgroundColor: '#fafafa', borderRadius: 4, marginBottom: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...styles.entryTitle, fontSize: 10 }}>{edu.degree}{edu.field && ` in ${edu.field}`}</Text>
                    <Text style={{ fontSize: 9, color: '#8888a0' }}>{getDateRange(edu.startDate, edu.endDate, false)}</Text>
                  </View>
                  <Text style={{ ...styles.entrySubtitle, fontSize: 9 }}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}
          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={{ ...styles.sectionTitle, fontSize: 11 }}>Research Experience</Text>
              {experience.map((exp, i) => (
                <View key={i} style={styles.entry}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryTitle}>{exp.role}</Text>
                    <Text style={styles.entryDate}>{getDateRange(exp.startDate, exp.endDate, exp.current)}</Text>
                  </View>
                  <Text style={styles.entrySubtitle}>{exp.company}</Text>
                  {exp.bulletPoints && exp.bulletPoints.filter(b => b).map((bullet, j) => (
                    <Text key={j} style={styles.bullet}>• {bullet}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}
          {certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={{ ...styles.sectionTitle, fontSize: 11 }}>Certifications</Text>
              {certifications.map((cert, i) => (
                <View key={i} style={styles.entry}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.entryTitle}>{cert.name}</Text>
                    <Text style={styles.entryDate}>{formatDate(cert.date)}</Text>
                  </View>
                  <Text style={styles.entrySubtitle}>{cert.issuer}</Text>
                </View>
              ))}
            </View>
          )}
          {achievements.length > 0 && (
            <View style={styles.section}>
              <Text style={{ ...styles.sectionTitle, fontSize: 11 }}>Achievements</Text>
              {achievements.map((achievement, i) => (
                <View key={i} style={styles.entry}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.entryTitle}>{achievement.title}</Text>
                    <Text style={styles.entryDate}>{formatDate(achievement.date)}</Text>
                  </View>
                  <Text style={styles.entryDesc}>{achievement.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  );
};

export const ResumePDF: React.FC<{ data: ResumeData; template: TemplateType }> = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return renderModernTemplate(data);
      case 'classic':
        return renderClassicTemplate(data);
      case 'creative':
        return renderCreativeTemplate(data);
      case 'tech':
        return renderTechTemplate(data);
      case 'academic':
        return renderAcademicTemplate(data);
      default:
        return renderModernTemplate(data);
    }
  };

  return <Document>{renderTemplate()}</Document>;
};