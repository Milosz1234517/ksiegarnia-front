import React, {useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const Context = React.createContext({
    authToken: null,
    isLoggedIn: false
});

export const ContextProvider = (props) => {

    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const navigate = useNavigate();
    let location = useLocation();

    const changeBookDetails = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/bookstore/updateBook', {
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
            await response.json();
            return response

        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const createBook = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/bookstore/addBook', {
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
            await response.json();

            if (!response.ok)
                window.location.reload()

        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const checkTokenExpiration = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status !== 200) {
                logout()
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/connection/admin`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + authToken)
        xhttp.send();

    }, [authToken]);

    useEffect(() => {
        checkTokenExpiration()
    }, [checkTokenExpiration, location]);

    const login = async (data) => {
        const url = 'http://localhost:8080/api/auth/login';
        try {
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
            }
        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const logout = async () => {
        setIsLoggedIn(false)
        setAuthToken(null);
        localStorage.removeItem('token');
    }

    const register = async (data) => {
        const url = 'http://localhost:8080/api/auth/register';
        try {
            const response = await fetch(`${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    password: data.password,
                    phone: data.phone,
                    sname: data.sname,
                    username: data.username,
                }),
            });
            const resp = await response.json();
            resp.accessToken = undefined;
            if (response.ok) {
                navigate("/login");
            }
        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    }

    return (
        <Context.Provider
            value={{
                authToken,
                changeBookDetails,
                isLoggedIn,
                checkTokenExpiration,
                login,
                logout,
                register,
                createBook,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default Context;