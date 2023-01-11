import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {config} from "../config";

const Context = React.createContext({
    authToken: null,
    isLoggedIn: false
});

export const ContextProvider = (props) => {

    const [authToken, setAuthToken] = useState(localStorage.getItem('tokenAdmin'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('tokenAdmin'));
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

    const changeBookDetails = async (data) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${config.serverAddress}/api/bookstore/updateBook`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify({
                    bookAuthors: data.bookAuthors,
                    bookHeaderId: data.bookHeaderId,
                    bookTitle: data.bookTitle,
                    description: data.description,
                    edition: data.edition,
                    icon: data.icon,
                    price: data.price,
                    publishingHouse: data.publishingHouse,
                    quantity: data.quantity,
                    releaseDate: data.releaseDate,
                    bookCategories: data.bookCategories
                }),
            });
            const resp = await response.json()
            if (response.ok) {
                showSuccessAlert(resp.message)
            } else {
                showErrorAlert("Error: " + resp.message)
            }

            setIsLoading(false)
            return response

        } catch (e) {
            showErrorAlert("Connection lost");
        }
        setIsLoading(false)
    };

    const deleteReview = async (data) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${config.serverAddress}/api/bookstore/deleteReview?reviewId=${data}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken
                }
            });

            setIsLoading(false)
            return response

        } catch (e) {
            showErrorAlert("Connection lost");
        }
        setIsLoading(false)
    };

    const createBook = async (data) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${config.serverAddress}/api/bookstore/addBook`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify({
                    bookAuthors: data.bookAuthors,
                    bookTitle: data.bookTitle,
                    description: data.description,
                    edition: data.edition,
                    icon: data.icon,
                    price: data.price,
                    publishingHouse: data.publishingHouse,
                    quantity: data.quantity,
                    releaseDate: data.releaseDate,
                    bookCategories: data.bookCategories
                }),
            });
            const resp = await response.json();

            if (response.ok){
                showSuccessAlert(resp.message)
            }else{
                showErrorAlert("Error: " + resp.message)
            }

            setIsLoading(false)
            return response

        } catch (e) {
            showErrorAlert("Connection lost");
        }
        setIsLoading(false)
    };

    const checkTokenExpiration = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status !== 200) {
                logout()
            }
        };

        xHttp.open(
            "GET",
            `${config.serverAddress}/api/connection/admin`,
            true,
            null,
            null
        );
        xHttp.setRequestHeader('Authorization', 'Bearer ' + authToken)
        xHttp.send();

    }, [authToken]);

    const login = async (data) => {
        const url = `${config.serverAddress}/api/auth/loginAdmin`;
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
                localStorage.setItem('tokenAdmin', resp.accessToken);
                navigate("/cockpit");
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
        localStorage.removeItem('tokenAdmin');
    }

    return (
        <Context.Provider
            value={{
                authToken,
                changeBookDetails,
                isLoggedIn,
                isLoading,
                checkTokenExpiration,
                login,
                logout,
                createBook,
                error,
                success,
                showErrorAlert,
                setIsLoading,
                deleteReview,
                showSuccessAlert,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default Context;