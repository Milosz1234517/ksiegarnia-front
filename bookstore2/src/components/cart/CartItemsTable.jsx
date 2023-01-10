import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/system";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import {useWindowResize} from "../WindowResizer";
import {useContext} from "react";
import Context from "../../context/context";
import {TableRowStyle} from "../../App";
import {config} from "../../config";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


export default function CartItemsTable({cartItems, setCartItems, totalPrice, setTotalPrice}) {

    const ctx = useContext(Context)
    const [size] = useWindowResize()

    const updateItemCart = async (data) => {
        try {
            ctx.setIsLoading(true);
            const response = await fetch(`${config.serverAddress}/api/bookstore/updateItem`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                },
                body: JSON.stringify({
                    bookHeader: data.bookHeader,
                    quantity: data.quantity
                }),
            });

            ctx.setIsLoading(false);
            return response.json()

        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
        ctx.setIsLoading(false);
    };

    const handleAddMore = obj => {
        setCartItems(cartItems.map(item => {
            if (item.itemId === obj.itemId) {
                if (obj.quantity < obj.bookHeader.quantity) {
                    updateItemCart({bookHeader: obj.bookHeader, quantity: obj.quantity + 1}).then((resp) => {
                        setCartItems(resp.basket)
                        setTotalPrice(resp.totalPrice)
                    })
                }
            }
            return item
        }))
    }

    const handleRemoveMore = obj => {
        setCartItems(cartItems.map(item => {
            if (item.itemId === obj.itemId) {
                if (item.quantity > 0) {
                    const quantity = item.quantity - 1
                    updateItemCart({bookHeader: obj.bookHeader, quantity: quantity}).then((resp) => {
                        setCartItems(resp.basket)
                        setTotalPrice(resp.totalPrice)
                    })

                }
            }
            return item
        }))
    }

    const TableCellStyle = {
        maxWidth: size[0],
        overflow: "hidden",
        textOverflow: "ellipsis"
    }

    const BoxStyle= {
        display: "flex"
    }

    return (
        <TableContainer component={Paper}>

            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell><Typography>Book Title:</Typography></TableCell>
                        <TableCell><Typography sx = {{marginLeft: 3}}>Quantity:</Typography></TableCell>
                        <TableCell><Typography>Price:</Typography></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {cartItems.map((row) => (
                        <TableRow
                            key={row.itemId}
                            sx={TableRowStyle}>

                            <TableCell align="left" sx={TableCellStyle}>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="a">
                                    {row.bookHeader.bookTitle}
                                </Typography>
                            </TableCell>

                            <TableCell align="left">
                                <Box sx={BoxStyle}>

                                    <IconButton
                                        size="medium"
                                        variant="outlined"
                                        onClick={() => handleRemoveMore({
                                            itemId: row.itemId,
                                            bookHeader: row.bookHeader,
                                            quantity: row.quantity
                                        })}>
                                        <RemoveCircleIcon/>
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
                                        <AddCircleIcon/>
                                    </IconButton>
                                </Box>
                            </TableCell>

                            <TableCell align="left">
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="a">
                                    {row.price.toFixed(2)}{config.currency}
                                </Typography>
                            </TableCell>

                        </TableRow>
                    ))}
                    <TableRow sx={TableRowStyle}>

                        <TableCell align="left"/>

                        <TableCell align="center">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="a">
                                Total:
                            </Typography>
                        </TableCell>

                        <TableCell align="left">
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="a">
                                {(totalPrice).toFixed(2)}{config.currency}
                            </Typography>
                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}