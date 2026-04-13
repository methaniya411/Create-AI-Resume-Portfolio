import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../stores/resumeStore';
import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';

export const WorkExperience: React.FC = () => {
  const { data, addExperience, updateExperience, removeExperience } = useResumeStore();

  const addBulletPoint = (expId: string) => {
    const exp = data.experience.find(e => e.id === expId);
    if (exp) {
      updateExperience(expId, { bulletPoints: [...exp.bulletPoints, ''] });
    }
  };

  const updateBulletPoint = (expId: string, index: number, value: string) => {
    const exp = data.experience.find(e => e.id === expId);
    if (exp) {
      const newBullets = [...exp.bulletPoints];
      newBullets[index] = value;
      updateExperience(expId, { bulletPoints: newBullets });
    }
  };

  const removeBulletPoint = (expId: string, index: number) => {
    const exp = data.experience.find(e => e.id === expId);
    if (exp) {
      const newBullets = exp.bulletPoints.filter((_, i) => i !== index);
      updateExperience(expId, { bulletPoints: newBullets });
    }
  };

  return (
    <div>
      {data.experience.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No work experience added yet</p>
          <Button onClick={addExperience} icon={<Plus size={18} />}>
            Add Experience
          </Button>
        </div>
      ) : (
        <>
          {data.experience.map((exp, index) => (
            <div
              key={exp.id}
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
                  Experience #{index + 1}
                </span>
                <button
                  onClick={() => removeExperience(exp.id)}
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input
                    label="Company"
                    placeholder="Google"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  />
                  <Input
                    label="Role"
                    placeholder="Software Engineer"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                  />
                </div>
                <Input
                  label="Location"
                  placeholder="Mountain View, CA"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input
                    label="Start Date"
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  />
                  <Input
                    label="End Date"
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                  />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>I currently work here</span>
                </label>
                <Textarea
                  label="Description"
                  placeholder="Describe your role and responsibilities..."
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  rows={3}
                />
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
                    Bullet Points
                  </label>
                  {exp.bulletPoints.map((bullet, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => updateBulletPoint(exp.id, i, e.target.value)}
                        placeholder="e.g., Led a team of 5 engineers..."
                        style={{
                          flex: 1,
                          padding: '0.5rem 0.75rem',
                          border: '2px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          fontSize: '0.875rem',
                        }}
                      />
                      <button
                        onClick={() => removeBulletPoint(exp.id, i)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => addBulletPoint(exp.id)}>
                    <Plus size={16} /> Add Bullet Point
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addExperience} variant="secondary" icon={<Plus size={18} />}>
            Add Another Experience
          </Button>
        </>
      )}
    </div>
  );
};