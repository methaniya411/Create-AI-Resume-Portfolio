export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  photo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bulletPoints: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  url: string;
  github: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
  other: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  summary: string;
  highlights: string[];
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  socialLinks: SocialLinks;
}

export type TemplateType = 'modern' | 'classic' | 'creative' | 'tech' | 'academic';

export const initialResumeData: ResumeData = {
  personalDetails: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    photo: '',
  },
  summary: '',
  highlights: [],
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  socialLinks: {
    linkedin: '',
    github: '',
    twitter: '',
    website: '',
    other: '',
  },
};