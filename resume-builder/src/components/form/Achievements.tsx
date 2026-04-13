import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../stores/resumeStore';
import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';

export const Achievements: React.FC = () => {
  const { data, addAchievement, updateAchievement, removeAchievement } = useResumeStore();

  return (
    <div>
      {data.achievements.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No achievements added yet</p>
          <Button onClick={addAchievement} icon={<Plus size={18} />}>
            Add Achievement
          </Button>
        </div>
      ) : (
        <>
          {data.achievements.map((ach, index) => (
            <div
              key={ach.id}
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
                  Achievement #{index + 1}
                </span>
                <button
                  onClick={() => removeAchievement(ach.id)}
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
                  label="Title"
                  placeholder="Best Employee Award 2023"
                  value={ach.title}
                  onChange={(e) => updateAchievement(ach.id, { title: e.target.value })}
                />
                <Textarea
                  label="Description"
                  placeholder="Describe the achievement..."
                  value={ach.description}
                  onChange={(e) => updateAchievement(ach.id, { description: e.target.value })}
                  rows={2}
                />
                <Input
                  label="Date"
                  type="month"
                  value={ach.date}
                  onChange={(e) => updateAchievement(ach.id, { date: e.target.value })}
                />
              </div>
            </div>
          ))}
          <Button onClick={addAchievement} variant="secondary" icon={<Plus size={18} />}>
            Add Another Achievement
          </Button>
        </>
      )}
    </div>
  );
};