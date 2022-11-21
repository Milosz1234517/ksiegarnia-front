import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {Button, Paper, TextField} from "@mui/material";
import * as React from "react";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../store/context";
import HomePageMenu from "../components/HomePageMenu";


export default function BasketPage() {

    const ctx = useContext(Context);

    const [cartItems, setCartItems] = useState([])
    const [refresh, setRefresh] = useState(false)


    const getCart = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;

                obj = JSON.parse(json);
                setCartItems(obj)
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

    }, [ctx.authToken, refresh]);

    useEffect(() => {
        getCart()
    }, [getCart]);


    function handleUpdateCart() {

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
            {cartItems.map((bookCart) => {
                const {itemId, bookHeader, quantity} = bookCart;

                function handleChangeQuantity(event) {
                    ctx.updateItemCart({bookHeader: bookHeader, quantity: event.target.value})
                }

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

                                        <TextField
                                        margin="normal"
                                        sx={{marginLeft: 5, marginRight: 25}}
                                        variant="filled"
                                        id="quantity"
                                        label="Quantity"
                                        name="quantity"
                                        type="number"
                                        autoComplete="quantity"
                                        defaultValue={quantity}
                                        onChange={handleChangeQuantity}
                                        autoFocus/>

                                    <Button size="medium" variant="outlined" onClick={handleUpdateCart} sx={{
                                        margin: 5,
                                        marginLeft: 20
                                    }}>
                                        Remove
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                );
            })}
        </div>
    );
}