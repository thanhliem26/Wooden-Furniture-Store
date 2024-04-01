import { InputComponent, TextAreComponent } from "@/components/form";
import Notification from "@/components/notificationSend";
import { NotificationError } from "@/utils/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Row } from "antd";
import { useForm } from "react-hook-form";
import { FormData, schema } from "./constant";
import styled from "./index.module.scss";
import { forwardRef, useImperativeHandle } from "react";
import orderApi from "@/api/order";
import { isEmpty } from "lodash";
import { useAppDispatch } from "@/store/index";
import { resetOrderList } from "@/store/orderUser";

interface Props {
  order_id: number;
  dataOrder: OrderDetailState[];
}

const FormPay = ({ order_id, dataOrder }: Props, ref) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormData) => {
    try {
      if (!dataOrder || isEmpty(dataOrder)) {
        Notification({
          message: "Notify warning",
          description: "Bạn vui lòng order trước khi đặt hàng!",
        });

        return;
      }

      const { message } = await orderApi.updateOrder({
        ...data,
        id: order_id,
        order_status: "wait_confirmation",
      });

      Notification({
        message: "Notify success",
        description: message,
      });

      dispatch(resetOrderList());
      reset();
    } catch (error: unknown) {
      NotificationError(error);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      submit: handleSubmit(onSubmit),
    };
  });

  return (
    <div className={styled["form__pay"]}>
      <Form name="change__field-category" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[16, 0]}>
          <Col span={24} md={12}>
            <InputComponent
              name="name"
              control={control}
              errors={errors}
              className="remove__border"
              labelCol={{ span: 24 }}
              label="Họ và tên"
            />
          </Col>
          <Col span={24} md={12}>
            <InputComponent
              name="phone_number"
              control={control}
              errors={errors}
              className="remove__border"
              labelCol={{ span: 24 }}
              label="Số điện thoại"
            />
          </Col>
          <Col span={24}>
            <InputComponent
              name="email"
              control={control}
              errors={errors}
              className="remove__border"
              labelCol={{ span: 24 }}
              label="Email"
            />
          </Col>
          <Col span={24}>
            <InputComponent
              name="address"
              control={control}
              errors={errors}
              className="remove__border"
              labelCol={{ span: 24 }}
              label="Địa chỉ"
            />
          </Col>
          <Col span={24}>
            <TextAreComponent
              name="note"
              control={control}
              errors={errors}
              label="Ghi chú về đơn hàng"
              className="remove__border"
              rows={4}
              labelCol={{ span: 24 }}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default forwardRef(FormPay);
