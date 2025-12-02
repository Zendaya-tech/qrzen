import React, { useState, useEffect } from 'react';

// Reusable styled input component for this form
const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-4 py-3 text-sm rounded-xl glass-input transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
  />
);

const VCardForm: React.FC<{ onChange: (data: string) => void }> = ({ onChange }) => {
  const [vCard, setVCard] = useState({
    firstName: '', lastName: '', phone: '', phone2: '', email: '', website: '', company: '', title: '',
  });

  useEffect(() => {
    const { firstName, lastName, phone, phone2, email, website, company, title } = vCard;
    if (Object.values(vCard).every(v => v === '')) {
      onChange('');
      return;
    }
    let vCardString = 'BEGIN:VCARD\nVERSION:3.0\n';
    vCardString += `N:${lastName};${firstName}\n`;
    if (company) vCardString += `ORG:${company}\n`;
    if (title) vCardString += `TITLE:${title}\n`;
    if (phone) vCardString += `TEL;TYPE=WORK,VOICE:${phone}\n`;
    if (phone2) vCardString += `TEL;TYPE=CELL,VOICE:${phone2}\n`;
    if (email) vCardString += `EMAIL:${email}\n`;
    if (website) vCardString += `URL:${website}\n`;
    vCardString += 'END:VCARD';
    onChange(vCardString);
  }, [vCard, onChange]);

  const handleChange = (field: keyof typeof vCard) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setVCard(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StyledInput placeholder="First Name" onChange={handleChange('firstName')} />
      <StyledInput placeholder="Last Name" onChange={handleChange('lastName')} />
      <StyledInput placeholder="Phone Number" type="tel" onChange={handleChange('phone')} />
      <StyledInput placeholder="Secondary Phone" type="tel" onChange={handleChange('phone2')} />
      <StyledInput placeholder="Email" type="email" onChange={handleChange('email')} />
      <StyledInput placeholder="Website" type="url" onChange={handleChange('website')} />
      <StyledInput placeholder="Company" onChange={handleChange('company')} />
      <StyledInput placeholder="Job Title" onChange={handleChange('title')} />
    </div>
  );
};

export default VCardForm;