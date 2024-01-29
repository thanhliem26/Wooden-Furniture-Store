import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import userApi from '@/api/user';

//redux thunk
export const fetchAllUser = createAsyncThunk(
    'users/fetchAllUser',
    async (): Promise<UserState[]> => {
        const { metadata } = await userApi.getUsers();
        return metadata;
    }
)

const initialState: state_reducer_manageUser = {
    userList: [],
    loading: true,
}

export const manageUserSlice = createSlice({
    name: 'manage_user',
    initialState,
    reducers: {
        // setUserInfo: (state, action: PayloadAction<UserState>) => {
        //     state = { ...state, ...action.payload }
        // },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            state = { ...state, loading: false, userList: action.payload.map((item, index) => ({...item, key: index})) }

            return state;
        }).addCase(fetchAllUser.pending, (state, action) => {
            state = { ...state, loading: true }

            return state;
        }).addCase(fetchAllUser.rejected, (state, action) => {
            state = { ...state, loading: true }

            return state;
        }) 
       
    },
})

// Action creators are generated for each case reducer function
// export const { setUserInfo } = manageUserSlice.actions
export default manageUserSlice.reducer