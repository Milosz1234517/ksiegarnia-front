import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Button, Paper, TextareaAutosize} from "@mui/material";
import * as React from "react";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../store/context";
import HomePageMenu from "../components/HomePageMenu";
import IconButton from "@mui/material/IconButton";
import {Box} from "@mui/system";


export default function BasketPage() {

    const ctx = useContext(Context);

    const [cartItems, setCartItems] = useState([])
    const [emptyCart, setEmptyCart] = useState(true)
    const [show, setShow] = useState(false)
    const [description, setDescription] = useState('')


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

                if(obj.length !== 0)
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


    const handleRemove = obj => {
        ctx.removeItemFromCart(obj.itemId)
        setCartItems(cartItems.filter((item) => item.itemId !== obj.itemId))
    }

    const handleAddMore = obj => {
        setCartItems(cartItems.map(item => {
            if (item.itemId === obj.itemId) {
                if (obj.quantity < obj.bookHeader.quantity) {
                    ctx.updateItemCart({bookHeader: obj.bookHeader, quantity: obj.quantity + 1})
                    item.quantity = item.quantity + 1
                }
            }
            return item
        }))
    }

    const handleRemoveMore = obj => {
        let cartItemsCopy = cartItems.map(item => {
            if (item.itemId === obj.itemId) {
                if (item.quantity > 0) {
                    item.quantity = item.quantity - 1
                    if (item.quantity > 0) {
                        ctx.updateItemCart({bookHeader: obj.bookHeader, quantity: obj.quantity - 1})
                    } else {
                        ctx.removeItemFromCart(obj.itemId)
                    }
                }
            }
            return item
        })
        cartItemsCopy = cartItemsCopy.filter((item) => item.quantity !== 0)
        setCartItems(cartItemsCopy)
    }

    const placeOrder = async (data) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookstore/placeOrder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                },
                body: JSON.stringify({
                    description: data.description,
                    orderItems: data.orderItems
                }),
            });
            const resp = await response.json();
            if (response.ok) {
                cartItems.forEach((item) => ctx.removeItemFromCart(item.itemId))
                setCartItems([])
                setDescription('')
            }else{
                ctx.checkTokenExpiration()
            }
        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    }

    const handlePlaceOrder = () => {

        const cartOrder = cartItems.map((item) => {
                return {
                    bookHeader: {
                        bookHeaderId: item.bookHeader.bookHeaderId
                    },
                    quantity: item.quantity
                }
            }
        )

        placeOrder({description: description, orderItems: cartOrder})
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    return (
        <div>
            <HomePageMenu/>
            <Typography variant="h2"
                        component="a"
                        sx={{
                            margin: 4,
                        }}>
                Basket
            </Typography>
            {(show && emptyCart) && <Typography
                gutterBottom
                variant="h4"
                component="a"
                sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    margin: 4,
                }}>
                is empty!
            </Typography>}

            {cartItems.map((bookCart) => {
                let {itemId, bookHeader, quantity} = bookCart;

                return (
                    <Grid item>
                        <Paper
                            key={itemId}
                            sx={{
                                p: 1,
                                margin: 4,
                                gridTemplateRows: "1fr auto",
                                gridGap: "8px",
                                height: "100%",
                                flexGrow: 1,
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item container>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="a"
                                        sx={{
                                            color: 'inherit',
                                            textDecoration: 'none',
                                            margin: 4,
                                        }}>
                                        {bookHeader.bookTitle}
                                    </Typography>
                                    <IconButton size="medium" variant="outlined"
                                                onClick={() => handleRemoveMore({
                                                    itemId: itemId,
                                                    bookHeader: bookHeader,
                                                    quantity: quantity
                                                })} sx={{
                                        marginTop: 5,
                                        marginBottom: 5,
                                        marginLeft: 5,
                                        marginRight: 1
                                    }}>
                                        -
                                    </IconButton>
                                    <Typography
                                        sx={{
                                            marginTop: 6
                                        }}
                                        variant="body2" gutterBottom>
                                        {quantity}
                                    </Typography>
                                    <IconButton size="medium" variant="outlined"
                                                onClick={() =>
                                                    handleAddMore({
                                                        itemId: itemId,
                                                        bookHeader: bookHeader,
                                                        quantity: quantity
                                                    })
                                                } sx={{
                                        marginTop: 5,
                                        marginBottom: 5,
                                        marginLeft: 1,
                                        marginRight: 5
                                    }}>
                                        +
                                    </IconButton>
                                    <Button size="medium" variant="outlined"
                                            onClick={() => handleRemove({itemId: itemId})}
                                            sx={{
                                                margin: 5,
                                                marginLeft: 20
                                            }}>
                                        Remove
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )
                    ;
            })}
            <Box sx={{display: "flex"}} justifyContent={"left"}>
                {!emptyCart && <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Description"
                    onChange={handleDescriptionChange}
                    style={{
                        width: 400,
                        maxWidth: 400,
                        margin: 25,

                    }}
                />}
                {!emptyCart && <Button size="medium" variant="outlined"
                                       onClick={() => handlePlaceOrder()}
                                       sx={{
                                           margin: 5,
                                           maxHeight: 35
                                       }}>
                    Place order
                </Button>}
            </Box>
        </div>
    );
}