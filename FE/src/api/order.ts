import { axiosService } from "./axiosService";

const orderApi = {
    createOrder(body): Promise<metadataOrderRp> {
        const url = '/v1/api/order/create-orders';
        return axiosService.post(url, body);
    },
    searchOrder(params: paramSearchOrder): Promise<metadataOrder> {
        const url = `/v1/api/order/list`;
        return axiosService.get(url, {params: params})
    },
    // updateProduct(body): Promise<baseUpdate> {
    //     const url = `/v1/api/product/update/`
    //     return axiosService.put(url, body)
    // },
    // deleteProduct(id): Promise<baseDelete> {
    //     const url = `/v1/api/product/delete/${id}`
    //     return axiosService.delete(url)
    // },
}

export default orderApi;