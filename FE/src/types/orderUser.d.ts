interface state_reducer_orderUser {
    id: number | null,
    order_status: string,
    loading: boolean,
    list_order: orderItem[]
}

interface orderItem {
    orderDetailId: number,
    productId: number,
    categoryId: number,
    quantity: number,
    name: string,
    price: number,
    stock_quantity: number,
    description: string,
    images: typeImageS3[],
}

interface paramSearchOrder {
    order_status: string,
    user_id: number,
    limit?: number,
}

interface metadataOrder extends baseInstance {
    metadata: typeMetadataOrder
}

interface metadataOrderRp extends baseInstance {
    metadata: OrderState
}

interface typeMetadataOrder {
    count: number,
    rows: OrderState[],
}

interface OrderState {
    id: number,
    user_id: number,
    order_status: string,
    order_detail: OrderDetailState[],
    createdAt: string,
    updatedAt: string,
}