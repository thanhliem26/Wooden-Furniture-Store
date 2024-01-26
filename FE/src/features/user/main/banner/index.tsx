import { Carousel } from "antd";
import React from "react";
import Images from "@/constants/images";

const Banner: React.FC = () => (
  <Carousel autoplay autoplaySpeed={3000} draggable>
    <div className="carousel__img" >
      <div className="img__content" style={{backgroundImage: `url(${Images.Banner1})`}}>
        <div className="img__content-text">
          <h2>Sofa Set with Lounger</h2>
          <p>Reveal Yourself <strong>THROUGH YOUR CHOICE</strong></p>
          <button>Mua ngay</button>
        </div>
      </div>
    </div>
    <div className="carousel__img" >
      <div className="img__content" style={{backgroundImage: `url(${Images.Banner2})`}}>
        {/* <img src={Images.Banner2} /> */}
      </div>
    </div>
  </Carousel>
);

export default Banner;
