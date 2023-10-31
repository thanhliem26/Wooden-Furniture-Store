import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

const InputComponent = ({
  name,
  control,
  errors,
  label = "",
  placeholder = "",
  className = "",
  icon,
  type = "text",
}: typeInputComponent) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item label={label} className={className}>
          <Input
            {...field}
            placeholder={placeholder}
            prefix={icon}
            type={type}
          />
          {errors?.[name] && (
            <div className="ant-form-item-explain-error">
              {errors?.[name]?.message}
            </div>
          )}
        </Form.Item>
      )}
    />
  );
};

export default InputComponent;
