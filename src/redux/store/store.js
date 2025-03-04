import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@redux/slice/userSlice';

//TODO: 현재 스토어 사용 안 함.
//프로젝트 마무리 단계에서도 사용안 할 경우 제거
const store = configureStore({
  reducer: { user: userSlice },
});

export default store;
