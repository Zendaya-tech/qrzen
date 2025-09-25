import React, { useState, useEffect } from 'react';

interface VCardFormProps {
  onChange: (data: string) => void;
}

const InputField = ({ label, onChange }: { label: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type="text"
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

const VCardForm: React.FC<VCardFormProps> = ({ onChange }) => {
  const [vCard, setVCard] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    title: '',
  });

  useEffect(() => {
    const { firstName, lastName, phone, email, company, title } = vCard;
    if (!firstName && !lastName && !phone && !email && !company && !title) {
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

  const handleChange = (field: keyof typeof vCard) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setVCard({ ...vCard, [field]: event.target.value });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField label="First Name" onChange={handleChange('firstName')} />
      <InputField label="Last Name" onChange={handleChange('lastName')} />
      <InputField label="Phone Number" onChange={handleChange('phone')} />
      <InputField label="Email" onChange={handleChange('email')} />
      <InputField label="Company" onChange={handleChange('company')} />
      <InputField label="Job Title" onChange={handleChange('title')} />
    </div>
  );
};

export default VCardForm;