import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    userId: null,
    email: '',
    nickname: '',
    phoneNumber: '',
    imageUrl: '',
  },
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
    updateUserProfile: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { setUser, clearUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
