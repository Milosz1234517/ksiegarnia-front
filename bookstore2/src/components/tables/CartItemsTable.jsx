import {Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/system";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import {useWindowResize} from "../other/WindowResizer";
import {useContext} from "react";
import Context from "../../store/context";


export default function CartItemsTable({cartItems, setCartItems}){

    const ctx = useContext(Context)
    const [size] = useWindowResize()

    const handleAddMore = obj => {
        setCartItems(cartItems.map(item => {
            if (item.itemId === obj.itemId) {
                if (obj.quantity < obj.bookHeader.quantity) {
                    ctx.updateItemCart({bookHeader: obj.bookHeader, quantity: obj.quantity + 1}).then((resp)=>{
                        if(resp){
                            if (resp.ok){
                                item.quantity = item.quantity + 1
                            }
                        }
                    })

                }
            }
            return item
        }))
    }

    const handleRemoveMore = obj => {
        if(obj.quantity > 1) {
            setCartItems(cartItems.map(item => {
                if (item.itemId === obj.itemId) {
                    if (item.quantity > 0) {
                        const quantity = item.quantity - 1
                        if (quantity > 0) {
                            ctx.updateItemCart({bookHeader: obj.bookHeader, quantity: quantity}).then((resp) => {
                                if (resp.ok)
                                    item.quantity = quantity
                            })
                        }
                    }
                }
                return item
            }))
        }else{
            ctx.removeItemFromCart(obj.itemId).then((r)=>{
                if(r.ok){
                    setCartItems(cartItems.filter((it)=>obj.itemId !== it.itemId))
                }

            })

        }
    }

    return(
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
                                    {(row.quantity * row.bookHeader.price).toFixed(2)}zł
                                </Typography>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}