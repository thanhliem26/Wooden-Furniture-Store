import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

//reducer
import counterReducer from './counter/index';
import userReducer from './user/index';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

//dispatch async thunk
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
