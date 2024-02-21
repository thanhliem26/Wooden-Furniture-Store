import { Col, Row, Tooltip } from "antd";
import Images from "@/constants/images";
import lodash from "lodash";
import { formatCurrency } from "@/utils/index";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import orderApi from "@/api/order";
import Notification from "@/components/notificationSend";
import orderDetailApi from "@/api/orderDetail";
import { statusCode } from "@/constants/index";
import { searchOrder } from "@/store/orderUser";
import { useEffect, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface ProductProps {
  dataProduct: topProductStatic;
}

const Products = ({ dataProduct }: ProductProps) => {
  const { category_name, data } = dataProduct;
  const orderId = useAppSelector((state: RootState) => state.order.id);
  const userId = useAppSelector((state: RootState) => state.user.id);

  const list_order = useAppSelector((state) => state.order.list_order);

  const productInOrder = useMemo(() => {
    return list_order.map((order) => {
      return order.productId;
    });
  }, [list_order]);

  const dispatch = useAppDispatch();

  const handleURL = (images) => {
    const imageList = images && JSON.parse(images);

    if (!imageList || (Array.isArray(imageList) && lodash.isEmpty(imageList))) {
      return {
        url: Images.DefaultProduct,
      };
    }

    const [imageFirst, ...otherImage] = imageList;
    if (Array.isArray(imageList) && imageFirst) {
      return imageFirst;
    }
  };

  const handleAddOrderDetail = async (product) => {
    try {
      let order_id = orderId;

      if (!order_id) {
        const { metadata } = await orderApi.createOrder({ user_id: userId });
        order_id = metadata.id;
      }

      const { status, message } = await orderDetailApi.createOrderDetail({
        order_id,
        productId: product.id,
        quantity: 1,
      });
      if (status === statusCode.CREATED || status === statusCode.UPDATED) {
        Notification({
          message: "Notification Success",
          description: message,
        });

        dispatch(
          searchOrder({ order_status: "pending", user_id: userId, limit: 1 })
        );
      }
    } catch (error) {
      Notification({
        type: "error",
        message: "Notification Error",
        description: error?.["response"]?.["data"]?.["message"],
      });
    }
  };

  //init aos 
  useEffect(() => {
    AOS.init({ duration: 1000,
      once: true
    });
    AOS.refresh();
  }, [])

  return (
    <div className="product__main">
      <div className="product__main-list">
        <div className="product__item-title">
          <span>{category_name}</span>
        </div>
        <Row gutter={[30, 30]}>
          {!lodash.isEmpty(data) ? (
            data.map((product, index) => {
              const image = handleURL(product.images);
              return (
                <Col sm={6} xs={12} key={index} data-aos="fade-left"  data-aos-delay={(index * 100).toString()}>
                  <div className="product_item-content">
                    <div className="item__content-image">
                      <img src={image.url} alt={product.description} />

                      <div className="shopping_card">
                        {productInOrder.includes(product.id) ? (
                          <div className="shopping__card-exists">
                            Xem giỏ hàng →
                          </div>
                        ) : (
                          <Tooltip placement="top" title="Thêm vào giỏ">
                            <strong onClick={() => handleAddOrderDetail(product)} className="icon__shopping">
                              +
                            </strong>
        
                          </Tooltip>
                        )}
                      </div>
                    </div>
                    <div className="item__content-price">
                      <p className="item__type">{category_name}</p>
                      <p className="item_name">
                        <a>{product.name}</a>
                      </p>
                      <p className="item_price">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <Col sm={6} xs={12}>
              <div className="product_item-content">
                <div className="item__content-image">
                  <img src={Images.StoreEmpty} alt="store empty" />
                </div>
                <div className="item__content-price">
                  <p className="item__type">empty product</p>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Products;
