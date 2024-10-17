import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import windowReducer from './componenets/Redux/windowSlice';

const store = configureStore({
  reducer: {
    window: windowReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable check
    }),
});

export default store;
