import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@axios/axios';

const initialState = {
  user: null,
};

export const __signup = createAsyncThunk('signup', async (payload, api) => {
  try {
    // TODO: 예외처리
    const resp = await axios.post(`api/auth/sign-up`, payload);
  } catch (err) {
    return api.rejectWithValue(err.response.status);
  }
});

export const __login = createAsyncThunk('login', async (payload, api) => {
  try {
    // TODO: 예외처리
    const resp = await axios.post(`api/auth/login`, payload);
  } catch (err) {
    return api.rejectWithValue(err.response.status);
  }
});

// Slice 생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //TODO: 로그인 상태 유지 추가
  },
  extraReducers: (builder) => {
    builder
      // 회원가입
      .addCase(__signup.fulfilled, (state, action) => {
        // TODO
      })
      .addCase(__signup.rejected, (state, action) => {
        // TODO
      })

      // 로그인
      .addCase(__login.fulfilled, (state, action) => {
        // TODO
      })
      .addCase(__login.rejected, (state, action) => {
        // TODO
      });
  },
});

export default userSlice.reducer;
