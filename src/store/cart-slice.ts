import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
};

type CartState = {
  items: CartItem[];
  totalQuantity: number;
};
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{ id: string; title: string; price: number }>) { 
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity++;
            } else {
                const newItem: CartItem = {
                    id: action.payload.id,
                    title: action.payload.title,
                    price: action.payload.price,
                    quantity: 1,
                };
                state.items.push(newItem);
            }
            state.totalQuantity++;
        },
        removeFromCart(state, action: PayloadAction<{ id: string }>) {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.totalQuantity -= state.items[itemIndex].quantity;
                state.items.splice(itemIndex, 1);
            }
        },
    },
})
