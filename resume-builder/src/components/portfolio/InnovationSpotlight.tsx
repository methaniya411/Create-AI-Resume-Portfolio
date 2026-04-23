import React from 'react';
import styles from './InnovationSpotlight.module.css';
import { TrendingUp, Cpu, Hash, CheckCircle2 } from 'lucide-react';

interface EvolutionStep {
  version: string;
  title: string;
  description: string;
  tech: string;
  icon: React.ReactNode;
}

interface InnovationSpotlightProps {
  projectName: string;
  evolution: EvolutionStep[];
}

export const InnovationSpotlight: React.FC<InnovationSpotlightProps> = ({ projectName, evolution }) => {
  return (
    <section className={styles.spotlight}>
      <div className={styles.container}>
        <div className={styles.header}>
          <TrendingUp className={styles.icon} size={32} />
          <h2 className={styles.title}>Technical Evolution Spotlight</h2>
        </div>
        
        <div className={styles.projectCard}>
          <h3 className={styles.projectName}>{projectName}</h3>
          <div className={styles.timeline}>
            {evolution.map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.stepHeader}>
                  <div className={styles.versionTag}>{step.version}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                </div>
                <div className={styles.stepContent}>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  <div className={styles.techBadge}>{step.tech}</div>
                </div>
                {index < evolution.length - 1 && <div className={styles.connector} />}
              </div>
            ))}
          </div>
          <div className={styles.insight}>
            <CheckCircle2 size={20} />
            <p><strong>Key Learning:</strong> Transitioned from exact binary matching to semantic visual similarity, improving detection rate for resized/edited images by over 80%.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
