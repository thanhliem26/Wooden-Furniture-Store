import { axiosService } from "./axiosService";
import { HEADER } from '@/constants/index';

const authApi = {
    helloWorld() {
        const url = '/';
        return axiosService.get(url);
    },
    singUp(data: formDataSingUp): Promise<responseSingUp> {
        const url = '/v1/api/user/signup';
        return axiosService.post(url, data);
    },
    login(body: formDataSingIn): Promise<responseToken> {
        const url = '/v1/api/user/login';
        return axiosService.post(url, body);
    },
    reFreshToken(refreshToken: string): Promise<responseToken> {
        const url = '/v1/api/user/handleRefreshToken';
        return axiosService.post(url, undefined, {headers: {[HEADER.REFRESHTOKEN]: refreshToken}});
    },
}

export default authApi;