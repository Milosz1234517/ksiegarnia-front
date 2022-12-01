import * as React from "react";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../store/context";
import HomePageMenu from "../components/other/HomePageMenu";
import CartTitle from "../components/cart/CartTitle";
import CartItemsTable from "../components/tables/CartItemsTable";
import CartOrder from "../components/cart/CartOrder";



export default function BasketPage() {

    const ctx = useContext(Context);
    const [cartItems, setCartItems] = useState([])
    const [emptyCart, setEmptyCart] = useState(true)
    const [show, setShow] = useState(false)

    const getCart = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;

                obj = JSON.parse(json);
                setCartItems(obj)

                setShow(true)

                if (obj.length !== 0)
                    setEmptyCart(false)

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBasket`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken]);

    useEffect(() => {
        getCart()
    }, [getCart]);

    useEffect(() => {
        if (cartItems.length === 0)
            setEmptyCart(true)
        else {
            setEmptyCart(false)
        }
    }, [cartItems]);

    return (
        <div>
            <HomePageMenu/>
            <CartTitle show={show} showEmpty={emptyCart}/>
            <CartItemsTable cartItems={cartItems} setCartItems={setCartItems}/>
            <CartOrder emptyCart={emptyCart} setCartItems={setCartItems} cartItems={cartItems}/>
        </div>
    );
}