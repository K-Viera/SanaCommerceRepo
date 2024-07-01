import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Function to load the cart state from localStorage
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

// Function to save the cart state to localStorage
const saveCartState = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    console.log("Saved");
    localStorage.setItem('cartState', serializedCart);
  } catch (err) {
    // Handle write errors
  }
};

const preloadedState = {
  cart: loadCartState(), // Load cart state from localStorage
};

const store = configureStore({
  reducer: {  
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export default store;