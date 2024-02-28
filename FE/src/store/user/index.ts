import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import userApi from '@/api/user';

//redux thunk
export const fetchUserInfo = createAsyncThunk(
    'users/fetchMe',
    async (): Promise<UserState> => {
        const { metadata } = await userApi.getUserInfo();
        return metadata;
    }
)

const initialState: UserState = {
    id: 0,
    fullName: '',
    email: '',
    address: '',
    dateOfBirth: '',
    phoneNumber: '',
    role_user: '',
    sex: '',
    deleteFlg: 0,
    avatar: '',
    avatar_support: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserState>) => {
            state = { ...state, ...action.payload }

            return state;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state = { ...state, ...action.payload }

            return state;
        })
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions
export default userSlice.reducer