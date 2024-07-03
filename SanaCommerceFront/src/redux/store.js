import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import profileReducer from './ProfileSlice';

const loadCartState = () => {
  try {
    const serializedCart = localStorage.getItem('cartState');
    if (serializedCart === null) {
      return undefined; 
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    return undefined;
  }
};
const loadProfileState = () => {
  try {
    const serializedProfile = localStorage.getItem('profileState');
    console.log("Loaded", serializedProfile);
    if (serializedProfile === null) {
      return undefined;
    }
    return JSON.parse(serializedProfile);
  } catch (err) {
    return undefined;
  }
};

const saveCartState = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    console.log("Saved", serializedCart);
    localStorage.setItem('cartState', serializedCart);
  } catch (err) {
    // Handle write errors
  }
};

const saveProfileState = (state) => {
  try {
    const serializedProfile = JSON.stringify(state);
    localStorage.setItem('profileState', serializedProfile);
  } catch (err) {
    // Handle write errors
  }
};

const preloadedState = {
  cart: loadCartState(),
  profile: loadProfileState(),
};

const store = configureStore({
  reducer: {  
    cart: cartReducer,
    profile: profileReducer
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
  saveProfileState(store.getState().profile);
});

export default store;