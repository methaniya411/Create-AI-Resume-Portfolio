import React from 'react';
import { Globe } from 'lucide-react';
import { useResumeStore } from '../../stores/resumeStore';
import { Input } from '../common/Input';

export const SocialLinks: React.FC = () => {
  const { data, setSocialLinks } = useResumeStore();
  const { socialLinks } = data;

  return (
    <div>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <Input
          label="LinkedIn"
          name="linkedin"
          placeholder="https://linkedin.com/in/yourprofile"
          value={socialLinks.linkedin}
          onChange={(e) => setSocialLinks({ linkedin: e.target.value })}
        />
        <Input
          label="GitHub"
          name="github"
          placeholder="https://github.com/yourusername"
          value={socialLinks.github}
          onChange={(e) => setSocialLinks({ github: e.target.value })}
        />
        <Input
          label="Twitter/X"
          name="twitter"
          placeholder="https://twitter.com/yourhandle"
          value={socialLinks.twitter}
          onChange={(e) => setSocialLinks({ twitter: e.target.value })}
        />
        <Input
          label="Personal Website"
          name="website"
          placeholder="https://yourwebsite.com"
          value={socialLinks.website}
          onChange={(e) => setSocialLinks({ website: e.target.value })}
          icon={<Globe size={18} />}
        />
        <Input
          label="Other Links"
          name="other"
          placeholder="Any other relevant links (Dribbble, Behance, etc.)"
          value={socialLinks.other}
          onChange={(e) => setSocialLinks({ other: e.target.value })}
        />
      </div>
    </div>
  );
};