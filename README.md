# ResumeForge AI - AI Resume & Portfolio Builder

A production-ready web application that enables users to create professional resumes and personal portfolio websites through a guided form-based workflow.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)

## Features

- **Multi-Step Form Interface** - Guided 10-step form covering all resume sections:
  - Personal Details
  - Professional Summary
  - Education History
  - Work Experience
  - Skills (Technical, Soft, Languages)
  - Projects/Portfolio Items
  - Certifications
  - Achievements
  - Social Links

- **5 Professional Resume Templates**
  - Modern - Clean and contemporary with accent colors
  - Classic - Traditional and professional layout
  - Creative - Bold design with unique hierarchy
  - Tech Developer - Code-style elements for developers
  - Academic - Detailed layout for researchers

- **PDF Generation** - Download professional PDFs with perfect formatting

- **Portfolio Generator** - Auto-generated personal portfolio website with:
  - About Me section
  - Skills showcase
  - Projects display
  - Experience timeline
  - Contact section

- **AI-Powered Suggestions** - Get intelligent recommendations to improve your resume content

- **Dark/Light Mode** - Toggle between light and dark themes

- **Data Persistence** - Save your progress with localStorage

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Zustand
- **Routing**: React Router v6
- **Styling**: CSS Modules + CSS Variables
- **PDF Generation**: @react-pdf/renderer
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd resume-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
resume-builder/
├── src/
│   ├── components/
│   │   ├── common/       # Reusable UI components
│   │   ├── form/        # Form step components
│   │   ├── resume/      # Resume template components
│   │   ├── portfolio/   # Portfolio components
│   │   └── layout/      # Header, Footer, Layout
│   ├── pages/           # Route pages
│   ├── stores/          # Zustand stores
│   ├── data/            # Types and constants
│   ├── styles/          # Global styles
│   └── utils/           # Helper functions
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Usage

1. **Landing Page** - Visit the homepage to understand the tool's value proposition
2. **Create Resume** - Click "Start Building" to begin the multi-step form
3. **Fill Form** - Complete each section with your professional information
4. **Preview** - See real-time preview of your resume with different templates
5. **Download PDF** - Generate and download your professional resume
6. **View Portfolio** - Check your auto-generated portfolio website

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

MIT License - feel free to use this project for any purpose.

## Contributing

<<<<<<< HEAD
Contributions are welcome! Please feel free to submit a Pull Request.
=======
Contributions are welcome! Please feel free to submit a Pull Request.
>>>>>>> 7cd773e5b7038c204e7c148ac398c8ed9a521f81
