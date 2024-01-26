import React, { useEffect, useRef } from "react";
import Images from "@/constants/images";
import { Col, Row } from "antd";

const Benefit = () => {
  const imageRef = useRef(null);

  const BenefitList = [
    {
      image: Images.CarSide,
      title: "Miễn phí giao hàng",
    },
    {
      image: Images.Gift,
      title: "Quà tặng đặc biệt",
    },
    {
      image: Images.Pig,
      title: "Tiết kiệm khi mua ở đây",
    },
  ];

  return (
    <>
      <div
        className="benefit__main"
        style={{ backgroundImage: `url(${Images.Benefit1})` }}
      >
        <div className="benefit__overlay"></div>
      </div>
      <div className="benefit__main-list">
        <Row gutter={[16, 16]} className="benefit__items">
          {BenefitList.map((benefit, index) => {
            return (
              <Col sm={8} xs={24} key={index}>
                <div className="benefit__item">
                  <div className="benefit__item-icon">
                    <img src={benefit.image} alt="" />
                  </div>
                  <div className="benefit__item-content">
                    <h3>{benefit.title}</h3>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default Benefit;
