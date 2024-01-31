import { Controller } from "react-hook-form";
import { Form, Input, Select } from "antd";
import { SelectProps } from "antd";

interface typeInputSelectComponent extends SelectProps {
  name: string;
  control: any;
  errors?: any;
  label?: string;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
}

const SelectComponent = ({
  name,
  control,
  errors,
  label = "",
  placeholder = "",
  className = "",
  icon,
  ...props
}: typeInputSelectComponent) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item label={label} className={className}>
          <Select
            {...field}
            placeholder={placeholder}
            {...props}
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

export default SelectComponent;
