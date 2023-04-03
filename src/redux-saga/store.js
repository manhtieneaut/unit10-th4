

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userSlice from './userSlide';
import rootSaga from './saga';

let sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);
