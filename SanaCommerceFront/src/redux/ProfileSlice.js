import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    email: '',
    firstName: '',
    lastName: '',
  },
  reducers: {
    updateProfile: (state, action) => {
      const { email, firstName, lastName } = action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
    },
  },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;