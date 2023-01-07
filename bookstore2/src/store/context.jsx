import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";

const Context = React.createContext({
    authToken: null,
    isLoggedIn: false,
    error: {isError: false, message: null},
    success: {isError: false, message: null}
});

export const ContextProvider = (props) => {

    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({isError: false, message: null});
    const [success, setSuccess] = useState({isSuccess: false, message: null});
    const navigate = useNavigate();

    const showErrorAlert = (message) => {
        setError({isError: true, message: message});
        setTimeout(() => {
            setError({isError: false, message: null});
        }, 6000);
    };

    const showSuccessAlert = (message) => {
        setSuccess({isSuccess: true, message: message});
        setTimeout(() => {
            setSuccess({isSuccess: false, message: null});
        }, 6000);
    };

    const removeItemFromCart = async (data) => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:8080/api/bookstore/deleteItemFromBasket?itemId=${data}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken
                },
            });

            setIsLoading(false);
            return response

        } catch (e) {
            showErrorAlert("Connection lost");
        }
        setIsLoading(false);
    }

    const removeAllItemsFromCart = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:8080/api/bookstore/deleteAllItemsFromBasket`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken
                },
            });

            setIsLoading(false);
            return response

        } catch (e) {
            showErrorAlert("Connection lost");
        }
        setIsLoading(false);
    }

    const checkTokenExpiration = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status !== 200) {
                logout()
            }
        };

        xHttp.open(
            "GET",
            `http://localhost:8080/api/connection/user`,
            true,
            null,
            null
        );
        xHttp.setRequestHeader('Authorization', 'Bearer ' + authToken)
        xHttp.send();

    }, [authToken]);


    const addItemToCart = async (data) => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/api/bookstore/addItemToBasket', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify({
                    bookHeaderId: data
                }),
            });
            const resp = await response.json();

            if (!response.ok) {
                showErrorAlert(resp.message);
            } else {
                showSuccessAlert(resp.message)
            }
        } catch (e) {
            showErrorAlert("Connection lost");
        }
        setIsLoading(false);
    };

    const login = async (data) => {
        const url = 'http://localhost:8080/api/auth/login';
        try {
            setIsLoading(true);
            const response = await fetch(`${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: data.password,
                    username: data.username
                }),
            });
            const resp = await response.json();
            if (response.ok) {
                setIsLoggedIn(true)
                setAuthToken(resp.accessToken);
                localStorage.setItem('token', resp.accessToken);
                navigate("/");
            } else {
                showErrorAlert(resp.message);
            }
        } catch (e) {
            showErrorAlert("Connection lost");
        }
        setIsLoading(false);
    };

    const logout = function () {
        setIsLoggedIn(false)
        setAuthToken(null);
        localStorage.removeItem('token');
    }

    return (
        <Context.Provider
            value={{
                authToken,
                isLoggedIn,
                setIsLoading,
                isLoading,
                addItemToCart,
                checkTokenExpiration,
                removeItemFromCart,
                removeAllItemsFromCart,
                login,
                logout,
                error,
                success,
                showErrorAlert,
                showSuccessAlert,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default Context;