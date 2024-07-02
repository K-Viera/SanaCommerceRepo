import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import profileReducer from './ProfileSlice';

const loadCartState = () => {
  try {
    const serializedCart = localStorage.getItem('cartState');
    console.log("Loaded");
    if (serializedCart === null) {
      return undefined; // No saved state found
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    return undefined;
  }
};

const saveCartState = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    console.log("Saved",serializedCart);
    localStorage.setItem('cartState', serializedCart);
  } catch (err) {
    // Handle write errors
  }
};

const preloadedState = {
  cart: loadCartState(),
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
});

export default store;