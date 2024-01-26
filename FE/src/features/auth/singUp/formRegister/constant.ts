import * as yup from "yup";

export const schema = yup
.object({
  fullName: yup.string().required("username is required"),
  email: yup
    .string()
    .email("email is not valid!")
    .required("email is required"),
  password: yup
    .string()
    .min(8, "Minimum password needs 8 characters ")
    .test(
      "contains-number-and-character",
      "Password must contain both numbers and characters",
      (value) => {
        if (!value) return false; // Return false if the value is empty

        const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])/;
        const containsCharacterAndNumber = regex.test(value);

        return containsCharacterAndNumber;
      }
    )
    .required("Password is required"),
  re_password: yup
    .string()
    .test(
      "repeat-password",
      "Repeat Password must match password",
      (value, schema: any) => {
        const { password } = schema["from"][0]["value"];
        if (!value) return false; // Return false if the value is empty

        return value === password;
      }
    )
    .required("Repeat Password is required"),
})
.required();

export type FormData = yup.InferType<typeof schema>;