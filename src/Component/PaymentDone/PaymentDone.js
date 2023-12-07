import React from 'react';
import './PaymentDone.css';
import { useNavigate } from 'react-router-dom';

const PaymentDone = () => {

    const navigate = useNavigate();
    const moveToShopHandler = () => {
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
                        <p>Amount Paid</p>
                        <p>Transaction id</p>
                    </div>
                    <div className='payment-info-right'>
                        <p>ATM Card</p>
                        <p>Abhishek</p>
                        <p>1212154574</p>
                        <p>abhishek@gmail.com</p>
                        <p>500.00</p>
                        <p>124515875457</p>
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