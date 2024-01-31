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
    userSelected: null
}

export const manageUserSlice = createSlice({
    name: 'manage_user',
    initialState,
    reducers: {
        setUserSelected: (state, action: PayloadAction<UserState>) => {
            state.userSelected = action.payload;
        },
        setUserList: (state, action: PayloadAction<UserStateEdit>) => {
            const {id, ...value} = action.payload;
            
            state.userList = state.userList.map((user: UserState) => {
                if(user.id === id) {
                    user = {...user, ...value}
                }

                return user;
            })
        }
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
export const { setUserSelected, setUserList } = manageUserSlice.actions
export default manageUserSlice.reducer