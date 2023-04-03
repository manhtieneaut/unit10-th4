
import { call, put, takeLatest } from 'redux-saga/effects';
import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  status: 'idle'
};


export const getUserAsync = createAction('user/getUserAsync');
export const addUserAsync = createAction('user/addUserAsync');

function* getUserSaga(action) {
  const data = yield call(() => axios.get('http://localhost:3000/users', action.payload));
  yield put(getUser(data?.data));
}

function* addUserSaga(action) {
  const data = yield call(() => axios.post('http://localhost:3000/users', action.payload));
  yield put(addUser(data?.data));
}

export function* watchGetUserSaga() {
  yield takeLatest(getUserAsync, getUserSaga);
}

export function* watchAddUserSaga() {
  yield takeLatest(addUserAsync, addUserSaga);
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
  },
});

export const { getUser, addUser, removeUser } = userSlice.actions;

export const selectUser = (state) => state.userSlice;

export default userSlice.reducer;