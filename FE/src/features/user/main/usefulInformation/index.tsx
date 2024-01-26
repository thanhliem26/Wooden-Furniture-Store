import { Carousel, Slider } from "antd";
import React, { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Images from "@/constants/images";

const UseFulInformation = () => {
  const SlickButton = ({ currentSlide, slideCount, children, ...props }) => {
    return <span {...props}>{children}</span>
  };

  const setting = {
    draggable: true,
    slidesToShow: 3,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 3,
    arrows: true,
    initialSlide: 0,
    nextArrow: (
      <SlickButton currentSlide slideCount>
        <RightOutlined className="prev_icon" />
      </SlickButton>
    ),
    prevArrow:
    <SlickButton currentSlide slideCount>
        <LeftOutlined className="next_icon" />
      </SlickButton>,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="main_useful">
      <div className="main__useful-title">
        <span>Thông tin hữu ích</span>
      </div>

      <Carousel {...setting}>
        <div className="useful__content">
          <div className="useful__content-image">
            <img src={Images.UI1} alt="" />
            <div className="useful__content-day">
              <span className="sp1">08</span>
              <br />
              <span className="sp2">Th3</span>
            </div>
          </div>
          <div className="useful__content-description">
            <h5>Duis luctus elit nisi, et cursus magna pellentesque non.</h5>
            <div className="is_divider"></div>
            <p className="text__overflow-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dapibus, massa non viverra
            </p>
            <button>Đọc thêm</button>
          </div>
        </div>

        <div className="useful__content">
          <div className="useful__content-image">
            <img src={Images.UI2} alt="" />
            <div className="useful__content-day">
              <span className="sp1">08</span>
              <br />
              <span className="sp2">Th3</span>
            </div>
          </div>
          <div className="useful__content-description">
            <h5>
              Mauris tristique pretium tempus. Vestibulum et accumsan magna.
            </h5>
            <div className="is_divider"></div>
            <p className="text__overflow-2">
              Donec tempus eu ligula sed blandit. Vivamus vel enim ac quam
              iaculis rutrum.
            </p>
            <button>Đọc thêm</button>
          </div>
        </div>

        <div className="useful__content">
          <div className="useful__content-image">
            <img src={Images.UI3} alt="" />
            <div className="useful__content-day">
              <span className="sp1">08</span>
              <br />
              <span className="sp2">Th3</span>
            </div>
          </div>
          <div className="useful__content-description">
            <h5>
              Aliquam placerat nisl nec imperdiet vehicula. Phasellus tempus
              ligula id orci finibus feugiat.
            </h5>
            <div className="is_divider"></div>
            <p className="text__overflow-2">
              n rutrum tempus purus, ut euismod dui facilisis ac. Fusce semper
              dignissim diam
            </p>
            <button>Đọc thêm</button>
          </div>
        </div>
        <div className="useful__content">
          <div className="useful__content-image">
            <img src={Images.UI4} alt="" />
            <div className="useful__content-day">
              <span className="sp1">08</span>
              <br />
              <span className="sp2">Th3</span>
            </div>
          </div>
          <div className="useful__content-description">
            <h5>Duis luctus elit nisi, et cursus magna pellentesque non.</h5>
            <div className="is_divider"></div>
            <p className="text__overflow-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dapibus, massa non viverra
            </p>
            <button>Đọc thêm</button>
          </div>
        </div>
        <div className="useful__content">
          <div className="useful__content-image">
            <img src={Images.UI5} alt="" />
            <div className="useful__content-day">
              <span className="sp1">08</span>
              <br />
              <span className="sp2">Th3</span>
            </div>
          </div>
          <div className="useful__content-description">
            <h5>Duis luctus elit nisi, et cursus magna pellentesque non.</h5>
            <div className="is_divider"></div>
            <p className="text__overflow-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dapibus, massa non viverra
            </p>
            <button>Đọc thêm</button>
          </div>
        </div>
        <div className="useful__content">
          <div className="useful__content-image">
            <img src={Images.UI6} alt="" />
            <div className="useful__content-day">
              <span className="sp1">08</span>
              <br />
              <span className="sp2">Th3</span>
            </div>
          </div>
          <div className="useful__content-description">
            <h5>Duis luctus elit nisi, et cursus magna pellentesque non.</h5>
            <div className="is_divider"></div>
            <p className="text__overflow-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dapibus, massa non viverra
            </p>
            <button>Đọc thêm</button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default UseFulInformation;
