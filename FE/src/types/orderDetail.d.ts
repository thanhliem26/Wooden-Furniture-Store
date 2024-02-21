interface metadataOrderDetail extends baseInstance {
    metadata: OrderDetailState
}


interface OrderDetailState {
    id: number,
    order_id: number,
    productId: number,
    product_data: ProductState,
    quantity: number,
    createdAt?: string,
    updatedAt?: string,
}