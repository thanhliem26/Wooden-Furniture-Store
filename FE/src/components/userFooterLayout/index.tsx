import React from "react";
import styled from "./index.module.scss";
import { Col, Row } from "antd";
import Directional from "./directional";
import Advertisement from "./advertisement";
import AboutMe from "./aboutMe";

const UserFooterLayout = () => {
  return (
    <div className={styled["layout__footer"]}>
      <div className="layout__footer-main">
        <Row gutter={[16, 16]}>
          <Col sm={8} xs={24}>
            <Directional /> 
          </Col>
          <Col sm={8} xs={24} className="border__item">
            <Advertisement />
          </Col>
          <Col sm={8} xs={24}>
            <AboutMe /> 
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserFooterLayout;
