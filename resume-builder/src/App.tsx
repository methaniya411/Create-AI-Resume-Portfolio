import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useResumeStore } from './stores/resumeStore';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Landing } from './pages/Landing';
import { FormWizard } from './pages/FormWizard';
import { ResumePreview } from './pages/ResumePreview';
import { Portfolio } from './pages/Portfolio';

const App: React.FC = () => {
  const { isDarkMode } = useResumeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create" element={<FormWizard />} />
          <Route path="/preview" element={<ResumePreview />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;