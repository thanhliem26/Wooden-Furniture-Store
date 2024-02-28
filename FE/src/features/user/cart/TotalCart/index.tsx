import React from 'react'

const TotalCart = () => {
  return (
    <div className='total__cart'>
        <div className="total__cart-title">
            Cộng giỏ hàng
        </div>
        <div className="total__cart-list">
            <div className="total__cart-item">
                <div className="cart__item-text">
                    Tạm tính
                </div>
                <div className="cart__item-price">
                    382,200 ₫
                </div>
            </div>
            <div className="total__cart-item">
                <div className="cart__item-text">
                    Tổng
                </div>
                <div className="cart__item-price">
                    382,200 ₫
                </div>
            </div>
        </div>
        <div className="total__cart-btn">
            Tiến hành thanh toán
        </div>
        </div>
  )
}

export default TotalCart