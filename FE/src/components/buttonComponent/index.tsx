import { Button, Form } from "antd";
import { typeButtonComponent } from './constant';

const ButtonComponent = ({
  wrapperCol = { offset: 8, span: 16 },
  type = "primary",
  htmlType = "button",
  label,
  className = '',
  loading = false,
}: typeButtonComponent) => {
  return (
    <Form.Item wrapperCol={wrapperCol} className={className}>
      <Button type={type} htmlType={htmlType} loading={loading}>
        {label}
      </Button>
    </Form.Item>
  );
};

export default ButtonComponent;
