import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, Layout, Sparkles } from 'lucide-react';
import { useResumeStore } from '../stores/resumeStore';
import { Button } from '../components/common/Button';
import { ModernTemplate } from '../components/resume/ModernTemplate';
import { ClassicTemplate } from '../components/resume/ClassicTemplate';
import { CreativeTemplate } from '../components/resume/CreativeTemplate';
import { TechTemplate } from '../components/resume/TechTemplate';
import { AcademicTemplate } from '../components/resume/AcademicTemplate';
import { ResumePDF } from '../components/resume/ResumePDF';
import { pdf } from '@react-pdf/renderer';
import styles from './ResumePreview.module.css';

const templates = [
  { id: 'modern', name: 'Modern' },
  { id: 'classic', name: 'Classic' },
  { id: 'creative', name: 'Creative' },
  { id: 'tech', name: 'Tech' },
  { id: 'academic', name: 'Academic' },
];

const aiSuggestions = [
  { section: 'Summary', suggestion: 'Add quantifiable achievements to make your summary more impactful.' },
  { section: 'Experience', suggestion: 'Start bullet points with strong action verbs like "Led", "Developed", "Implemented".' },
  { section: 'Skills', suggestion: 'Group skills by category and include proficiency levels where applicable.' },
  { section: 'Projects', suggestion: 'Include metrics like user counts, performance improvements, or revenue impact.' },
];

export const ResumePreview: React.FC = () => {
  const navigate = useNavigate();
  const { data, selectedTemplate, setSelectedTemplate } = useResumeStore();
  const [showAISuggestions, setShowAISuggestions] = React.useState(false);

  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResumePDF data={data} template={selectedTemplate} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personalDetails.fullName || 'resume'}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderTemplate = () => {
    const props = { data };
    switch (selectedTemplate) {
      case 'modern': return <ModernTemplate {...props} />;
      case 'classic': return <ClassicTemplate {...props} />;
      case 'creative': return <CreativeTemplate {...props} />;
      case 'tech': return <TechTemplate {...props} />;
      case 'academic': return <AcademicTemplate {...props} />;
      default: return <ModernTemplate {...props} />;
    }
  };

  return (
    <div className={styles.preview}>
      <div className={styles.sidebar}>
        <button className={styles.backButton} onClick={() => navigate('/create')}>
          <ArrowLeft size={18} />
          Back to Editor
        </button>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Layout size={18} />
            Templates
          </h3>
          <div className={styles.templateGrid}>
            {templates.map((template) => (
              <button
                key={template.id}
                className={`${styles.templateButton} ${selectedTemplate === template.id ? styles.active : ''}`}
                onClick={() => setSelectedTemplate(template.id as any)}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <Button onClick={handleDownloadPDF} icon={<Download size={18} />} size="lg">
            Download PDF
          </Button>
        </div>

        <div className={styles.section}>
          <Button 
            variant="outline" 
            onClick={() => setShowAISuggestions(!showAISuggestions)}
            icon={<Sparkles size={18} />}
          >
            AI Suggestions
          </Button>
        </div>

        {showAISuggestions && (
          <div className={styles.suggestions}>
            <h4>AI-Powered Tips</h4>
            {aiSuggestions.map((item, index) => (
              <div key={index} className={styles.suggestion}>
                <strong>{item.section}:</strong> {item.suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.previewArea}>
        <div className={styles.previewContainer}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};