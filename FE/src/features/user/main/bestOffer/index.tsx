import { Col, Row } from "antd";

import Images from "@/constants/images";

const BestOffer = () => {
  return (
    <Row gutter={[20, 40]} className="bestOffer__images">
      <Col sm={12} xs={24}>
        <div className="bestOffer__image">
            <img src={Images.BOF1} alt="" />
        </div>
      </Col>
      <Col sm={12} xs={24}>
        <div className="bestOffer__image">
            <img src={Images.BOF2} alt="" />
        </div>
      </Col>
    </Row>
  );
};

export default BestOffer;
