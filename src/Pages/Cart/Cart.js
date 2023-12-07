import React, { useContext } from 'react';
import './Cart.css';
import CartItems from '../../Component/CartItems/CartItems';
import PaymentDone from '../../Component/PaymentDone/PaymentDone';
import { ShopContext } from '../../Context/ShopContext';

const Cart = () => {
    const { paymentDone } = useContext(ShopContext)
    return (
        <div className='cart container'>
            <CartItems />
            {paymentDone && <PaymentDone />}
        </div>
    )
}

export default Cart