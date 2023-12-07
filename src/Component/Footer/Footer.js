import React from 'react';
import './Footer.css'
import main_logo from '../Assets/main-logo.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';


const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-logo'>
                <img src={main_logo} alt='logo' />
                <p>STORE <span className='speColor'>CODE</span></p>
            </div>
            <ul className='footer_links'>
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className='footer_social_icon'>
                <div className='footer-icons-container'>
                    <img src={instagram_icon} alt='insta' />
                </div>
                <div className='footer-icons-container'>
                    <img src={pintester_icon} alt='pintester' />
                </div>
                <div className='footer-icons-container'>
                    <img src={whatsapp_icon} alt='whatsapp' />
                </div>
            </div>
            <div className='footer-copyright'>
                <hr />
                <p>Copyright @2023 -  All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer