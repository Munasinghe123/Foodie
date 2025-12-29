import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  role: "admin" | "user" | "restaurantOwner";
  name: string
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: true
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
    updateUserRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
      }
    }

  },
});

export const { loginSuccess, logout, finishLoading,updateUserRole } = userSlice.actions;
export default userSlice.reducer;
