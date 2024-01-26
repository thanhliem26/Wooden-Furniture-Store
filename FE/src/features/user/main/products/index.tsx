import { Carousel, Col, Row } from "antd";
import React from "react";
import Images from "@/constants/images";
import { ShoppingCartOutlined } from "@ant-design/icons";

interface dataProduct {
    image: string,
    category: string,
    name: string,
    price: string,
    description?: string
}

interface ProductProps {
  category: string;
  dataProduct: dataProduct[]
}

const Products = ({ category, dataProduct }: ProductProps) => {
  return (
    <div className="product__main">
      <div className="product__main-list">
        <div className="product__item-title">
          <span>{category}</span>
        </div>
        <Row gutter={[30, 30]}>
            {dataProduct.map((product, index) => {
                return (
                    <Col sm={6} xs={12} key={index}>
                    <div className="product_item-content">
                      <div className="item__content-image">
                        <img src={product.image} alt={product.description} />
                        <ShoppingCartOutlined className="shopping_card" />
                      </div>
                      <div className="item__content-price">
                        <p className="item__type">{product.category}</p>
                        <p className="item_name">
                          <a>{product.name}</a>
                        </p>
                        <p className="item_price">{product.price}</p>
                      </div>
                    </div>
                    </Col>
                )
            })}
        </Row>
      </div>
    </div>
  );
};

export default Products;
