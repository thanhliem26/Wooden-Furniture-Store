import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "antd";
import InputComponent from "@/components/form/inputComponent";
import ButtonComponent from "@/components/form/buttonComponent";
import {
  LockOutlined,
  UserOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { schema, FormData } from "./constant";
import authApi from "@/api/auth";
import Notification from "@/components/notificationSend";
import { useNavigate } from "react-router-dom";
import { NotificationError } from "@/utils/index";

const FormRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    // use resolver to validate with yup
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const result = await authApi.singUp(data);
      if (result?.["status"].toString() === "error") {
        Notification({
          type: "error",
          message: "Notification Error",
          description: result?.["message"],
        });
        return;
      }

      Notification({
        message: "Notification Success",
        description: "Create new user success",
      });

      navigate("/login");
    } catch (error: unknown) {
      if (error?.["response"]?.["data"]?.["status"] === "error") {
        NotificationError(error)
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="singUp__content-form">
      <h2 className="form__title">Sign up</h2>
      <Form
        name="basic"
        onFinish={handleSubmit(onSubmit)}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <InputComponent
          name="fullName"
          control={control}
          errors={errors}
          placeholder="Your name"
          className="remove__border"
          icon={<UserOutlined className="site-form-item-icon" />}
        />
        <InputComponent
          name="email"
          control={control}
          errors={errors}
          placeholder="Your email"
          className="remove__border"
          icon={<AliwangwangOutlined />}
        />
        <InputComponent
          name="password"
          control={control}
          errors={errors}
          placeholder="Your password"
          className="remove__border"
          type="password"
          icon={<LockOutlined />}
        />
        <InputComponent
          name="re_password"
          control={control}
          errors={errors}
          placeholder="Repeat your password"
          className="remove__border"
          type="password"
          icon={<LockOutlined />}
        />
        <ButtonComponent
          wrapperCol={{ offset: 8, span: 16 }}
          htmlType="submit"
          label="Register"
          className="btn__submit"
          loading={loading}
        />
      </Form>
    </div>
  );
};

export default FormRegister;
