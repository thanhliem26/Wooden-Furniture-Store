import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import orderApi from '@/api/order';
import { isJson } from '@/utils/index';

//redux thunk
export const searchOrder = createAsyncThunk(
    'users/searchOrder',
    async (params: paramSearchOrder): Promise<typeMetadataOrder> => {
        const { metadata } = await orderApi.searchOrder(params);
        return metadata;
    }
)


const initialState: state_reducer_orderUser = {
    id: null,
    order_status: 'pending',
    loading: false,
    list_order: [],
}

export const orderUser = createSlice({
    name: 'order_user',
    initialState,
    reducers: {
        deleteOrder: (state, action: PayloadAction<number>) => {
            state.list_order = state.list_order.filter((item) => {
                return item.orderDetailId !== action.payload;
            })
        
            return state;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(searchOrder.fulfilled, (state, action) => {
            const { rows } = action.payload;
            const [orderField] = rows;
            if(orderField) {
                const { id, order_status, order_detail } = orderField;

                const list_order = order_detail.map(({ product_data, ...orderDetail }) => {
                    return {
                        orderDetailId: orderDetail.id,
                        productId: orderDetail.productId,
                        categoryId: product_data.category_id,
                        quantity: orderDetail.quantity,
                        name: product_data.name,
                        price: product_data.price,
                        stock_quantity: product_data.stock_quantity,
                        description: product_data.description,
                        images: isJson(product_data.images) ? JSON.parse(product_data.images) : [],
                    }
                })
    
                state = { ...state, loading: false, id, order_status, list_order };
            }

            return state;
        }).addCase(searchOrder.pending, (state) => {
            state = { ...state, loading: true }

            return state;
        }).addCase(searchOrder.rejected, (state) => {
            state = { ...state, loading: false }

            return state;
        })

    },
})

// Action creators are generated for each case reducer function
export const { 
    // setUserSelected, 
    // setUserList, 
    deleteOrder, 
    // addUser, 
    // setPagination 
} = orderUser.actions
export default orderUser.reducer