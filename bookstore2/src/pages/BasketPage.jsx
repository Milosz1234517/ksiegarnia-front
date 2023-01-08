import * as React from "react";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../store/context";
import HomePageMenu from "../components/other/HomePageMenu";
import PageTitle from "../components/cart/PageTitle";
import CartItemsTable from "../components/tables/CartItemsTable";
import CartOrder from "../components/cart/CartOrder";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


export default function BasketPage() {

    const ctx = useContext(Context);
    const [cartItems, setCartItems] = useState([])
    let [totalPrice, setTotalPrice] = useState(0)
    const [emptyCart, setEmptyCart] = useState(true)
    const [show, setShow] = useState(false)

    useEffect(() => {
        ctx.checkTokenExpiration()
    });

    const getCart = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;

                obj = JSON.parse(json);
                setCartItems(obj.basket)
                setTotalPrice(obj.totalPrice)

                setShow(true)

                if (obj.basket.length !== 0) {
                    setEmptyCart(false)
                }

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }

        };

        xHttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBasket`,
            true,
            null,
            null
        );
        xHttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xHttp.send();

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

    const BoxStyle = {
        display: "grid",
        justifyContent: "center"
    }

    const TypographyStyle = {
        color: 'inherit',
        textDecoration: 'none',
        marginLeft: 4,
    }

    return (
        <Box>
            <HomePageMenu/>
            <PageTitle title={"Shopping Cart"}/>
            <CartItemsTable totalPrice = {totalPrice} setTotalPrice = {setTotalPrice} cartItems={cartItems} setCartItems={setCartItems}/>
            <CartOrder emptyCart={emptyCart} setCartItems={setCartItems} cartItems={cartItems}/>

            <Box sx={BoxStyle}>
                {(show && emptyCart) && <Typography
                    gutterBottom
                    variant="h4"
                    component="a"
                    sx={TypographyStyle}>
                    Cart is empty <SentimentVeryDissatisfiedIcon/>
                </Typography>}
            </Box>
        </Box>
    );
}