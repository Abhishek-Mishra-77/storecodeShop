import React, { useState, useContext } from 'react';
import './LoginSignup.css'
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const { userAuthenitcationHandler } = useContext(ShopContext);
    const [login, setLogin] = useState(true);
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const navigate = useNavigate();


    const onAuthenticationHandler = async (event) => {
        event.preventDefault();
        try {
            let URL;
            if (login) {
                URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLjHbIGbxJvyLOJJep_8c_WkMgAeNIdAg'
            }
            else {
                URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLjHbIGbxJvyLOJJep_8c_WkMgAeNIdAg'
            }

            const response = await fetch(URL, {
                method: 'POST',
                body: JSON.stringify({
                    email: inputEmail,
                    password: inputPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'applications/json'
                }
            })

            if (response.ok) {
                const userDetails = {
                    email: inputEmail,
                    password: inputPassword,
                    userName: inputName
                }
                userAuthenitcationHandler(userDetails);
                alert('Authenication successfully ✅')
                navigate('/')
            }
            else {
                const data = await response.json();
                let errroMessage = 'Authenicaion Fails❌'
                if (data && data.error && data.error.message) {
                    errroMessage = data.error.message
                }
                throw new Error(errroMessage);
            }
        }
        catch (error) {
            alert(error.message)
        }
        setInputName('');
        setInputEmail('');
        setInputPassword('');
    }


    return (
        <div className="login-section">
            <div className="container">
                <div className="login-box">
                    <form onSubmit={onAuthenticationHandler}>
                        {login && <p className='login-notifi'>Please Enter Your Details✅</p>}
                        <h2>{login ? <>Sign <span className="speColor">in</span></> : <>Sign <span span className="speColor">up</span></>}</h2>
                        <div className="input-box">
                            <span className="icon">
                                <i className="fa-regular fa-user"></i>
                            </span>
                            <input
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                type="text"
                                placeholder='Enter Your Name'
                                required />
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <i className="fa-solid fa-envelope"></i>
                            </span>
                            <input
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                                type="emaill"
                                placeholder='Enter Your Email'
                                required />
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <i className="fa-solid fa-lock"></i>
                            </span>
                            <input
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                                type="password"
                                placeholder='Enter Your Password'
                                required />
                        </div>
                        <div className="remeber-forgot">
                            <label><input type="checkbox" required />Remeber me</label>
                            <a href="">Forgot Password?</a>
                        </div>
                        <button type="submit">{login ? 'Login' : 'Signup'}</button>
                        <div className="register-link">
                            <p>Don't have an account? <a onClick={() => setLogin((login) => !login)} href="">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div >

    )
}

export default LoginSignup