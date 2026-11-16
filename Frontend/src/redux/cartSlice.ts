import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//saving state in localstorage
const saveCartToStorage = (state: CartState) => {
    localStorage.setItem("cart", JSON.stringify(state));
};


//one item in the cart
export interface CartItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

//all cart items
interface CartState {
    items: CartItem[];
    restaurantId: string | null;
}

const storedCart = localStorage.getItem("cart");

const initialState: CartState = storedCart
    ? JSON.parse(storedCart)
    : {
        items: [],
        restaurantId: null,
    };

//slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<Omit<CartItem, "quantity"> & { restaurantId: string }>
        ) => {
            //  If cart is empty, lock it to this restaurant
            if (state.restaurantId === null) {
                state.restaurantId = action.payload.restaurantId;
            }

            // If cart belongs to another restaurant → block
            if (state.restaurantId !== action.payload.restaurantId) {
                alert("You can only order from one restaurant at a time.");
                return;
            }

            // Normal add logic
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }

            saveCartToStorage(state);
        },


        increaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
            saveCartToStorage(state);
        },

        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.id === action.payload);

            if (!item) return;

            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.id !== action.payload);
            }

            // Cart empty → reset restaurant
            if (state.items.length === 0) {
                state.restaurantId = null;
            }

            saveCartToStorage(state);
        },

        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            );

            // if cart is empty, unlock restaurant
            if (state.items.length === 0) {
                state.restaurantId = null;
            }

            saveCartToStorage(state);
        },

        clearCart: (state) => {
            state.items = [];
            state.restaurantId = null;
            localStorage.removeItem("cart");
        },


    },
})

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem,clearCart } = cartSlice.actions;
export default cartSlice.reducer;









