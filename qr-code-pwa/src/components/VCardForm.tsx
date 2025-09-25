import React, { useState, useEffect } from 'react';

// Reusable styled input component for this form
const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition placeholder:text-slate-400 dark:placeholder:text-slate-500"
  />
);

const VCardForm: React.FC<{ onChange: (data: string) => void }> = ({ onChange }) => {
  const [vCard, setVCard] = useState({
    firstName: '', lastName: '', phone: '', email: '', company: '', title: '',
  });

  useEffect(() => {
    const { firstName, lastName, phone, email, company, title } = vCard;
    if (Object.values(vCard).every(v => v === '')) {
      onChange('');
      return;
    }
    let vCardString = 'BEGIN:VCARD\nVERSION:3.0\n';
    vCardString += `N:${lastName};${firstName}\n`;
    if (company) vCardString += `ORG:${company}\n`;
    if (title) vCardString += `TITLE:${title}\n`;
    if (phone) vCardString += `TEL;TYPE=WORK,VOICE:${phone}\n`;
    if (email) vCardString += `EMAIL:${email}\n`;
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
      <StyledInput placeholder="Email" type="email" onChange={handleChange('email')} />
      <StyledInput placeholder="Company" onChange={handleChange('company')} />
      <StyledInput placeholder="Job Title" onChange={handleChange('title')} />
    </div>
  );
};

export default VCardForm;