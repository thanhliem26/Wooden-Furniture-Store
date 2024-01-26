import React from "react";
import styled from "./index.module.scss";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import NavBarUser from "./navMobile.tsx";
import useResizeWindow from "@/hoc/useWindow.tsx";
import Logo from "@/assets/images/logo.png";

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
                <NavLink to="/introduce">
                  {({ isActive }) => (
                    <h5 className={isActive ? "active" : ""}>Giới thiệu</h5>
                  )}
                </NavLink>
              </div>
              <div className="wrapper__product">
                <NavLink to="/category/ban-ghe">
                  {({ isActive }) => (
                    <h5 className={isActive ? "active" : ""}>Bàn ghế</h5>
                  )}
                </NavLink>
              </div>
              <div className="wrapper__product">
                <NavLink to="/category/ban-ghe">
                  {({ isActive }) => (
                    <h5 className={isActive ? "active" : ""}>Bàn ghế SOFA</h5>
                  )}
                </NavLink>
              </div>
              <div className="wrapper__product">
                <NavLink to="/category/ke-tivi">
                  {({ isActive }) => (
                    <h5 className={isActive ? "active" : ""}>Kệ Tivi</h5>
                  )}
                </NavLink>
              </div>
              <div className="wrapper__product">
                <NavLink to="/news">
                  {({ isActive }) => (
                    <h5 className={isActive ? "active" : ""}>Tin tức</h5>
                  )}
                </NavLink>
              </div>
              <div className="wrapper__product">
                <NavLink to="/contact">
                  {({ isActive }) => (
                    <h5 className={isActive ? "active" : ""}>Liên hệ</h5>
                  )}
                </NavLink>
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
