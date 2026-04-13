import React from 'react';
import { X, Plus, Code, Heart, Globe } from 'lucide-react';
import { useResumeStore } from '../../stores/resumeStore';
import { Button } from '../common/Button';

const categoryConfig = {
  technical: { icon: <Code size={16} />, label: 'Technical', color: '#6366F1' },
  soft: { icon: <Heart size={16} />, label: 'Soft Skills', color: '#8B5CF6' },
  language: { icon: <Globe size={16} />, label: 'Languages', color: '#10B981' },
};

export const Skills: React.FC = () => {
  const { data, addSkill, removeSkill } = useResumeStore();
  const [newSkill, setNewSkill] = React.useState({ name: '', category: 'technical' as 'technical' | 'soft' | 'language' });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill({ ...newSkill, id: crypto.randomUUID() });
      setNewSkill({ name: '', category: newSkill.category });
    }
  };

  const skillsByCategory = {
    technical: data.skills.filter(s => s.category === 'technical'),
    soft: data.skills.filter(s => s.category === 'soft'),
    language: data.skills.filter(s => s.category === 'language'),
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '1.5rem',
        padding: '0.5rem',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}>
        {(['technical', 'soft', 'language'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setNewSkill({ ...newSkill, category: cat })}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: newSkill.category === cat ? categoryConfig[cat].color : 'transparent',
              color: newSkill.category === cat ? 'white' : 'var(--text-secondary)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {categoryConfig[cat].icon}
            {categoryConfig[cat].label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          placeholder={`Add a ${categoryConfig[newSkill.category].label.toLowerCase()} skill...`}
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
        <Button onClick={handleAddSkill} icon={<Plus size={18} />}>
          Add
        </Button>
      </div>

      {Object.entries(skillsByCategory).map(([category, skills]) => (
        skills.length > 0 && (
          <div key={category} style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ 
              fontSize: '0.875rem', 
              fontWeight: 600, 
              color: categoryConfig[category as keyof typeof categoryConfig].color,
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              {categoryConfig[category as keyof typeof categoryConfig].icon}
              {categoryConfig[category as keyof typeof categoryConfig].label}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map(skill => (
                <span
                  key={skill.id}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    border: `1px solid ${categoryConfig[skill.category as keyof typeof categoryConfig].color}30`,
                  }}
                >
                  {skill.name}
                  <button
                    onClick={() => removeSkill(skill.id)}
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
        )
      ))}

      {data.skills.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
          No skills added yet. Add your skills to showcase your abilities.
        </p>
      )}
    </div>
  );
};