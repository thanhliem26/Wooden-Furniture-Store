import { useState } from "react";
import styled from "../index.module.scss";
import { Col, Row, Form } from "antd";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  handleGetSchema,
  handleSubmitCreate,
  handleSubmitEdit,
} from "../constant";
import { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import { setUserSelected } from "@/store/manageUser";
import dayjs from "dayjs";
import { eventEmitter } from "@/utils/index";
import images from "@/constants/images";
import {
  ButtonComponent,
  CheckboxComponent,
  InputComponent,
  InputDateComponent,
  SelectComponent,
} from "@/components/form";

interface Props {
  isEdit?: boolean;
}

const ContentInfoChange = ({ isEdit }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const userSelected = useAppSelector(
    (state: RootState) => state.manageUser.userSelected
  );

  const dispatch = useAppDispatch();

  const schema = handleGetSchema({ isEdit: isEdit });
  type FormData = yup.InferType<typeof schema>;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    // use resolver to validate with yup
    resolver: yupResolver(schema),
    defaultValues: {
      email: userSelected?.email,
      fullName: userSelected?.fullName,
      role_user: userSelected?.role_user,
      address: userSelected?.address,
      // @ts-ignores
      dateOfBirth: dayjs(userSelected?.dateOfBirth),
      phoneNumber: userSelected?.phoneNumber,
      sex: userSelected?.sex,
      id: userSelected?.id,
    },
  });

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    const today = moment();
    // Trả về true nếu current là ngày trong tương lai
    return current && current > today;
  };

  //@ts-ignore
  const showPassword = useWatch({
    control,
    name: "show",
    defaultValue: false,
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      isEdit
        ? handleSubmitEdit(data, dispatch, eventEmitter)
        : handleSubmitCreate(data, dispatch, eventEmitter);
    } catch (error: unknown) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleClose = () => {
    dispatch(setUserSelected(null));
    eventEmitter.emit("cancel_modal");
  };

  return (
    <div className={styled["information__tab"]}>
      <div className="information__tab-content">
        <Form
          name="change_information"
          onFinish={handleSubmit(onSubmit)}
          onFinishFailed={onFinishFailed}
        >
          <div className="information__tab-image">
            <div className="tab__image-avatarSupport">
              <img src={images.AvatarSupporting} alt="avatar supporting" />
            </div>
            <div className="tab__image-avatar">
              <img src={images.AvatarDefault} alt="avatar" />
            </div>
          </div>
          <Row gutter={[16, 16]}>
            <Col md={6} span={24}>
              Email <span className="required">*</span>
            </Col>
            <Col md={18} span={24}>
              <InputComponent
                name="email"
                control={control}
                errors={errors}
                placeholder="Email"
                className="remove__border"
                disabled={isEdit}
              />
            </Col>
            <Col md={6} span={24}>
              Full Name <span className="required">*</span>
            </Col>
            <Col md={18} span={24}>
              <InputComponent
                name="fullName"
                control={control}
                errors={errors}
                placeholder="Your name"
                className="remove__border"
              />
            </Col>
            <Col md={6} span={24}>
              Role <span className="required">*</span>
            </Col>
            <Col md={18} span={24}>
              <SelectComponent
                name="role_user"
                control={control}
                errors={errors}
                placeholder="ROLE"
                className="remove__border"
                options={[
                  { value: "1", label: "Admin" },
                  { value: "2", label: "User" },
                  { value: "3", label: "Shipper" },
                ]}
              />
            </Col>
            <Col md={6} span={24}>
              Address
            </Col>
            <Col md={18} span={24}>
              <InputComponent
                name="address"
                control={control}
                errors={errors}
                placeholder="Address"
                className="remove__border"
              />
            </Col>
            <Col md={6} span={24}>
              Date of Birth
            </Col>
            <Col md={18} span={24}>
              <InputDateComponent
                name="dateOfBirth"
                control={control}
                errors={errors}
                disabledDate={disabledDate}
                placeholder="date Of Birth"
                className="remove__border"
              />
            </Col>
            <Col md={6} span={24}>
              Phone Number
            </Col>
            <Col md={18} span={24}>
              <InputComponent
                name="phoneNumber"
                control={control}
                errors={errors}
                placeholder="phoneNumber"
                className="remove__border"
              />
            </Col>
            <Col md={6} span={24}>
              Gender
            </Col>
            <Col md={18} span={24}>
              <SelectComponent
                name="sex"
                control={control}
                errors={errors}
                placeholder="sex"
                className="remove__border"
                options={[
                  { value: "1", label: "Male" },
                  { value: "2", label: "Female" },
                  { value: "3", label: "Other" },
                ]}
              />
            </Col>

            {!isEdit ? (
              <>
                <Col md={6} span={24}>
                  New Password <span className="required">*</span>
                </Col>
                <Col md={18} span={24}>
                  <InputComponent
                    name="password"
                    control={control}
                    errors={errors}
                    placeholder="Your name"
                    className="remove__border"
                    type={showPassword ? "text" : "password"}
                  />
                </Col>
                <Col md={6} span={24}>
                  Confirm New Password <span className="required">*</span>
                </Col>
                <Col md={18} span={24}>
                  <InputComponent
                    name="re_password"
                    control={control}
                    errors={errors}
                    placeholder="Your name"
                    className="remove__border"
                    type={showPassword ? "text" : "password"}
                  />
                </Col>
                <Col md={6} span={0}></Col>
                <Col md={18} span={24}>
                  <CheckboxComponent
                    name="show"
                    control={control}
                    errors={errors}
                    className="remove__border"
                    setValue={setValue}
                  >
                    Show password
                  </CheckboxComponent>
                </Col>
              </>
            ) : null}
          </Row>
          <div className="button__footer">
            <ButtonComponent
              label="Cancel"
              className="btn__tab"
              loading={loading}
              type="default"
              onClick={handleClose}
            />
            <ButtonComponent
              htmlType="submit"
              label="Save changes"
              className="btn__submit btn__tab"
              loading={loading}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ContentInfoChange;
