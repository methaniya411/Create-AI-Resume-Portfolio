# AI Resume & Portfolio Builder - Technical Specification

## 1. Project Overview

**Project Name:** ResumeForge AI
**Type:** Full-stack Web Application (SPA)
**Core Functionality:** A guided form-based system that transforms user input into professional resumes and portfolio websites with AI-powered suggestions.
**Target Users:** Job seekers, professionals, freelancers, students, and anyone needing to create a resume or portfolio.

## 2. Technology Stack

- **Frontend:** React 18 + Vite + TypeScript
- **State Management:** Zustand
- **Routing:** React Router v6
- **Styling:** CSS Modules + CSS Variables
- **PDF Generation:** @react-pdf/renderer
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Validation:** Zod + React Hook Form

## 3. UI/UX Specification

### Color Palette

```css
/* Light Mode */
--bg-primary: #FAFAFA
--bg-secondary: #FFFFFF
--bg-tertiary: #F5F5F5
--text-primary: #1A1A2E
--text-secondary: #4A4A68
--text-muted: #8888A0
--accent-primary: #6366F1
--accent-secondary: #8B5CF6
--accent-gradient: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)
--border-color: #E5E5EA
--success: #10B981
--warning: #F59E0B
--error: #EF4444

/* Dark Mode */
--bg-primary: #0F0F1A
--bg-secondary: #1A1A2E
--bg-tertiary: #252540
--text-primary: #FFFFFF
--text-secondary: #B8B8D0
--text-muted: #6B6B80
--accent-primary: #818CF8
--accent-secondary: #A78BFA
--border-color: #2D2D45
```

### Typography

- **Primary Font:** "Outfit" (Google Fonts) - Modern geometric sans-serif
- **Secondary Font:** "Source Serif 4" - For resume body text
- **Monospace:** "JetBrains Mono" - For code/technical sections

**Font Sizes:**
- Hero Title: 56px / 3.5rem
- Section Title: 32px / 2rem
- Card Title: 24px / 1.5rem
- Body: 16px / 1rem
- Small: 14px / 0.875rem
- Caption: 12px / 0.75rem

### Layout Structure

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Container:** max-width 1200px, centered

### Component Specifications

**1. Navigation**
- Fixed top header with blur backdrop
- Logo left, nav links center, theme toggle right
- Mobile: hamburger menu

**2. Landing Page**
- Hero section with gradient accent, CTA buttons
- Features grid (3 columns desktop, 1 mobile)
- Testimonials/social proof section
- Pricing/CTA final section

**3. Multi-Step Form**
- Step indicator: horizontal progress bar with numbers
- Form cards with subtle shadow
- Input fields: 48px height, rounded corners (8px)
- Smooth slide transitions between steps (300ms)
- "Save & Continue" primary button

**4. Resume Preview**
- Split view: left editor, right live preview
- Template selector: horizontal scrollable cards
- Zoom controls
- Sticky action bar (Download PDF, View Portfolio)

**5. Portfolio Generator**
- Section-based layout
- Project cards with hover effects
- Skills displayed as tags
- Contact form with validation

### Animations

- Page transitions: fade + slide (200ms ease-out)
- Form step transitions: slide horizontal (300ms ease-in-out)
- Button hover: scale(1.02) + shadow (150ms)
- Card hover: translateY(-2px) + shadow (200ms)
- Loading states: skeleton pulse animation
- Success feedback: checkmark with scale animation

## 4. Functionality Specification

### Form Sections (10 Steps)

1. **Personal Details** (Step 1)
   - Full Name (required)
   - Email (required, validated)
   - Phone (optional)
   - Location (City, Country)
   - Profile Photo upload (optional)

2. **Professional Summary** (Step 2)
   - Bio text area (500 char max)
   - Key highlights (tags)

3. **Education** (Step 3)
   - Repeatable entries: Institution, Degree, Field, Start/End dates, GPA, Description

4. **Work Experience** (Step 4)
   - Repeatable entries: Company, Role, Location, Start/End dates, Description, Bullet points

5. **Skills** (Step 5)
   - Technical skills (tag input)
   - Soft skills (tag input)
   - Languages (tag input)

6. **Projects** (Step 6)
   - Repeatable entries: Name, Description, Tech stack, URL, GitHub link

7. **Certifications** (Step 7)
   - Repeatable entries: Name, Issuer, Date, URL

8. **Achievements** (Step 8)
   - Repeatable entries: Title, Description, Date

9. **Social Links** (Step 9)
   - LinkedIn, GitHub, Twitter, Website, Other

10. **Review & Generate** (Step 10)
    - Summary of all data
    - Template selection
    - Generate buttons

### Resume Templates (5 Options)

1. **Modern Minimalist** - Clean layout, accent color sidebar, sans-serif
2. **Classic Traditional** - Times-inspired serif, centered header, formal
3. **Creative Bold** - Asymmetric layout, gradient accents, unique hierarchy
4. **Tech Developer** - Code-style elements, monospace accents, dark theme option
5. **Academic Scholar** - Publication-focused, two-column, extensive details

### PDF Generation

- Use @react-pdf/renderer for client-side generation
- A4 size (210mm x 297mm)
- Preserve template styling exactly
- Include page numbers for multi-page resumes

### AI Suggestions Feature

- Mock AI suggestions (simulated for demo)
- Highlights weak verbs
- Suggests stronger action words
- Recommends quantifiable achievements
- Tips for each section

### Portfolio Generation

- Separate route/page
- Responsive single-page layout
- Sections: Hero, About, Skills, Projects, Experience, Contact
- Optional: generate as static HTML

### Data Persistence

- LocalStorage for form data
- Export/Import JSON option
- Optional: local storage for returning users

## 5. File Structure

```
/src
  /components
    /common - Button, Input, Card, Modal, etc.
    /form - Form steps, fields, validation
    /resume - Template components, preview
    /portfolio - Portfolio sections
    /layout - Header, Footer, Layout
  /pages
    - Landing.tsx
    - FormWizard.tsx
    - ResumePreview.tsx
    - Portfolio.tsx
  /hooks - Custom React hooks
  /stores - Zustand stores
  /utils - Helper functions
  /styles - Global styles, variables
  /data - Template configs, defaults
```

## 6. Acceptance Criteria

- [ ] Landing page loads with hero, features, and CTA
- [ ] All 10 form steps are functional and validated
- [ ] Form data persists and can be edited
- [ ] Resume preview updates in real-time
- [ ] All 5 templates render correctly
- [ ] PDF download works for all templates
- [ ] Portfolio page displays all sections
- [ ] Dark/light mode toggles correctly
- [ ] Mobile responsive on all breakpoints
- [ ] Animations are smooth (< 300ms)
- [ ] Keyboard navigation works
- [ ] No console errors in production