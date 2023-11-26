import React from "react";
import styled from './index.module.scss';
import Banner from "./banner";

const MainPage = () => {
  return (
    <>
      <div className={styled['main__page']}>
        <div className="main__page-banner">
          <Banner />
        </div>
      </div>
    </>
  );
};

export default MainPage;
