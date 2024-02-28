import Notification from "@/components/notificationSend/index.tsx";
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

export { default as eventEmitter } from './emitter.ts';

export const removeEmptyInOBject = (object) => {
    for (const property in object) {
        if (!object[property]) {
            delete object[property];
        }
    }
}

export const reduceImageQuality = async (blob, quality, callback) => {
    if (!blob) return;

    const percentQuality = quality / 100;
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0);
        canvas.toBlob(
            (newBlob) => {
                callback({ filterBlob: newBlob, quality: quality });
            },
            "image/jpeg",
            percentQuality
        );
    };
};


export const formatCurrency = (number) => {
    // Chuyển đổi số thành chuỗi và ngược lại
    let strNumber = number.toString();
    // Biểu thức chính quy để chia nhỏ chuỗi thành các nhóm ba số
    let regex = /(\d)(?=(\d{3})+(?!\d))/g;
    // Thay thế mỗi nhóm ba số bằng nhóm ba số đó cộng với dấu phân cách (,)
    return strNumber.replace(regex, "$1,");
}

export const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const NotificationError = (error) => {
    return Notification({
        type: "error",
        message: "Notification Error",
        description: error?.["response"]?.["data"]?.["message"],
    });
}

