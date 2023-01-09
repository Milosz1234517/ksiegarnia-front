import {Box} from "@mui/system";
import {Button, TextField} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import {useWindowResize} from "../WindowResizer";
import Context from "../../context/context";
import {config} from "../../config";


export default function CartCommentBox({emptyCart, cartItems, setCartItems}) {

    const size = useWindowResize()
    const ctx = useContext(Context)
    const [description, setDescription] = useState('')

    const placeOrder = async (data) => {
        try {
            ctx.setIsLoading(true)
            const response = await fetch(`${config.serverAddress}/api/bookstore/placeOrder`, {
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
                setCartItems([])
            } else {
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
        console.log(cartOrder)
        placeOrder({description: description, orderItems: cartOrder}).then(() => {
        })
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    const BoxStyle = {
        display: "inline-block",
        width: "80%",
        maxWidth: size[0],
    }

    const TextFieldStyle = {
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
        },
        width: size[0] * 0.8,
        backgroundColor: "white",
        marginTop: 5,
    }

    const ButtonStyle = {
        marginTop: 2,
        backgroundColor:"#000",
        color: "white"
    }

    return (
        <Box sx={BoxStyle} justifyContent={"left"}>

            {!emptyCart && <TextField
                sx={TextFieldStyle}
                multiline
                minRows={2}
                id="standard-basic"
                variant="outlined"
                onChange={handleDescriptionChange}
                placeholder="Order Additional Information's"
            />}

            {!emptyCart && <Button size="medium" variant="outlined"
                                   onClick={() => handlePlaceOrder()}
                                   sx={ButtonStyle}>
                Place order
            </Button>}
        </Box>
    );
}