import React from "react";
import styled from "./index.module.scss";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import NavBarUser from "./navMobile.tsx";
import useResizeWindow from "@/hoc/useWindow.tsx";
import Logo from '@/assets/images/logo.png';

const UserLayoutHeader = () => {
  const reasize = useResizeWindow();

  return (
    <article>
      <header className={styled["header_page"]}>
        <div className="header__wrapper">
          <div className="header_wrapper-util">
            <div className="container header_wrapper-util-container">
              <div className="util__search">
                <div className="util__search-input">
                  {reasize.width >= 850 ? (
                    <>
                      <input type="text" placeholder="Tìm kiếm..." />
                      <SearchOutlined />
                    </>
                  ) : (
                    <NavBarUser />
                  )}
                </div>
              </div>
              <div className="util__logo">
                <Link to="/">
                  <img
                    width="200"
                    height="100"
                    src={Logo}
                    alt="noithatbanghe"
                  />
                </Link>
              </div>
              <div className="util__user">
                {reasize.width >= 850 ? (
                  <>
                    <div className="util_user-singIn">
                      <span>Đăng nhập</span>
                    </div>
                    <div className="border__space"></div>
                    <div className="util_user-shoppingCart">
                      <span>
                        Giỏ hàng <ShoppingCartOutlined />
                      </span>
                    </div>
                  </>
                ) : (
                  <ShoppingCartOutlined />
                )}
              </div>
            </div>
          </div>
          {reasize.width >= 850 ? (
            <div className="header_wrapper-products">
              <div className="wrapper__product">
                <span>Giới thiệu</span>
              </div>
              <div className="wrapper__product">
                <span>Bàn ghế</span>
              </div>
              <div className="wrapper__product">
                <span>Bàn ghế SOFA</span>
              </div>
              <div className="wrapper__product">
                <span>Kệ Tivi</span>
              </div>
              <div className="wrapper__product">
                <span>Tin tức</span>
              </div>
              <div className="wrapper__product">
                <span>Liên hệ</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </header>
    </article>
  );
};

export default UserLayoutHeader;
