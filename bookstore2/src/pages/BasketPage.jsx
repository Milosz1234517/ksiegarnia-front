import * as React from "react";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../context/context";
import HomePageMenu from "../components/HomePageMenu";
import PageTitle from "../components/PageTitle";
import CartItemsTable from "../components/cart/CartItemsTable";
import CartCommentBox from "../components/cart/CartCommentBox";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {config} from "../config";
import {Container} from "@mui/material";
import {GlobalStyles} from "@mui/joy";

const BoxStyle = {
    display: "grid",
    marginTop: 5,
    justifyContent: "center"
}

const TypographyStyle = {
    color: 'inherit',
    textDecoration: 'none',
    marginLeft: 4,
}

const GlobalStyle = {
    body: { backgroundColor: "#c8e6c9" },
}

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
            `${config.serverAddress}/api/bookstore/getBasket`,
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

    return (
        <Box>
            <GlobalStyles
                styles={GlobalStyle}
            />
            <HomePageMenu/>
            <Container>
                <PageTitle title={"Shopping Cart"} center={false}/>
                <CartItemsTable totalPrice={totalPrice} setTotalPrice={setTotalPrice} cartItems={cartItems}
                                setCartItems={setCartItems}/>
                <CartCommentBox setTotalPrice={setTotalPrice} emptyCart={emptyCart} setCartItems={setCartItems} cartItems={cartItems}/>

                <Box sx={BoxStyle}>
                    {(show && emptyCart) && <Typography
                        gutterBottom
                        variant="h4"
                        component="a"
                        sx={TypographyStyle}>
                        Cart is empty <SentimentVeryDissatisfiedIcon/>
                    </Typography>}
                </Box>
            </Container>
        </Box>
    );
}