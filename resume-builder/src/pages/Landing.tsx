import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Palette, Zap, FileText, Globe, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import styles from '../pages/Landing.module.css';

const features = [
  {
    icon: <FileText />,
    title: 'Multi-Step Form',
    description: 'Guided form with 10 logical steps to capture all your professional information effortlessly.',
  },
  {
    icon: <Palette />,
    title: '5 Resume Templates',
    description: 'Choose from Modern, Classic, Creative, Tech, and Academic templates with real-time preview.',
  },
  {
    icon: <Zap />,
    title: 'Instant PDF Generation',
    description: 'Download professional PDFs instantly with perfect formatting across all templates.',
  },
  {
    icon: <Globe />,
    title: 'Portfolio Generator',
    description: 'Automatically create a personal portfolio website with the same data used for your resume.',
  },
  {
    icon: <Sparkles />,
    title: 'AI Suggestions',
    description: 'Get intelligent recommendations to improve your resume content and wording.',
  },
  {
    icon: <CheckCircle />,
    title: 'Dark Mode',
    description: 'Toggle between light and dark themes for a comfortable editing experience.',
  },
];

export const Landing: React.FC = () => {
  return (
    <div className={styles.landing}>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1} />
          <div className={styles.gradientOrb2} />
          <div className={styles.gridPattern} />
        </div>
        
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.badge}>
            <Sparkles size={14} />
            CareerCanvas
          </span>
          
          <h1 className={styles.heroTitle}>
            Paint Your Career Story
            <span className={styles.highlight}> in Colors</span>
          </h1>
          
          <p className={styles.heroDescription}>
            Create stunning portfolios and resumes that tell your unique professional story. 
            No design skills required.
          </p>
          
          <div className={styles.heroCta}>
            <Link to="/create">
              <Button size="lg" icon={<ArrowRight size={20} />}>
                Start Building Free
              </Button>
            </Link>
            <Link to="/preview">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
          
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Templates</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Free</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>PDF</span>
              <span className={styles.statLabel}>Download</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <motion.div 
            className={styles.featuresHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>Everything You Need</h2>
            <p className={styles.sectionDescription}>
              Powerful features to help you create the perfect resume and portfolio
            </p>
          </motion.div>
          
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    {feature.icon}
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <motion.div 
            className={styles.ctaContent}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.ctaTitle}>Ready to Build Your Resume?</h2>
            <p className={styles.ctaDescription}>
              Start now and create a professional resume in minutes
            </p>
            <Link to="/create">
              <Button size="lg" icon={<Download size={20} />}>
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};