import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, TemplateType } from '../data/types';
import { initialResumeData } from '../data/types';

interface ResumeStore {
  data: ResumeData;
  currentStep: number;
  selectedTemplate: TemplateType;
  isDarkMode: boolean;
  setData: (data: Partial<ResumeData>) => void;
  setPersonalDetails: (details: Partial<ResumeData['personalDetails']>) => void;
  setSummary: (summary: string) => void;
  setHighlights: (highlights: string[]) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addSkill: (skill: ResumeData['skills'][0]) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<ResumeData['certifications'][0]>) => void;
  removeCertification: (id: string) => void;
  addAchievement: () => void;
  updateAchievement: (id: string, data: Partial<ResumeData['achievements'][0]>) => void;
  removeAchievement: (id: string) => void;
  setSocialLinks: (links: Partial<ResumeData['socialLinks']>) => void;
  setCurrentStep: (step: number) => void;
  setSelectedTemplate: (template: TemplateType) => void;
  toggleDarkMode: () => void;
  resetData: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initialResumeData,
      currentStep: 0,
      selectedTemplate: 'modern',
      isDarkMode: false,

      setData: (newData) => set((state) => {
        const mergedData = { ...state.data };
        for (const key in newData) {
          if (typeof newData[key] === 'object' && newData[key] !== null && !Array.isArray(newData[key])) {
            mergedData[key] = { ...state.data[key], ...newData[key] };
          } else {
            mergedData[key] = newData[key];
          }
        }
        return { data: mergedData };
      }),

      setPersonalDetails: (details) =>
        set((state) => ({
          data: {
            ...state.data,
            personalDetails: { ...state.data.personalDetails, ...details },
          },
        })),

      setSummary: (summary) => set((state) => ({ data: { ...state.data, summary } })),

      setHighlights: (highlights) => set((state) => ({ data: { ...state.data, highlights } })),

      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              {
                id: crypto.randomUUID(),
                institution: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                gpa: '',
                description: '',
              },
            ],
          },
        })),

      updateEducation: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((edu) =>
              edu.id === id ? { ...edu, ...data } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((edu) => edu.id !== id),
          },
        })),

      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              {
                id: crypto.randomUUID(),
                company: '',
                role: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                bulletPoints: [],
              },
            ],
          },
        })),

      updateExperience: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((exp) =>
              exp.id === id ? { ...exp, ...data } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((exp) => exp.id !== id),
          },
        })),

      addSkill: (skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [...state.data.skills, { ...skill, id: crypto.randomUUID() }],
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((skill) => skill.id !== id),
          },
        })),

      addProject: () =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [
              ...state.data.projects,
              {
                id: crypto.randomUUID(),
                name: '',
                description: '',
                techStack: [],
                url: '',
                github: '',
              },
            ],
          },
        })),

      updateProject: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((proj) =>
              proj.id === id ? { ...proj, ...data } : proj
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((proj) => proj.id !== id),
          },
        })),

      addCertification: () =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: [
              ...state.data.certifications,
              {
                id: crypto.randomUUID(),
                name: '',
                issuer: '',
                date: '',
                url: '',
              },
            ],
          },
        })),

      updateCertification: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.map((cert) =>
              cert.id === id ? { ...cert, ...data } : cert
            ),
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.filter((cert) => cert.id !== id),
          },
        })),

      addAchievement: () =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: [
              ...state.data.achievements,
              {
                id: crypto.randomUUID(),
                title: '',
                description: '',
                date: '',
              },
            ],
          },
        })),

      updateAchievement: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: state.data.achievements.map((ach) =>
              ach.id === id ? { ...ach, ...data } : ach
            ),
          },
        })),

      removeAchievement: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: state.data.achievements.filter((ach) => ach.id !== id),
          },
        })),

      setSocialLinks: (links) =>
        set((state) => ({
          data: {
            ...state.data,
            socialLinks: { ...state.data.socialLinks, ...links },
          },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      setSelectedTemplate: (template) => set({ selectedTemplate: template }),

      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      resetData: () => set({ data: initialResumeData, currentStep: 0 }),
    }),
    {
      name: 'resume-storage',
    }
  )
);