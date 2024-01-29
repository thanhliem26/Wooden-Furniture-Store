import { axiosService } from "./axiosService";

const userApi = {
    // createUser(body) {
    //     const url = '/user/create';
    //     return axiosService.post(url, body);
    // },
    getUsers(): Promise<metadataAllUser> {
        const url = '/v1/api/user/list';
        return axiosService.get(url)
    },
    getMenu(): Promise<typeMenu> {
        const url = '/v1/api/user/menu';
        return axiosService.get(url);
    },
    getUserInfo(): Promise<metadataUser> {
        const url = `/v1/api/user/me`;
        return axiosService.get(url)
    },
    // editUser(id, body) {
    //     const url = `/user/${id}`
    //     return axiosService.put(url, body)
    // },
    // deleteUser(id, body) {
    //     const url = `/user/delete/${id}`
    //     return axiosService.put(url, body)
    // },
    // changePassword(body) {
    //     const url = '/change-password'
    //     return axiosService.post(url, body)
    // },
    // getUsersOfStore(id) {
    //     const url = `/get-users-of-store/${id}`
    //     return axiosService.get(url)
    // },
    // changePasswordUser(id, body) {
    //     const url = `/change-other-password/${id}`
    //     return axiosService.put(url, body)
    // },
}

export default userApi;