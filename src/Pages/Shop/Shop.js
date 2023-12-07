import React, { useContext } from 'react';
import Hero from '../../Component/Hero/Hero';
import Popular from '../../Component/Popular/Popular';
import Offers from '../../Component/Offers/Offers';
import NewCollections from '../../Component/NewCollections/NewCollections';
import NewLetter from '../../Component/NewLetter/NewLetter';
import Testimonials from '../../Component/Testimonials/Testimonials';
import Search from '../../Component/Search/Search';
import { ShopContext } from '../../Context/ShopContext';


const Shop = () => {

    const { searchToggle } = useContext(ShopContext)

    return (
        <div>
            <Hero />
            <Popular />
            <Offers />
            <NewCollections />
            <Testimonials />
            <NewLetter />
            {searchToggle && <Search />}
        </div>
    )
}

export default Shop