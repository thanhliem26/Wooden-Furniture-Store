import React, { useEffect, useState } from "react";
import styled from "./index.module.scss";
import ProductFilter from "./productFilter";
import { Col, Row } from "antd";
import ProductItem from "./productItem";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import { pushListProduct, searchProduct } from "@/store/manageProducts";
import productApi from "@/api/product";
import { NotificationError } from "@/utils/index";

const Products = () => {
  const [sliderPrice, setSliderPrice] = useState<[number, number]>([0, 0]);
  const [rangePrice, setRangePrice] = useState({ minPrice: 0, maxPrice: 0 });
  const [nameProduct, setNameProduct] = useState<string>("");
  const categorySelected = useAppSelector(
    (state: RootState) => state.manageCategory.categorySelected
  );

  const dispatch = useAppDispatch();

  const handleScrollPage = async (param = { pageSize: 10, current: 1 }) => {
    const optionQuery: any = {};

    if (categorySelected) {
      optionQuery.category_id = categorySelected.id;
    }

    if (sliderPrice[0] !== 0 && sliderPrice[1] !== 0) {
      optionQuery.minPrice = sliderPrice[0];
      optionQuery.maxPrice = sliderPrice[1];
    }

    optionQuery.name = nameProduct;
    optionQuery.limit = param.pageSize;
    optionQuery.page = param.current;

    try {
      const { metadata } = await productApi.searchProducts({...optionQuery});
      const { rows } = metadata;
      dispatch(pushListProduct(rows))
    } catch(error) {
      NotificationError(error)
    }
  };

  return (
    <div className={styled["product__main"]}>
      <div className="product__container">
        <div className="product__container-main">
          <div className="container__main-text">
            <span>
              <Link to="/">Trang chủ</Link>{" "}
            </span>{" "}
            <span> &gt; </span> <span> Cửa hàng</span>
          </div>
          <div className="container__main-title">Cửa hàng</div>
        </div>
        <Row gutter={[16, 16]} className="product__content">
          <Col span={24} md={6} className="product__content-filter">
            <ProductFilter
              sliderPrice={sliderPrice}
              setSliderPrice={setSliderPrice}
              rangePrice={rangePrice}
              setRangePrice={setRangePrice}
              nameProduct={nameProduct}
              setNameProduct={setNameProduct}
              categorySelected={categorySelected}
            />
          </Col>
          <Col span={24} md={18} className="product__content-item">
            <ProductItem handleScrollPage={handleScrollPage}/>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Products;
