import React from 'react';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import { useResumeStore } from '../../stores/resumeStore';
import { Input } from '../common/Input';

export const PersonalDetails: React.FC = () => {
  const { data, setPersonalDetails } = useResumeStore();
  const { personalDetails } = data;

  return (
    <div>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <Input
          label="Full Name"
          name="fullName"
          placeholder="John Doe"
          value={personalDetails.fullName}
          onChange={(e) => setPersonalDetails({ fullName: e.target.value })}
          icon={<User size={18} />}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={personalDetails.email}
          onChange={(e) => setPersonalDetails({ email: e.target.value })}
          icon={<Mail size={18} />}
          required
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={personalDetails.phone}
          onChange={(e) => setPersonalDetails({ phone: e.target.value })}
          icon={<Phone size={18} />}
        />
        <Input
          label="Location"
          name="location"
          placeholder="San Francisco, CA"
          value={personalDetails.location}
          onChange={(e) => setPersonalDetails({ location: e.target.value })}
          icon={<MapPin size={18} />}
        />
      </div>
    </div>
  );
};