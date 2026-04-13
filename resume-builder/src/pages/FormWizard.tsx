import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '../stores/resumeStore';
import { PersonalDetails } from '../components/form/PersonalDetails';
import { ProfessionalSummary } from '../components/form/ProfessionalSummary';
import { Education } from '../components/form/Education';
import { WorkExperience } from '../components/form/WorkExperience';
import { Skills } from '../components/form/Skills';
import { Projects } from '../components/form/Projects';
import { Certifications } from '../components/form/Certifications';
import { Achievements } from '../components/form/Achievements';
import { SocialLinks } from '../components/form/SocialLinks';
import { ReviewGenerate } from '../components/form/ReviewGenerate';
import styles from './FormWizard.module.css';

const steps = [
  { id: 0, title: 'Personal', component: PersonalDetails },
  { id: 1, title: 'Summary', component: ProfessionalSummary },
  { id: 2, title: 'Education', component: Education },
  { id: 3, title: 'Experience', component: WorkExperience },
  { id: 4, title: 'Skills', component: Skills },
  { id: 5, title: 'Projects', component: Projects },
  { id: 6, title: 'Certifications', component: Certifications },
  { id: 7, title: 'Achievements', component: Achievements },
  { id: 8, title: 'Social', component: SocialLinks },
  { id: 9, title: 'Review', component: ReviewGenerate },
];

export const FormWizard: React.FC = () => {
  const { currentStep, setCurrentStep } = useResumeStore();
  const navigate = useNavigate();
  const CurrentComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={styles.wizard}>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <button
              key={step.id}
              className={`${styles.step} ${index <= currentStep ? styles.active : ''} ${index === currentStep ? styles.current : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              <span className={styles.stepNumber}>{index + 1}</span>
              <span className={styles.stepTitle}>{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.formContainer}
          >
            <div className={styles.stepHeader}>
              <h2 className={styles.stepTitle}>{steps[currentStep].title}</h2>
              <p className={styles.stepDescription}>
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        {currentStep < steps.length - 1 ? (
          <button className={styles.navButtonPrimary} onClick={handleNext}>
            Continue
          </button>
        ) : (
          <button className={styles.navButtonPrimary} onClick={() => navigate('/preview')}>
            Generate Resume
          </button>
        )}
      </div>
    </div>
  );
};