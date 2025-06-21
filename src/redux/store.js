import { configureStore } from '@reduxjs/toolkit';
import vitalsReducer from './vitalsSlice';

export const store = configureStore({
  reducer: {
    vitals: vitalsReducer,
  },
});
