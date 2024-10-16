import React, { useState, useContext, useEffect, Fragment } from 'react';
import './Navbar.css'
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import main_logo from '../Assets/main-logo.png'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import HashLoader from "react-spinners/HashLoader";
import { toast } from 'react-toastify';

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setIsConfirmationModal] = useState({
        error: false,
        success: false,
        message: "Are you sure you want to logout?",
        color: "red"
    });
    const { userDetails, userLogoutHandler, totalCartItems } = useContext(ShopContext);


    const toggleHandler = () => {
        setToggle((toggle) => !toggle);
        console.log(toggle)
    }


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])


    const onCancelModalHandler = () => {
        if (confirmationModal.success) {
            setIsConfirmationModal((prev) => ({ ...prev, error: false, success: false, message: "", color: "" }));
        }
        else {
            setIsConfirmationModal((prev) => ({ ...prev, error: false, success: false, message: "", color: "" }));
        }
        userLogoutHandler();
        toast.success("Logout Successfull")
    }


    return (
        <Fragment>
            <div className='navbar'>
                {console.log('line 49')}
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
                        <li onClick={() => setToggle(false)} id="close" ><i className="fa-solid fa-xmark"></i></li>
                        {!userDetails ? <Link to='/login' id='list-login-button'><button>Login <i className="fa-solid fa-right-to-bracket"></i></button></Link> : <button onClick={() => setIsConfirmationModal((prev) => ({ ...prev, error: true, success: false, message: "Are you sure you want to logout?", color: "red" }))} id='list-login-button' className='user-logout' >Logout <i className="fa-solid fa-right-to-bracket"></i></button>}
                        <div id='userName' className='user-profile'>
                            {userDetails ? <Link to='/'>{userDetails.userName.slice(0, 8)}</Link> : <Link to='/'>user</Link>}
                        </div>
                    </ul>
                    <div className='nav-login-cart'>
                        {!userDetails ? <Link to='login'><button>Login<i className="fa-solid fa-right-to-bracket"></i></button></Link> : <button onClick={() =>
                            setIsConfirmationModal((prev) => ({ ...prev, error: true, success: false, message: "Are you sure you want to logout?", color: "red" }))
                        } className='user-logout' >Logout <i className="fa-solid fa-right-to-bracket"></i></button>}
                        <Link to='/cart'><img src={cart_icon} alt='cart' /></Link>
                        <div className='nav-cart-count'>{totalCartItems}</div>
                        <div className='user-profile'>
                            {userDetails ? <Link to='/'>{userDetails.userName.slice(0, 8)}</Link> : <Link to='/'>user</Link>}
                        </div>
                        <i onClick={toggleHandler} id="toggle" className="fa-solid fa-bars"></i>
                    </div>
                </>}
            </div>


            {(confirmationModal.error || confirmationModal.success) && <ConfirmationModal 
            setIsConfirmationModal={setIsConfirmationModal}
            onCancelModalHandler={onCancelModalHandler}
             confirmationModal={confirmationModal} />}

        </Fragment>

    )
}

export default Navbar;