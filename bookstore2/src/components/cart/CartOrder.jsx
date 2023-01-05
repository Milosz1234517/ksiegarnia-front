import {Box} from "@mui/system";
import {Button, TextareaAutosize, TextField} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import {useWindowResize} from "../other/WindowResizer";
import Context from "../../store/context";
import Typography from "@mui/material/Typography";


export default function CartOrder({emptyCart, cartItems, setCartItems}) {

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
                ctx.removeAllItemsFromCart().then((respItem) => {
                    if (respItem.ok) {
                        setCartItems([])
                    }
                })
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

    return (
        <Box
            sx={{
                display: "inline-block",
                width: "80%",
                maxWidth: size[0],
            }}
            justifyContent={"left"}>

            {!emptyCart && <TextField
                sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                    },
                    width: size[0] * 0.8, backgroundColor: "white", marginTop: 5, marginLeft: 2
                }}
                multiline
                minRows={2}
                id="standard-basic"
                variant="outlined"
                onChange={handleDescriptionChange}
                placeholder="Order Additional Information's"
            />}

            {!emptyCart && <Button size="medium" variant="outlined"
                                   onClick={() => handlePlaceOrder()}
                                   sx={{
                                       margin: 2,
                                       backgroundColor:"#000",
                                       color: "white"
                                   }}>
                Place order
            </Button>}
        </Box>
    );
}