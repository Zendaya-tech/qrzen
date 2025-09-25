import React, { useState, useEffect } from 'react';
import { TextField, Grid } from '@mui/material';

interface VCardFormProps {
  onChange: (data: string) => void;
}

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
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField label="First Name" fullWidth onChange={handleChange('firstName')} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Last Name" fullWidth onChange={handleChange('lastName')} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Phone Number" fullWidth onChange={handleChange('phone')} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Email" fullWidth onChange={handleChange('email')} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Company" fullWidth onChange={handleChange('company')} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Job Title" fullWidth onChange={handleChange('title')} />
      </Grid>
    </Grid>
  );
};

export default VCardForm;