import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/ProfileSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const LoginPage = () => {
  const profile = useSelector((state) => state.profile);
  
  const [email, setEmail] = useState(profile.email);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ email, firstName, lastName }));
    Swal.fire({
      title: 'Success!',
      text: 'Profile updated successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="inputGroup">
        <label htmlFor="email" className="label">Email:</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
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