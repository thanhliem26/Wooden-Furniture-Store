import productApi from "@/api/product";
import Notification from "@/components/notificationSend";
import { statusCode } from "@/constants/index";
import { addProduct, setProductList, setProductSelected } from "@/store/manageProducts";
import * as yup from "yup";

export const schema = yup
    .object({
        name: yup
            .string()
            .required("Category name is required"),
        description: yup
            .string(),
        id: yup
            .number(),
        price: yup
            .number().positive('value is a number integer').integer('value is a number integer')
            .required(),
        stock_quantity: yup
            .number().positive('value is a number integer').integer('value is a number integer')
            .required(),
        category_id: yup
            .number()
            .required(),
        images: yup
            .array()
            .min(1, 'image is not empty')
            .required(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;


export const handleSubmitCreate = async (data, dispatch, eventEmitter) => {
    const { message, status, metadata } = await productApi.createProduct(data);

    if (status === statusCode.CREATED) {
        dispatch(addProduct(metadata));

        eventEmitter.emit("submit_modal");

        Notification({
            message: "Notify create success",
            description: message,
        });
    }
}

export const handleSubmitEdit = async (data, dispatch, eventEmitter) => {
    const { message, status } = await productApi.updateProduct(data);

    if (status === statusCode.UPDATED) {
        dispatch(setProductList(data as ProductStateEdit));

        eventEmitter.emit("submit_modal");
        dispatch(setProductSelected(null));

        Notification({
            message: 'Notify update succes',
            description: message,
        });
    }
}