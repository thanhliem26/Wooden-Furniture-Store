import productApi from "@/api/product";
import { NotificationError } from "@/utils/index";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "./index.module.scss";
import ProductContent from "./productContent";
import ProductSame from "./productSame";
import ProductEvaluate from "./productEvaluate";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductState | null>(null);

  const handleGetProduct = async (id) => {
    try {
      const { metadata } = await productApi.getProductById(id);
      setProduct(metadata);
    } catch (error) {
      NotificationError(error);
    }
  };

  useEffect(() => {
    handleGetProduct(id);
  }, [id]);

  return (
    <div className={styled["product__detail"]}>
      <div className="product__detail-container">
        <div className="product__detail-title">
          <Link to="/">Trang chủ / </Link>{" "}
          <Link to="/product/">Sản Phẩm / </Link>
          {product?.name}
        </div>
        <div className="product__detail-content">
          <ProductContent product={product}/>
        </div>
        <div className="product__detail-evaluate">
          <ProductEvaluate product={product}/>
        </div>
        <div className="product__detail-same">
            <ProductSame product={product}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
