import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@redux/slice/userSlice';
import teamSlice from '@redux/slice/teamSlice';

const store = configureStore({
  reducer: { user: userSlice, team: teamSlice },
});

export default store;
