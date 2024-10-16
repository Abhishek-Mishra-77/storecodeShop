import React, { useContext } from 'react';
import './Product.css'
import { ShopContext } from '../../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../../Component/Breadcrums/Breadcrums';
import ProductDisplay from '../../Component/ProductDisplay/ProductDisplay';
import DescriptionBox from '../../Component/DescriptionBox/DescriptionBox';
import RelatedProducts from '../../Component/RelatedProducts/RelatedProducts';
import LoginSignup from '../LoginSignup/LoginSignup';
import { toast } from 'react-toastify';

const Product = () => {
    const { all_product, userDetails } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((item) => item.id === Number(productId))

    if (!userDetails) {
        toast.warning("You are not logged in")
        return <LoginSignup />
    }

    return (
        <div>
            <Breadcrums product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
        </div>
    )
}

export default Product