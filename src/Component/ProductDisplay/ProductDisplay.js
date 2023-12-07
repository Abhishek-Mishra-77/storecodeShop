import React, { useContext } from 'react';
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';



const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    return (
        <div className='productdisplay container'>
            <div className='productdisplay-left'>
                <div className='productdisplayp-img-list'>
                    <img src={product.image} alt='proImage' />
                    <img src={product.image} alt='proImage' />
                    <img src={product.image} alt='proImage' />
                </div>
                <div className='productdisplay-img'>
                    <img className='productdisplay-main-img' src={product.image} alt='proImage' />
                </div>
            </div>
            <div className='productdisplay-right'>
                <h1>{product.name.slice(0, 20)}</h1>
                <div className='productdisplay-right-stars'>
                    <img src={star_icon} alt='star' />
                    <img src={star_icon} alt='star' />
                    <img src={star_icon} alt='star' />
                    <img src={star_icon} alt='star' />
                    <img src={star_dull_icon} alt='star' />
                    <p>(122)</p>
                </div>
                <div className='productdisplay-right-prices'>
                    <div className='productdisplay-right-price-old'>${product.old_price}</div>
                    <div className='productdisplay-right-price-new'>${product.new_price}</div>
                </div>
                <div className='productdisplay-right-description'>
                    A lighweight , usually knitted , pullover shirt, close-fitting and
                </div>
                <div className='productdisplay-right-size'>
                    <h1>Select Size</h1>
                    <div className='productdisplay-right-sizes'>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => { addToCart(product) }}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category : </span>Women , T-Shirt , Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags : </span>Modern , Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay;