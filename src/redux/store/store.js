import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@redux/slice/userSlice';
import teamSlice from '@redux/slice/teamSlice';
import websocketSlice from '@redux/slice/websocketSlice';

const store = configureStore({
  reducer: { user: userSlice, team: teamSlice, websocket: websocketSlice },
});

export default store;
