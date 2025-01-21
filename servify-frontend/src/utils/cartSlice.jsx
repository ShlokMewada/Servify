import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.name === action.payload
      );
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.name !== action.payload);
      }
    },
    clearCart: (state) => {
      state.cart.length = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
