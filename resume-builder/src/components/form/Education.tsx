import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../stores/resumeStore';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const Education: React.FC = () => {
  const { data, addEducation, updateEducation, removeEducation } = useResumeStore();

  return (
    <div>
      {data.education.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No education added yet</p>
          <Button onClick={addEducation} icon={<Plus size={18} />}>
            Add Education
          </Button>
        </div>
      ) : (
        <>
          {data.education.map((edu, index) => (
            <div
              key={edu.id}
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
                  Education #{index + 1}
                </span>
                <button
                  onClick={() => removeEducation(edu.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--error)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <Input
                  label="Institution"
                  placeholder="University of California"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input
                    label="Degree"
                    placeholder="Bachelor of Science"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  />
                  <Input
                    label="Field of Study"
                    placeholder="Computer Science"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input
                    label="Start Date"
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                  <Input
                    label="End Date"
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>
                <Input
                  label="GPA (optional)"
                  placeholder="3.8 / 4.0"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                />
                <Input
                  label="Description (optional)"
                  placeholder="Relevant coursework, honors, etc."
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                />
              </div>
            </div>
          ))}
          <Button onClick={addEducation} variant="secondary" icon={<Plus size={18} />}>
            Add Another Education
          </Button>
        </>
      )}
    </div>
  );
};