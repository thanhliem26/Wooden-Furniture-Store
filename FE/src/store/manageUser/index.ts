import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import userApi from '@/api/user';

interface searchUserMg {
    search: string,
    params: paginationQuery | {},
}

//redux thunk
export const fetchAllUser = createAsyncThunk(
    'users/fetchAllUser',
    async (params: paginationQuery): Promise<typeMetadataUser> => {
        const { metadata } = await userApi.getUsers(params);
        return metadata;
    }
)

export const searchUser = createAsyncThunk(
    'users/searchUser',
    async ({search, params}: searchUserMg): Promise<typeMetadataUser> => {
        const { metadata } = await userApi.searchUser(search, params);
        return metadata;
    }
)

const initialState: state_reducer_manageUser = {
    userList: [],
    loading: true,
    userSelected: null,
    pagination: {
        current: 1,
        pageSize: 10,
    },
    total: 0,
}

export const manageUserSlice = createSlice({
    name: 'manage_user',
    initialState,
    reducers: {
        setUserSelected: (state, action: PayloadAction<UserState | null>) => {
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
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            
            state.userList = state.userList.filter((user: UserState) => {
               return user.id !== id;
            })
            state.total = state.total - 1;
        },
        addUser: (state, action: PayloadAction<UserState>) => {
            state.userList = [...state.userList, action.payload]
            state.total = state.total + 1;
        },
        setPagination: (state, action: PayloadAction<basePagination>) => {
            console.log("set pagination", action.payload)
            state.pagination = {...state.pagination, ...action.payload};
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            const { count, rows } = action.payload;
            state = { ...state, loading: false, total: count, userList: rows.map((item, index) => ({...item, key: index})) }
            return state;
        }).addCase(fetchAllUser.pending, (state, action) => {
            state = { ...state, total: 0, loading: true }
            return state;
        }).addCase(fetchAllUser.rejected, (state, action) => {
            state = { ...state, total: 0, loading: false }
            return state;
        }) 


        builder.addCase(searchUser.fulfilled, (state, action) => {
            const { count, rows } = action.payload;
            state = { ...state, loading: false, total: count ,userList: rows.map((item, index) => ({...item, key: index})) }

            return state;
        }).addCase(searchUser.pending, (state, action) => {
            state = { ...state, total: 0, loading: true }

            return state;
        }).addCase(searchUser.rejected, (state, action) => {
            state = { ...state, total: 0, loading: false }

            return state;
        }) 
       
    },
})

// Action creators are generated for each case reducer function
export const { setUserSelected, setUserList, deleteUser, addUser, setPagination } = manageUserSlice.actions
export default manageUserSlice.reducer