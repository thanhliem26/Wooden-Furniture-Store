import React from "react";
import styled from "./index.module.scss";
import Image from "@/constants/images";
import { Col, Row } from "antd";

const Introduce = () => {
  return (
    <div className={styled["introduce__main"]}>
      <div className="introduce__main-title">
        <h1>Đồ Gỗ Thành Lành</h1>
        <div className="divider"></div>
      </div>
      <div className="introduce__main-banner">
        <div className="main__banner-image fill"></div>
      </div>
      <div className="introduce__main-contact">
        <Row>
          <Col sm={8} xs={24}>
            <div className="main__contact-item">
              <div className="contact__item-icon">
                <div className="item__icon">
                  <img src={Image.Agenda} alt="agenda" />
                </div>
                <div className="item__name">
                  <h3>Thành Lành Shop</h3>
                </div>
              </div>
              <div className="contact__item-content">
                <p>
                  Đồ gỗ Thành Lành - Xóm 31 <br />
                  Hải Minh - Hải Hậu - Nam Định
                </p>
              </div>
              <div className="contact__item-btn">
                <a
                  href="https://maps.app.goo.gl/TenU5dxPa6bf6HVT7"
                  target="blank"
                >
                  CLICK ME!
                </a>
              </div>
            </div>
          </Col>
          <Col sm={8} xs={24}>
            <div className="main__contact-item">
              <div className="contact__item-icon">
                <div className="item__icon">
                  <img src={Image.SmartPhone} alt="smartphone" />
                </div>
                <div className="item__name">
                  <h3>Điện Thoại</h3>
                </div>
              </div>
              <div className="contact__item-content">
                <p>0866759002</p>
              </div>
              <div className="contact__item-btn">
                <a href="tel:0866759002">CLICK ME!</a>
              </div>
            </div>
          </Col>
          <Col sm={8} xs={24}>
            <div className="main__contact-item">
              <div className="contact__item-icon">
                <div className="item__icon">
                  <img src={Image.Agenda} alt="agenda" />
                </div>
                <div className="item__name">
                  <h3>Email</h3>
                </div>
              </div>
              <div className="contact__item-content">
                <p>phamvanliem26122002@gmail.com</p>
              </div>
              <div className="contact__item-btn">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=phamvanliem26122002@gmail.com"
                  target="_blank"
                >
                  CLICK ME!
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Introduce;
