import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@redux/slice/userSlice';

const store = configureStore({
  reducer: { user: userSlice },
});

export default store;
