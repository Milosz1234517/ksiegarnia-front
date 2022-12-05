import {Box} from "@mui/system";
import {Button, TextareaAutosize} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import {useWindowResize} from "../other/WindowResizer";
import Context from "../../store/context";


export default function CartOrder({emptyCart, cartItems, setCartItems}){

    const size = useWindowResize()
    const ctx = useContext(Context)
    const [description, setDescription] = useState('')

    const placeOrder = async (data) => {
        try {
            ctx.setIsLoading(true)
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

           const respJson = await response.json()

            if (response.ok) {
                ctx.showSuccessAlert(respJson.message)
                setDescription('')
                cartItems.forEach((item) => ctx.removeItemFromCart(item.itemId).then((respItem) => {
                    if(respItem) {
                        if (respItem.ok) {
                            setCartItems(cartItems.filter((it) => it.itemId !== item.itemId))
                        }
                    }
                }))
            }else{
                ctx.showErrorAlert(respJson.message);
            }
            ctx.setIsLoading(false)

        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
        ctx.setIsLoading(false)
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
        placeOrder({description: description, orderItems: cartOrder}).then(() =>{})
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