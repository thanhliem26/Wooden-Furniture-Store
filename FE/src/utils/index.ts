import { STAFF_MANAGE_TOKEN, STAFF_MANAGE_USER, STAFF_REFRESH_MANAGE_USER } from "@/constants/index";
import Cookies from 'js-cookie';

export const isUserLoggedIn = (): any => localStorage.getItem(STAFF_MANAGE_TOKEN);

export const setToken = (token: string) => localStorage.setItem(STAFF_MANAGE_TOKEN, token);

export const setRefreshToken = (refreshToken: string) => {
    Cookies.set(STAFF_REFRESH_MANAGE_USER, refreshToken, { secure: true, sameSite: 'strict', path: '/', expires: 7 });
}

export const removeToken = () => localStorage.removeItem(STAFF_MANAGE_TOKEN);

export const removeRefreshToken = () => {
    Cookies.remove(STAFF_REFRESH_MANAGE_USER)
};

export const getToken = () => localStorage.getItem(STAFF_MANAGE_TOKEN);

export const getRefreshToken = () => {
    return Cookies.get(STAFF_REFRESH_MANAGE_USER)
};

export const setUser = (user: infoUser) => localStorage.setItem(STAFF_MANAGE_USER, JSON.stringify(user));

export const getUser = () => {
    const isLogin = isUserLoggedIn();
    const userInfo = localStorage.getItem(STAFF_MANAGE_USER);

    if (isLogin && userInfo) {
        return JSON.parse(userInfo)
    };

    return null;
}


export const removeUser = () => localStorage.removeItem(STAFF_MANAGE_USER);

