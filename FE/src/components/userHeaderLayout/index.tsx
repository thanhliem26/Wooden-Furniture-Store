import { useEffect, useState } from "react";
import styled from "./index.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import NavBarUser from "./navMobile.tsx";
import useResizeWindow from "@/hoc/useWindow.tsx";
import Logo from "@/assets/images/logo.png";
import UtilUser from "./utilUser";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index.ts";
import { searchOrder } from "@/store/orderUser/index.ts";

const UserLayoutHeader = () => {
  const resize = useResizeWindow();
  const [headerFixed, setHeaderFixed] = useState<boolean>(false);

  const idUser = useAppSelector((state: RootState) => state.user.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (idUser) {
      dispatch(
        searchOrder({ order_status: "pending", user_id: idUser, limit: 1 })
      );
    }
  }, [idUser]);

  const handleScroll = (event) => {
    const heightViewPort = window.scrollY;

    if (heightViewPort > 900) {
      setHeaderFixed(true);
    }

    if(heightViewPort < 50) {
      setHeaderFixed(false);
    }
  
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const propertyHeader = {
    'className': headerFixed ? `${styled["header_page"]} ${styled["add__fixed"]} ${styled['stuckModeDown']}` : styled["header_page"]
  };

  return (
    <article>
      <header
        {...propertyHeader}
      >
        <div className={headerFixed ? 'header__wrapper stuck stuckModeDown' : 'header__wrapper'}>
          <div className="header_wrapper-util">
            <div className="container header_wrapper-util-container">
              <div className="util__search">
                <div className="util__search-input">
                  {resize.width >= 850 ? (
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
              <UtilUser />
            </div>
          </div>
          {resize.width >= 850 ? (
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
