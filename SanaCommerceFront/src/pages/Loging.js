import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/ProfileSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ email, firstName, lastName }));
    // Reset form or redirect user
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="inputGroup">
        <label htmlFor="email" className="label">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
      </div>
      <div className="inputGroup">
        <label htmlFor="firstName" className="label">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" />
      </div>
      <div className="inputGroup">
        <label htmlFor="lastName" className="label">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" />
      </div>
      <button type="submit" className="button">Save Profile</button>
    </form>
  );
};

export default LoginPage;