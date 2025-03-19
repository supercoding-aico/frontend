import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latestTeam: {
    teamId: null,
    name: '',
    lastReadAt: '',
    lastMessageAt: '',
  },
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setLatestTeam: (state, action) => {
      state.latestTeam = action.payload;
    },
  },
});

export const { setLatestTeam } = teamSlice.actions;
export default teamSlice.reducer;
