import styled from "./index.module.scss";
import Banner from "./banner";
import Products from "./products";

const MainPage = () => {
  return (
    <>
      <div className={styled["main__page"]}>
        <div className="main__page-banner">
          <Banner />
        </div>
        <div className="main__page-product">
          <Products />
        </div>
      </div>
    </>
  );
};

export default MainPage;
