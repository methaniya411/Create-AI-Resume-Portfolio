import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../stores/resumeStore';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const Certifications: React.FC = () => {
  const { data, addCertification, updateCertification, removeCertification } = useResumeStore();

  return (
    <div>
      {data.certifications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No certifications added yet</p>
          <Button onClick={addCertification} icon={<Plus size={18} />}>
            Add Certification
          </Button>
        </div>
      ) : (
        <>
          {data.certifications.map((cert, index) => (
            <div
              key={cert.id}
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
                  Certification #{index + 1}
                </span>
                <button
                  onClick={() => removeCertification(cert.id)}
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
                  label="Certification Name"
                  placeholder="AWS Solutions Architect"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                />
                <Input
                  label="Issuing Organization"
                  placeholder="Amazon Web Services"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input
                    label="Date Obtained"
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                  />
                  <Input
                    label="Credential URL (optional)"
                    placeholder="https://..."
                    value={cert.url}
                    onChange={(e) => updateCertification(cert.id, { url: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addCertification} variant="secondary" icon={<Plus size={18} />}>
            Add Another Certification
          </Button>
        </>
      )}
    </div>
  );
};