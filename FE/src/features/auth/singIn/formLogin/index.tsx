import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "antd";
import InputComponent from "@/components/form/inputComponent";
import ButtonComponent from "@/components/form/buttonComponent";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { schema, FormData } from "./constant";
import authApi from "@/api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "@/components/notificationSend";
import { setToken, setUser, setRefreshToken } from "@/utils/index";
import { setHeader } from "@/api/axiosService";

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

      const { metadata } = await authApi.login(data);
      const { tokens, user } = metadata;

      Notification({
        message: "Notification Success",
        description: "Login success",
      });
      setUser(user)
      setToken(tokens.accessToken)
      setRefreshToken(tokens.refreshToken)
      setHeader('Authorization', tokens.accessToken)
      navigate('/')
      window.location.reload();
    } catch (error: unknown) {
      console.log("🚀 ~ error:", error);
      if (error?.["response"]?.["data"]?.["status"] === "error") {
        Notification({
          type: "error",
          message: "Notification Error",
          description: error?.["response"]?.["data"]?.["message"],
        });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="singIn__content-form">
      <h2 className="form__title">Sign In</h2>
      <Form
        name="basic"
        onFinish={handleSubmit(onSubmit)}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <InputComponent
          name="email"
          control={control}
          errors={errors}
          placeholder="Your email"
          className="remove__border"
          icon={<UserOutlined className="site-form-item-icon" />}
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
        <ButtonComponent
          wrapperCol={{ offset: 8, span: 16 }}
          htmlType="submit"
          label="Login"
          className="btn__submit"
          loading={loading}
        />
      </Form>
    </div>
  );
};

export default FormRegister;
