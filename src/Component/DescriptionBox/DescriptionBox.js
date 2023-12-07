import React from 'react';
import './DescriptionBox.css'
const DescriptionBox = () => {
    return (
        <div className='descriptionbox container'>
            <div className='descriptionbox-navigator'>
                <div className='descriptionbox-nav-box'>Description</div>
                <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
            </div>
            <div className='descriptionbox-description'>
                <p>An e-commerce website serves as a virtual marketplace where buyers and sellers engage in online transactions, revolutionizing the way we shop. These platforms offer a wide array of products and services, ranging from consumer goods to digital downloads. The user-friendly interface of an e-commerce site enhances the shopping experience, allowing customers to easily browse, compare, and purchase products from the comfort of their homes.
                </p>
                <p>
                    With secure payment gateways and advanced encryption, these websites ensure the confidentiality of financial transactions, fostering trust among users. Additionally, e-commerce platforms often employ sophisticated recommendation algorithms, providing personalized product suggestions based on user behavior and preferences.
                </p>
            </div>
        </div>
    )
}

export default DescriptionBox