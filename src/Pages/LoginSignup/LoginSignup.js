import React, { useState, useContext } from 'react';
import './LoginSignup.css'
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Component/ConfirmationModal/ConfirmationModal';
import { toast } from 'react-toastify';


const LoginSignup = () => {
    const { userAuthenitcationHandler, userLogoutHandler } = useContext(ShopContext);
    const [login, setLogin] = useState(true);
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [confirmationModal, setIsConfirmationModal] = useState({
        error: false,
        success: false,
        message: "",
        color: ""
    });
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
                setIsConfirmationModal((prev) => ({ ...prev, success: true, message: "Login Successfull✅", color: "green" }));
                userAuthenitcationHandler(userDetails);
            }
            else {
                const data = await response.json();
                let errroMessage = 'Authenicaion Fails❌'
                if (data && data.error && data.error.message) {
                    errroMessage = data.error.message
                }
                setIsConfirmationModal((prev) => ({ ...prev, error: true, message: errroMessage, color: "red" }));
                throw new Error(errroMessage);
            }
        }
        catch (error) {
            setIsConfirmationModal((prev) => ({ ...prev, error: true, message: error.message, color: "red" }));
        }
    }

    const onCancelModalHandler = () => {
        if (confirmationModal.success) {
            setIsConfirmationModal((prev) => ({ ...prev, error: false, success: false, message: "", color: "" }));
            navigate("/")
            toast.success("Logout Successfull")
        }
        else {
            setIsConfirmationModal((prev) => ({ ...prev, error: false, success: false, message: "", color: "" }));
            toast.error("Authenication Fails❌")
        }

    }


    return (
        <>
            <div className="login-section">
                <div className="container">
                    <div className="login-box">
                        <form onSubmit={onAuthenticationHandler}>
                            {login && <p className='login-notifi'>Please Enter Your Details✅</p>}
                            <h2>{login ? <>Sign <span className="speColor">in</span></> : <>Sign <span className="speColor">up</span></>}</h2>
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
                                <p href="">Forgot Password?</p>
                            </div>
                            <button type="submit">{login ? 'Login' : 'Signup'}</button>
                            <div onClick={() => userLogoutHandler()} className="register-link">
                                <p>Don't have an account? <span onClick={() => setLogin((login) => !login)}>Register</span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {(confirmationModal.error || confirmationModal.success) && <ConfirmationModal
                setIsConfirmationModal={setIsConfirmationModal}
                onCancelModalHandler={onCancelModalHandler}
                confirmationModal={confirmationModal}
            />}
        </>

    )
}

export default LoginSignup