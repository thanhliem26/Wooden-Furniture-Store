import * as yup from "yup";

export const schema = yup
.object({
  email: yup
    .string()
    .email("email is not valid!")
    .required("email is required"),
  password: yup
    .string()
    .required("Password is required"),
})
.required();

export type FormData = yup.InferType<typeof schema>;