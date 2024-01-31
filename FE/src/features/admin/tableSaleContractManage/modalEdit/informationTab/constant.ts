import * as yup from "yup";

export const schema = yup
    .object({
        email: yup
            .string()
            .email("email is not valid!")
            .required("email is required"),
        fullName: yup
            .string()
            .required("Full name is required"),
        role_user: yup
            .string()
            .required("role_user is required"),
        address: yup
            .string(),
        dateOfBirth: yup
            .string(),
        phoneNumber: yup
            .string(),
        sex: yup
            .string(),
        id: yup
            .number(),
    })
    .required();

export type FormData = yup.InferType<typeof schema>;