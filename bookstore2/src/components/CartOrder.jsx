import {Box} from "@mui/system";
import {Button, TextareaAutosize} from "@mui/material";
import * as React from "react";
import {useWindowResize} from "./WindowResizer";
import {useContext, useState} from "react";
import Context from "../store/context";


export default function CartOrder({emptyCart, cartItems, setCartItems}){

    const size = useWindowResize()
    const ctx = useContext(Context)
    const [description, setDescription] = useState('')

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
            } else {
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

    return(
        <Box
            sx={{
                display: "inline-block",
                width: "80%",
                maxWidth: size[0],
            }}
            justifyContent={"left"}>

            {!emptyCart && <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder="Order Additional Information's"
                onChange={handleDescriptionChange}
                style={{
                    width: "100%",
                    maxWidth: size[0],
                    margin: 15,

                }}
            />}

            {!emptyCart && <Button size="medium" variant="outlined"
                                   onClick={() => handlePlaceOrder()}
                                   sx={{
                                       margin: 2,
                                   }}>
                Place order
            </Button>}
        </Box>
    );
}