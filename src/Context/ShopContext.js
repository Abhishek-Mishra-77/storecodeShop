import React, { createContext, useEffect, useState } from 'react';
import all_product from '../Component/Assets/all_product';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails') || null))
    const [searchToggle, setSearchToggle] = useState(false);
    const [totalCartItems, setTotalCartItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [paymentDone, setPayementDone] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const modifiedEmail = userDetails && userDetails.email.replace(/[@.]/g, '');

    // Logic of cart items 

    useEffect(() => {
        let qty = 0;
        let amt = 0;
        cartItems.forEach((item) => {
            qty += item.quantity;
            amt += item.quantity * item.new_price;
        })
        setTotalCartItems(qty);
        setTotalPrice(amt)
    }, [cartItems])


    useEffect(() => {
        if (userDetails) {
            const fetchCartItems = async () => {
                const response = await fetch(`https://authentication-app-91f92-default-rtdb.firebaseio.com/${modifiedEmail}.json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        const cartProducts = Object.values(data);
                        const cartKeys = Object.keys(data);
                        let newArr = [];
                        for (let i = 0; i < cartKeys.length; i++) {
                            const cartProduct = {
                                keys: cartKeys[i],
                                id: cartProducts[i].id,
                                name: cartProducts[i].name,
                                quantity: cartProducts[i].quantity,
                                image: cartProducts[i].image,
                                new_price: cartProducts[i].new_price,
                                old_price: cartProducts[i].old_price
                            }
                            newArr[i] = cartProduct;
                        }
                        setCartItems(newArr);
                    }
                }
                else {
                    const data = await response.json();
                    let errorMessage = 'Process Failed!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                }
            }
            fetchCartItems()
        }
    }, [userDetails])

    // Add To cart 
    const addToCart = async (product) => {
        const { id } = product;
        const newProducts = cartItems.filter((item) => item.id !== id);
        const newProduct = {
            id: product.id,
            name: product.name,
            image: product.image,
            new_price: product.new_price,
            old_price: product.old_price,
            quantity: 1
        }

        const currItem = cartItems.find((item) => item.id === id);
        const url = `https://authentication-app-91f92-default-rtdb.firebaseio.com/${modifiedEmail}`;

        try {
            if (!currItem) {
                const response = await fetch(`${url}.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...newProduct, quantity: 1 })
                });

                if (response.ok) {
                    const data = await response.json();
                    const { name } = data;
                    setCartItems((cartItems) => {
                        return [...newProducts, { ...newProduct, keys: name }]
                    })
                }
                else {
                    const data = await response.json();
                    let errorMessage = 'Process Failed!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                }

            } else {
                const proId = currItem.keys;
                const response = await fetch(`${url}/${proId}.json`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...currItem,
                        quantity: currItem.quantity + 1
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    setCartItems((cartItems) => {
                        currItem.quantity++;
                        return [...newProducts, currItem]
                    })
                }
                else {
                    const data = await response.json();
                    let errorMessage = 'Process Failed!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                }

            }
        } catch (error) {
            console.error(error);
        }
    };

    // decrement The cart Item
    const decrementToCart = async (product) => {
        const { id } = product;
        const currItem = cartItems.find((item) => item.id === id);
        const newProducts = cartItems.filter((item) => item.id !== id);
        if (currItem.quantity === 1) {
            removeCartItemHandler(product)
        }
        else {
            const newProduct = {
                keys: currItem.keys,
                id: product.id,
                name: product.name,
                image: product.image,
                new_price: product.new_price,
                old_price: product.old_price,
                quantity: product.quantity - 1
            }
            setCartItems((cartItems) => {
                return [...newProducts, newProduct];
            })

            try {
                const proId = currItem.keys
                const response = await fetch(`https://authentication-app-91f92-default-rtdb.firebaseio.com/${modifiedEmail}/${proId}.json`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...currItem,
                        quantity: currItem.quantity - 1
                    })
                });

                const data = await response.json();
                if (response.ok) {
                    setCartItems((cartItems) => {
                        currItem.quantity--;
                        return [...newProducts, currItem]
                    })
                }
                else {
                    let errorMessage = 'Process Failed!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    //  Remove cart Item from database 
    const removeCartItemHandler = async (product) => {
        const { id } = product;
        const newProducts = cartItems.filter((item) => item.id !== id);
        try {
            const proId = product.keys;
            const response = await fetch(`https://authentication-app-91f92-default-rtdb.firebaseio.com/${modifiedEmail}/${proId}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCartItems((cartItems) => {
                    return [...newProducts];
                })
            }
            else {
                const data = await response.json();
                let errorMessage = 'Process Failed!';
                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //   useAuthenication All 
    const userAuthenitcationHandler = (userData) => {
        localStorage.setItem('userDetails', JSON.stringify(userData));
        setUserDetails(userData)
    }


    const getPaymentInfoHandlder = (data) => {
        const { created, email, id } = data;
        const { name, address_country } = data.card;
        const payInfo = {
            AmountPaid: totalPrice,
            name: name,
            email: email,
            created: created,
            address: address_country,
            id: id
        }
        setPaymentInfo(payInfo);
    }


    const paymentPageHandler = () => {
        setPayementDone((paymentDone) => !paymentDone)
    }

    const userLogoutHandler = () => {
        localStorage.removeItem('userDetails');
        setUserDetails(null);
    }

    const searchProductHandler = () => {
        setSearchToggle((searchToggle) => !searchToggle);
    }


    const contextValue = {
        all_product,
        userAuthenitcationHandler,
        userDetails,
        userLogoutHandler,
        searchProductHandler,
        searchToggle,
        addToCart,
        cartItems,
        totalCartItems,
        totalPrice,
        removeCartItemHandler,
        decrementToCart,
        paymentDone,
        paymentPageHandler,
        paymentInfo,
        getPaymentInfoHandlder
    };


    return (
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;