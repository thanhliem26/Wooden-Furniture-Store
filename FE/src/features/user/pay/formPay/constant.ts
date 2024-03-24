import * as yup from "yup";

export const schema = yup
    .object({
        name: yup
            .string()
            .required(),
        email: yup
            .string()
            .email("email is not valid!")
            .required("email is required"),
        phone_number: yup
            .string().required(),
        address: yup
            .string().required(),
        note: yup
            .string().required(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;
