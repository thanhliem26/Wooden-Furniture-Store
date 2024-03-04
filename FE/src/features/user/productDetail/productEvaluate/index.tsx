import { Tabs } from "antd";
import styled from './index.module.scss';
import Description from "./description";
import Comment from './comments'
import { CommentOutlined, SmileOutlined, StarOutlined } from "@ant-design/icons";

interface Props {
  product: ProductState | null;
}

const ProductEvaluate= ({product}: Props) => {
  const items = [
    {
      key: "1",
      label: <span><SmileOutlined />Tổng quan </span>,
      children: <Description product={product}/>,
    },
    {
      key: "2",
      label: <span><CommentOutlined />Comments</span>,
      children: <Comment />,
    },
  ];

  return (
    <div className={styled['main__evaluate']}>
      <Tabs defaultActiveKey="2" items={items} />
    </div>
  );
};

export default ProductEvaluate;
