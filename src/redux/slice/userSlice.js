import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUser: (state) => {
      state.userInfo = undefined;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
