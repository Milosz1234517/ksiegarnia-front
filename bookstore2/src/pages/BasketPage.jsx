import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextareaAutosize
} from "@mui/material";
import * as React from "react";
import {useCallback, useContext, useEffect, useLayoutEffect, useState} from "react";
import Context from "../store/context";
import HomePageMenu from "../components/HomePageMenu";
import IconButton from "@mui/material/IconButton";
import {Box} from "@mui/system";

export const useWindowResize = () => {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
};

export default function BasketPage() {

    const ctx = useContext(Context);

    const [cartItems, setCartItems] = useState([])
    const [emptyCart, setEmptyCart] = useState(true)
    const [show, setShow] = useState(false)
    const [description, setDescription] = useState('')
    const [size] = useWindowResize()


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

    return (
        <div>
            <HomePageMenu/>
            <Box sx={{display: "grid"}}>
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
                        marginLeft: 4,
                    }}>
                    is empty!
                </Typography>}
            </Box>

            <TableContainer>
                <Table sx={{maxWidth: size[0]}} aria-label="simple table">
                    <TableBody>
                        {cartItems.map((row) => (
                            <TableRow
                                key={row.itemId}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                                <TableCell align="left"
                                           sx={{maxWidth: size[0], overflow: "hidden", textOverflow: "ellipsis"}}>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="a">
                                        {row.bookHeader.bookTitle}
                                    </Typography>
                                </TableCell>

                                <TableCell align="left">
                                    <Box sx={{display: "flex"}}>
                                        <IconButton
                                            size="medium"
                                            variant="outlined"
                                            onClick={() => handleRemoveMore({
                                                itemId: row.itemId,
                                                bookHeader: row.bookHeader,
                                                quantity: row.quantity
                                            })}>
                                            -
                                        </IconButton>

                                        <IconButton
                                            size="medium"
                                            variant="outlined">
                                            {row.quantity}
                                        </IconButton>

                                        <IconButton
                                            size="medium" variant="outlined"
                                            onClick={() =>
                                                handleAddMore({
                                                    itemId: row.itemId,
                                                    bookHeader: row.bookHeader,
                                                    quantity: row.quantity
                                                })
                                            }>
                                            +
                                        </IconButton>
                                    </Box>
                                </TableCell>

                                <TableCell align="left">
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="a">
                                        {row.quantity * row.bookHeader.price}zł
                                    </Typography>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
        </div>
    );
}