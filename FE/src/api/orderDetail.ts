import { axiosService } from "./axiosService";

const orderDetailApi = {
    createOrderDetail(body): Promise<metadataOrderDetail> {
        const url = '/v1/api/orderDetail/create';
        return axiosService.post(url, body);
    },
    getByOrderId(params: paramSearchOrderDetail): Promise<listOrderDetailByOrderId> {
        const url = `/v1/api/orderDetail/get-orderDetail-byId`;
        return axiosService.get(url, {params: params})
    },
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