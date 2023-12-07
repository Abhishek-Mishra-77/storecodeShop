import React from 'react';
import './Breadcrums.css';
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrums = (props) => {
    const { product } = props;
    return (
        <div className='breadcrum'>
            Home <img src={arrow_icon} alt='arrow' />
            SHOP <img src={arrow_icon} alt='arrow_icon' />
            {product.category} <img src={arrow_icon} alt='icon' />
            {product.name.slice(0, 10)}
        </div>
    )
}

export default Breadcrums