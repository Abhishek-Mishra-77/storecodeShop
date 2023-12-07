import React, { useContext, useState } from 'react';
import './Search.css';
import { ShopContext } from '../../Context/ShopContext';
import all_product from '../Assets/all_product';
import { Link } from 'react-router-dom';


const Search = () => {
    const [searchProduct, setSearchProduct] = useState('');
    const { searchProductHandler } = useContext(ShopContext);
    let products = []

    products = all_product.filter((item) => item.name.toLocaleLowerCase().includes(searchProduct.toLocaleLowerCase()));

    return (
        <div className='search-modal' >
            <div className='form-field'>
                <input
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    type='text'
                    autoFocus
                    placeholder='Search for products' />
                <i onClick={() => searchProductHandler()} className="fa-solid fa-x"></i>
            </div>
            <div className='search-result-content'>
                <div className='search-results'>
                    {products.length === 0 && <p className='no-result'>No Results found❗</p>}
                    {products.map((item) =>
                        <Link to={`/product/${item.id}`} key={item.id} className='search-result-item'>
                            <div className='img-container'>
                                <img src={item.image} alt='img-pro'/>
                            </div>
                            <div className='prod-details'>
                                <span className='name'>{item.name.slice(0, 20)}</span>
                                <span className='desc'>{item.name}</span>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Search