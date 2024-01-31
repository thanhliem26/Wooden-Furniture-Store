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
    getUserById(id): Promise<metadataUser> {
        const url = `/v1/api/user/${id}`;
        return axiosService.get(url)
    },
    editUser(id, body): Promise<typeEditUser> {
        const url = `/v1/api/user/update/${id}`
        return axiosService.put(url, body)
    },
    // deleteUser(id, body) {
    //     const url = `/user/delete/${id}`
    //     return axiosService.put(url, body)
    // },
    changePassword(body): Promise<typeEditUser> {
        const url = '/v1/api/user/changePassword'
        return axiosService.put(url, body)
    },
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