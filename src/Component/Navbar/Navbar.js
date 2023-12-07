import React, { useState, useContext, useEffect, Fragment } from 'react';
import './Navbar.css'
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import main_logo from '../Assets/main-logo.png'
import HashLoader from "react-spinners/HashLoader";

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userDetails, userLogoutHandler, totalCartItems } = useContext(ShopContext);

    const toggleHandler = () => {
        setToggle((toggle) => !toggle);
    }


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])



    const onLogoutHandler = () => {
        userLogoutHandler();
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }



    return (
        <Fragment>
            <div className='navbar'>
                {loading ? <HashLoader
                    color={"#36d7b7"}
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> : <>
                    <Link to='/'>
                        <div className='nav-logo'>
                            <img src={main_logo} alt='logo' />
                            <p>STORE<span className='speColor'>CODE</span></p>
                        </div>
                    </Link>
                    <ul className='nav-menu' id='navbar' style={{ right: toggle ? '0' : '' }}>
                        <li onClick={() => setMenu("shop")}><Link to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
                        <li onClick={() => setMenu("men")}><Link to='/mens' >Men</Link> {menu === "men" ? <hr /> : <></>}</li>
                        <li onClick={() => setMenu("women")}><Link to='/womens' >Women</Link>{menu === "women" ? <hr /> : <></>}</li>
                        <li onClick={() => setMenu("kids")}><Link to='/kids' >Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
                        <li onClick={() => setToggle(false)} ><a href="#" id="close"><i className="fa-solid fa-xmark"></i></a></li>
                        {!userDetails ? <Link to='login' id='list-login-button'><button>Login <i className="fa-solid fa-right-to-bracket"></i></button></Link> : <a onClick={() => onLogoutHandler()} id='list-login-button' to='#'><button className='user-logout' >Logout <i className="fa-solid fa-right-to-bracket"></i></button></a>}
                        <div id='userName' className='user-profile'>
                            {userDetails ? <a href='#'>{userDetails.userName.slice(0, 8)}</a> : <a href='#'>user</a>}
                        </div>
                    </ul>
                    <div className='nav-login-cart'>
                        {!userDetails ? <Link to='login'><button>Login<i className="fa-solid fa-right-to-bracket"></i></button></Link> : <a onClick={() => onLogoutHandler()} to='#'><button className='user-logout' >Logout <i className="fa-solid fa-right-to-bracket"></i></button></a>}
                        <Link to='/cart'><img src={cart_icon} alt='cart' /></Link>
                        <div className='nav-cart-count'>{totalCartItems}</div>
                        <div className='user-profile'>
                            {userDetails ? <a href='#'>{userDetails.userName.slice(0, 8)}</a> : <a href='#'>user</a>}
                        </div>
                        <i onClick={() => toggleHandler()} id="toggle" className="fa-solid fa-bars"></i>
                    </div>
                </>}
            </div >
        </Fragment>

    )
}

export default Navbar