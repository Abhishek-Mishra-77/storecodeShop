import React, { useContext } from 'react';
import './Hero.css'
import img_main1 from '../Assets/asset2.jpeg';
import { ShopContext } from '../../Context/ShopContext';


const Hero = () => {

    const { searchProductHandler } = useContext(ShopContext);
    const onSearchProductHanler = (e) => {
        e.preventDefault();
        searchProductHandler()
    }

    return (
        <header>
            <div className="header-section">
                <div className="header-left">
                    <div className="search-form-section">
                        <span className="search-form-title">Shop with StoreCode</span>
                        <form className="search" onSubmit={onSearchProductHanler}>
                            <div className="search-form-input">
                                <input disabled type="text" className="search-input" placeholder="Enter Product Code" />
                            </div>
                            <div className="search-form-button">
                                <button>SEARCH</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="header-right">
                    <img src={img_main1} alt='mainImg' />
                </div>
            </div>
        </header>
    )
}

export default Hero