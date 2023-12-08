import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import StripeCheckout from 'react-stripe-checkout';


const CartItems = () => {
    const {
        cartItems,
        userDetails,
        addToCart,
        paymentPageHandler,
        totalPrice,
        removeCartItemHandler,
        getPaymentInfoHandlder,
        decrementToCart } = useContext(ShopContext)

    const onToken = (token) => {
        getPaymentInfoHandlder(token)
        paymentPageHandler()
    }

    const cartProduct = cartItems.sort((a, b) => b.quantity - a.quantity);


    return (
        <div className='cartitems'>
            <div className='cartitem-format-main' id='cartitems-invisiblty'>
                <p>Products</p>
                <p>Title</p>
                <p>Control</p>
            </div>
            <hr />
            {cartProduct && cartProduct.map((item) => {
                if (item) {
                    return (<div key={item.id}>
                        <div className='cartitems-format cartitem-format-main'>
                            <img src={item.image} className='carticon-product-icon' alt='icon' />
                            <div className='cartitem-content-left'>
                                <p>{item && item.name && item.name.slice(0, 20)}</p>
                                <div className='cartitem-control-button'>
                                    <i onClick={() => decrementToCart(item)} className="fa-solid fa-minus"></i>
                                    <button className='cartitems-quantity'>{item.quantity}</button>
                                    <i onClick={() => addToCart(item)} className="fa-solid fa-plus"></i>
                                    <i onClick={() => removeCartItemHandler(item)} className="fa-solid fa-trash"></i>
                                </div>
                            </div>
                            <div className='cartitems-content-right'>
                                <p className='init-price'><span className='speColor'>Price - </span>${item.new_price}</p>
                                <p> Total <span className='speColor'>Price - </span>${item.new_price * item.quantity}</p>
                            </div>
                        </div>
                        <hr />
                    </div>)
                }
                return null;
            })}
            <div className='cartitems-down'>
                <div className='cartitems-promocode'>
                    <p>If you have a promo code, Enter it here</p>
                    <div className='cartitems-promobox'>
                        <input type='text' placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
                <div className='cartitems-total'>
                    <h1>Cart <span className='speColor'>Totals</span></h1>
                    <div>
                        <div className='cartitems-total-item'>
                            <p>Subtotal</p>
                            <p>${totalPrice}</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <p>Delivery Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <h3>Total</h3>
                            <h3>$ {totalPrice}</h3>
                        </div>
                    </div>
                    <StripeCheckout
                        name={userDetails && userDetails.userName}
                        description={userDetails && userDetails.email}
                        image="https://www.compliancesigns.com/media/catalog/product/p/a/payment-policies-sign-nhe-17964_1000.gif"
                        ComponentClass="div"
                        currency="INR"
                        amount={totalPrice + "00"}
                        allowRememberMe
                        token={onToken}
                        shippingAddress
                        billingAddress={false}
                        stripeKey="pk_test_51OKItmSIeTa6z5FVc03TQk2ilyBGtK9EYPds8a3rq2SEFpQ0kRS7BwoL4BQn69OF86a2XkULaReKTlsE1PrLJwqq007edzU8ao"
                    >
                        <button>PROCEED TO CHECKOUT</button>
                    </StripeCheckout>

                </div>
            </div>
        </div >
    )
}

export default CartItems