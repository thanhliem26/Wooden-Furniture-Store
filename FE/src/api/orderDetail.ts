import { axiosService } from "./axiosService";

const orderDetailApi = {
    createOrderDetail(body): Promise<metadataOrderDetail> {
        const url = '/v1/api/orderDetail/create';
        return axiosService.post(url, body);
    },
    // searchOrder(params: paramSearchOrder): Promise<metadataOrder> {
    //     const url = `/v1/api/order/list`;
    //     return axiosService.get(url, {params: params})
    // },
    // updateProduct(body): Promise<baseUpdate> {
    //     const url = `/v1/api/product/update/`
    //     return axiosService.put(url, body)
    // },
    deleteOrderDetail(id): Promise<baseDelete> {
        const url = `/v1/api/orderDetail/delete/${id}`
        return axiosService.delete(url)
    },
}

export default orderDetailApi;