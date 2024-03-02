import React, { useState } from "react";
import styled from "./index.module.scss";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import TableCart from "./tableCart";
import { useAppSelector } from "@/store/index";
import TotalCart from "./TotalCart";

const CartOrder = () => {
  const [dataOrder, setDataOrder] = useState<OrderDetailState[]>([]);

  return (
    <div className={styled["cart__main"]}>
      <div className="cart__main-title cart__order">
        <div className="main__title-link">
          <Link to="/">Trang chủ</Link>
          <span>&gt;</span>Giỏ hàng
        </div>
        <div className="main__title-text">Giỏ Hàng</div>
      </div>
      <div className="cart__main-content  cart__order">
        <Row gutter={[16, 16]}>
          <Col span={16} className="main__content-update">
            <TableCart dataOrder={dataOrder} setDataOrder={setDataOrder} />
          </Col>
          <Col span={8} className="main__content-information">
            <TotalCart dataOrder={dataOrder}/>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartOrder;
