import productApi from "@/api/product";
import Notification from "@/components/notificationSend";
import { statusCode } from "@/constants/index";
import { addProduct, setProductList, setProductSelected } from "@/store/manageProducts";
import * as yup from "yup";

export const schema = yup
    .object({
        Images: yup
            .mixed(),
        ImageSP: yup
            .mixed(),
        type: yup
            .number()
            .required(),
        productShow: yup
            .array()
            .max(3, 'The number of element cannot exceed 3!'),
        id: yup
            .number(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;


export const optionTypeStaticPage = [
    { value: "1", label: "Home Page" },
    { value: "2", label: "Introduce" },
    { value: "3", label: "Product" },
    { value: "4", label: "Contact" },
]

type imageType = {
    name: string,
    origin: string,
    url: string,
}

export type initialValueType = {
    ImageSP: imageType[],
    Images: imageType[],
    productShow: number[],
    type: number | null,
}

export const initialValue: initialValueType = {
    ImageSP: [],
    Images: [],
    productShow: [],
    type: null,
};


// export const handleSubmitCreate = async (data, dispatch, eventEmitter) => {
//     const { message, status, metadata } = await productApi.createProduct(data);

//     if (status === statusCode.CREATED) {
//         dispatch(addProduct(metadata));

//         eventEmitter.emit("submit_modal");

//         Notification({
//             message: "Notify create success",
//             description: message,
//         });
//     }
// }

// export const handleSubmitEdit = async (data, dispatch, eventEmitter) => {
//     const { message, status } = await productApi.updateProduct(data);

//     if (status === statusCode.UPDATED) {
//         dispatch(setProductList(data as ProductStateEdit));

//         eventEmitter.emit("submit_modal");
//         dispatch(setProductSelected(null));

//         Notification({
//             message: 'Notify update succes',
//             description: message,
//         });
//     }
// }