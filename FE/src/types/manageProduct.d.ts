interface state_reducer_manageProducts {
    productList: ProductState[],
    loading: boolean,
    productSelected: null | ProductState,
    pagination: basePagination,
    total: number
}

interface ProductState {
    id: number,
    name: string,
    price: number,
    stock_quantity: number,
    images: string,
    category_id: number,
    description: string,
    createdAt: string,
    updatedAt: string,
    key?: number,
}

interface typeMetadataProduct {
    count: number,
    rows: ProductState[],
}

interface metadataProduct extends baseInstance {
    metadata: typeMetadataProduct
}

interface metadataProductRp extends baseInstance {
    metadata: ProductState
}

interface ProductStateEdit {
    id?: number,
    name: string,
    price: number,
    stock_quantity: number,
    images?: string,
    category_id: number,
    description?: string,
}
