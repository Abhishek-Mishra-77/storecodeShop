import React, { useContext } from 'react';
import './PaymentDone.css';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const PaymentDone = () => {

    const { paymentInfo, paymentPageHandler } = useContext(ShopContext);

    const navigate = useNavigate();
    const moveToShopHandler = () => {
        paymentPageHandler()
        navigate('/')
    }


    return (
        <div className='payment-page'>
            <div className='payment-inner'>
                <div className='payment-left'>
                    <h1>✅</h1>
                    <h2>Payment succesful</h2>
                </div>
                <div className='payment-middle'>
                    <div className='payment-info-left'>
                        <p>Payment type</p>
                        <p>userName</p>
                        <p>UPIA</p>
                        <p>Email</p>
                        <p>Address</p>
                        <p>Amount Paid</p>
                        <p>Transaction id</p>
                    </div>
                    <div className='payment-info-right'>
                        <p>ATM Card</p>
                        <p>{paymentInfo.name}</p>
                        <p>{paymentInfo.created}</p>
                        <p>{paymentInfo.email}</p>
                        <p>{paymentInfo.address}</p>
                        <p>{paymentInfo.AmountPaid}</p>
                        <p>{paymentInfo.id}</p>
                    </div>
                </div>
                <div className='payment-bottom'>
                    <button>PRINT</button>
                    <button onClick={moveToShopHandler}>CLOSE</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentDone