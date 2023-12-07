import React from 'react';
import './NewLetter.css';

const NewLetter = () => {
    return (
        <div className='newletter'>
            <h1>Get Exclusive offers On Your Email</h1>
            <div className='inner-newletter'>

                <p>Subscribe to our newletter and stay updated</p>
                <div>
                    <input type='email' placeholder='Your Email id' />
                    <button>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default NewLetter