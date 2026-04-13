import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, FileText, Globe } from 'lucide-react';
import { useResumeStore } from '../../stores/resumeStore';
import { Button } from '../common/Button';
import type { TemplateType } from '../../data/types';

const templates: { id: TemplateType; name: string; description: string }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary with accent colors' },
  { id: 'classic', name: 'Classic', description: 'Traditional and professional layout' },
  { id: 'creative', name: 'Creative', description: 'Bold design with unique hierarchy' },
  { id: 'tech', name: 'Tech Developer', description: 'Code-style elements for developers' },
  { id: 'academic', name: 'Academic', description: 'Detailed layout for researchers' },
];

export const ReviewGenerate: React.FC = () => {
  const navigate = useNavigate();
  const { data, selectedTemplate, setSelectedTemplate } = useResumeStore();

  const sections = [
    { name: 'Personal Details', filled: !!data.personalDetails.fullName && !!data.personalDetails.email },
    { name: 'Summary', filled: !!data.summary },
    { 
      name: 'Education', 
      filled: data.education.length > 0 && data.education.every(edu => edu.institution && edu.degree) 
    },
    { 
      name: 'Experience', 
      filled: data.experience.length > 0 && data.experience.every(exp => exp.company && exp.role) 
    },
    { name: 'Skills', filled: data.skills.length > 0 },
    { 
      name: 'Projects', 
      filled: data.projects.length > 0 && data.projects.every(p => p.name && p.description) 
    },
    { name: 'Certifications', filled: data.certifications.length > 0 },
    { name: 'Achievements', filled: data.achievements.length > 0 },
    { name: 'Social Links', filled: Object.values(data.socialLinks).some(v => v) },
  ];

  const filledCount = sections.filter(s => s.filled).length;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Data Summary</h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {sections.map((section, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              {section.filled ? (
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
              ) : (
                <AlertCircle size={18} style={{ color: 'var(--warning)' }} />
              )}
              <span style={{ flex: 1, color: 'var(--text-primary)' }}>{section.name}</span>
              <span style={{ color: section.filled ? 'var(--success)' : 'var(--text-muted)', fontSize: '0.875rem' }}>
                {section.filled ? 'Completed' : 'Empty'}
              </span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          {filledCount}/{sections.length} sections completed
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Select Template</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              style={{
                padding: '1rem',
                border: `2px solid ${selectedTemplate === template.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-md)',
                background: selectedTemplate === template.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-tertiary)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                {template.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {template.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button
          onClick={() => navigate('/preview')}
          icon={<FileText size={18} />}
          size="lg"
        >
          Preview Resume
        </Button>
        <Button
          onClick={() => navigate('/portfolio')}
          variant="secondary"
          icon={<Globe size={18} />}
          size="lg"
        >
          View Portfolio
        </Button>
      </div>
    </div>
  );
};