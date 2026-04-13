import React from 'react';
import { useResumeStore } from '../../stores/resumeStore';
import { Textarea } from '../common/Input';
import { Button } from '../common/Button';
import { X, Plus } from 'lucide-react';

export const ProfessionalSummary: React.FC = () => {
  const { data, setSummary, setHighlights } = useResumeStore();
  const [newHighlight, setNewHighlight] = React.useState('');

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...data.highlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    setHighlights(data.highlights.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Textarea
          label="Professional Summary"
          name="summary"
          placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          value={data.summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={6}
          maxLength={1500}
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          {data.summary.length}/1500 characters
        </p>
      </div>

      <div>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
          Key Highlights (optional)
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <input
            type="text"
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHighlight()}
            placeholder="Add a highlight"
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
            }}
          />
          <Button variant="secondary" onClick={addHighlight} icon={<Plus size={18} />}>
            Add
          </Button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {data.highlights.map((highlight, index) => (
            <span
              key={index}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.375rem 0.75rem',
                background: 'var(--bg-tertiary)',
                borderRadius: '100px',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
              }}
            >
              {highlight}
              <button
                onClick={() => removeHighlight(index)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: 0,
                  display: 'flex',
                }}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};