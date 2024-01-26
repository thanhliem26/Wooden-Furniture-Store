import React from "react";
import styled from "./index.module.scss";
import {
  CloseOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

interface Props {
  setOpenMenu: (value) => void;
}

const NavMobile = ({setOpenMenu}: Props) => {
  return (
    <div className={styled["nav__user-mobile"]}>
      <div className="user__background" onClick={() => setOpenMenu((prev: boolean) => !prev)}></div>
      <div className="user__mobile">
        <div className="user__mobile-nav">
          <div className="mobile__nav-search">
            <div className="util__search-input">
              <input type="text" placeholder="Tìm kiếm..." />
              <SearchOutlined />
            </div>
          </div>
          <div className="mobile__nav-menu">
            <div className="nav__menu-item">GIỚI THIỆU</div>
            <div className="nav__menu-item">BÀN GHẾ</div>
            <div className="nav__menu-item">BÀN GHẾ SOPHA</div>
            <div className="nav__menu-item">KỆ TIVI</div>
            <div className="nav__menu-item">TIN TỨC</div>
            <div className="nav__menu-item">LIÊN HỆ</div>
            <div className="nav__menu-item">ĐĂNG NHẬP</div>
            <div className="nav__menu-item">
              GIỎ HÀNG <ShoppingCartOutlined />
            </div>
            <div className="nav__menu-item">FACEBOOK</div>
          </div>
        </div>
      </div>
      <div className="remove__background" onClick={() => setOpenMenu((prev: boolean) => !prev)}>
        <CloseOutlined />
      </div>
    </div>
  );
};

export default NavMobile;
