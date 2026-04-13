import React from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { useResumeStore } from '../../stores/resumeStore';
import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';

export const Projects: React.FC = () => {
  const { data, addProject, updateProject, removeProject } = useResumeStore();

  const addTechStack = (projectId: string) => {
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, { techStack: [...project.techStack, ''] });
    }
  };

  const updateTechStack = (projectId: string, index: number, value: string) => {
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      const newTech = [...project.techStack];
      newTech[index] = value;
      updateProject(projectId, { techStack: newTech });
    }
  };

  const removeTechStack = (projectId: string, index: number) => {
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      const newTech = project.techStack.filter((_, i) => i !== index);
      updateProject(projectId, { techStack: newTech });
    }
  };

  return (
    <div>
      {data.projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No projects added yet</p>
          <Button onClick={addProject} icon={<Plus size={18} />}>
            Add Project
          </Button>
        </div>
      ) : (
        <>
          {data.projects.map((project, index) => (
            <div
              key={project.id}
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
                  Project #{index + 1}
                </span>
                <button
                  onClick={() => removeProject(project.id)}
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
                  label="Project Name"
                  placeholder="My Awesome Project"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                />
                <Textarea
                  label="Description"
                  placeholder="Describe what the project does and your role..."
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  rows={3}
                />
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                    Tech Stack
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          background: 'var(--accent-primary)',
                          color: 'white',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                        }}
                      >
                        {tech || 'Untitled'}
                        <button
                          onClick={() => removeTechStack(project.id, i)}
                          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => addTechStack(project.id)}>
                    <Plus size={14} /> Add Tech
                  </Button>
                  {project.techStack.map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      value={project.techStack[i]}
                      onChange={(e) => updateTechStack(project.id, i, e.target.value)}
                      placeholder={`Tech ${i + 1} (e.g., React)`}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginTop: '0.5rem',
                        border: '2px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.875rem',
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input
                    label="Live URL"
                    placeholder="https://myproject.com"
                    value={project.url}
                    onChange={(e) => updateProject(project.id, { url: e.target.value })}
                  />
                  <Input
                    label="GitHub URL"
                    placeholder="https://github.com/username/project"
                    value={project.github}
                    onChange={(e) => updateProject(project.id, { github: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addProject} variant="secondary" icon={<Plus size={18} />}>
            Add Another Project
          </Button>
        </>
      )}
    </div>
  );
};