import styled from "./index.module.scss";
import Images from "@/constants/images";

import Banner from "./banner";
import Products from "./products";
import Benefit from "./benefit";
import BestOffer from "./bestOffer";
import UseFulInformation from "./usefulInformation";

const MainPage = () => {

  const dataProduct1 = [
    {
      image: Images.Sofa1,
      category: "Bàn ghế SOFA",
      name: "Ghế sofa SF108",
      price: "13,574,400 ₫"
    },
    {
      image: Images.Sofa2,
      category: "Bàn ghế SOFA",
      name: "Ghế sofa SF32",
      price: "15,240,000 ₫"
    },
    {
      image: Images.Sofa3,
      category: "Bàn ghế SOFA",
      name: "Ghế sofa SF33",
      price: "16,752,000 ₫"
    },
    {
      image: Images.Sofa4,
      category: "Bàn ghế SOFA",
      name: "Ghế sofa SF80",
      price: "14,250,000 ₫"
    },
    {
      image: Images.Sofa5,
      category: "Bàn ghế SOFA",
      name: "Ghế sofa SF31",
      price: "1,528,000 ₫"
    },
    {
      image: Images.Sofa6,
      category: "Bàn ghế SOFA",
      name: "Ghế sofa SF23",
      price: "16,587,000 ₫"
    },
    {
      image: Images.Sofa7,
      category: "Bàn ghế SOFA",
      name: "Ghế sofa SF02",
      price: "15,968,000 ₫"
    },
    {
      image: Images.Sofa8,
      category: "Bàn ghế SOFA",
      name: "Ghế sofa SF01",
      price: "20,896,000 ₫"
    },
  ]

  const dataProduct2 = [
    {
      image: Images.KTV1,
      category: "KỆ TIVI",
      name: "Kệ tivi phòng khách KTV96",
      price: "4,759,000 ₫"
    },
    {
      image: Images.KTV2,
      category: "KỆ TIVI",
      name: "Kệ tivi gỗ tự nhiên KTV91",
      price: "5,050,000 ₫"
    },
    {
      image: Images.KTV3,
      category: "KỆ TIVI",
      name: "Kệ tivi cao cấp",
      price: "4,550,000 ₫"
    },
    {
      image: Images.KTV4,
      category: "KỆ TIVI",
      name: "Kệ Tivi Gỗ Xoan Đào",
      price: "5,624,000 ₫"
    },
    {
      image: Images.KTV5,
      category: "KỆ TIVI",
      name: "Kệ Tivi Gỗ Đinh Hương",
      price: "8,952,300 ₫"
    },
    {
      image: Images.KTV6,
      category: "KỆ TIVI",
      name: "Kệ Tivi Gỗ Cẩm",
      price: "7,569,000 ₫"
    },
  ]

  const dataProduct3 = [
    {
      image: Images.Banghe1,
      category: "Bàn ăn",
      name: "Bộ bàn ghế ăn gỗ Sồi 6 ghế mẫu 2 tầng 1m6 – BAS215",
      price: "7,568,000 ₫"
    },
    {
      image: Images.Banghe2,
      category: "Bàn ăn",
      name: "Bộ bàn ghế ăn tròn xoay gỗ Xoan Đào 6 ghế chân cao 1m2 – BAX208",
      price: "8,672,000 ₫"
    },
    {
      image: Images.Banghe3,
      category: "Bàn ăn",
      name: "Bộ bàn ghế ăn gỗ Xoan Đào 6 ghế",
      price: "6,923,800 ₫"
    },
    {
      image: Images.Banghe4,
      category: "Bàn ăn",
      name: "Bộ bàn ghế ăn gỗ Sồi Nga",
      price: "7,856,900 ₫"
    },
    {
      image: Images.Banghe5,
      category: "Bàn ăn",
      name: "Bộ bàn ghế ăn gỗ Sồi 6 ghế vát góc bọc",
      price: "7,459,000 ₫"
    },
    {
      image: Images.Banghe6,
      category: "Bàn ăn",
      name: "Bộ bàn ghế ăn gỗ Sồi",
      price: "6,582,000 ₫"
    },
    {
      image: Images.Banghe7,
      category: "Bàn ăn",
      name: "Bộ bàn ghế ăn gỗ Cao Su",
      price: "5,471,000 ₫"
    },
    {
      image: Images.Banghe8,
      category: "Bàn ăn",
      name: "Bộ bàn ghế ăn gỗ Sồi 6 ghế phun màu mẫu Oval 1m6 – BAS531",
      price: "8,642,200 ₫"
    },
  ]

  return (
    <>
      <div className={styled["main__page"]}>
        <div className="main__page-banner">
          <Banner />
        </div>
        <div className="main__page-product">
          <Products category="Bàn ghế sofa" dataProduct={dataProduct1}/>
        </div>
        <div className="main__page-benefit">
          <Benefit />
        </div>
        <div className="main__page-product">
          <Products category="Ke TV" dataProduct={dataProduct2}/>
        </div>
        <div className="main__page-bestOffer">
          <BestOffer />
        </div>
        <div className="main__page-product">
          <Products category="Bàn ghế" dataProduct={dataProduct3}/>
        </div>
        <div className="main__useful-information">
          <UseFulInformation />
        </div>
      </div>
    </>
  );
};

export default MainPage;
