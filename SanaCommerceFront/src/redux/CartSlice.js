import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  endCursor: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newProduct = action.payload;
      const existingProduct = state.items.find(
        (item) => item.id === newProduct.id
      );
      if (!existingProduct) {
        state.items.push(newProduct);
      } else {
        existingProduct.quantity = newProduct.quantity;
      }
    },
    modifyQuantityCart(state, action) {
      const { id } = action.payload;
      let quantity = action.payload.quantity;
      const existingProduct = state.items.find((item) => item.id === id);
      if (existingProduct) {
        console.log(existingProduct);
        if (quantity > existingProduct.stock) {
          quantity = existingProduct.stock;
        }
        if (quantity === 0) {
          state.items = state.items.filter((item) => item.id !== id);
        } else existingProduct.quantity = quantity;
      }
    },
    setEndCursor(state, action) {
      state.endCursor = action.payload;
    },
  },
});

export const { addToCart, modifyQuantityCart, setEndCursor } = cartSlice.actions;

export default cartSlice.reducer;
