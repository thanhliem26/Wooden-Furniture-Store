import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

//reducer
import userReducer from './user/index';
import manageUserReducer from './manageUser';
import manageCategoryReducer from './manageCategories';
import manageProductReducer from './manageProducts';
import orderUser from './orderUser';
import manageComment from './comments';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderUser,
    manageUser: manageUserReducer,
    manageCategory: manageCategoryReducer,
    manageProduct: manageProductReducer,
    comments: manageComment,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

//dispatch async thunk
export const useAppDispatch = () => useDispatch<AppDispatch>()
//get state async thunk
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
