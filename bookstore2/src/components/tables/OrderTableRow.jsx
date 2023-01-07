import {useState} from "react";
import * as React from "react";
import {TableCell, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PropTypes from "prop-types";
import OrderItemsTableRow from "./OrderItemsTableRow";


export default function OrderTableRow(props) {
    const {row} = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>

            <TableRow sx={{backgroundColor: "white"}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>{row.orderId}</TableCell>
                <TableCell align="right">{row.orderStatus.description}</TableCell>
                <TableCell align="right">{new Date(row.orderDate).toDateString()}</TableCell>
                <TableCell align="right">{row.totalPrice.toFixed(2)}</TableCell>
            </TableRow>

            <OrderItemsTableRow open={open} row={row} order={row.orderId}/>

        </React.Fragment>
    );
}

OrderTableRow.propTypes = {
    row: PropTypes.shape({
        orderId: PropTypes.number.isRequired,
        orderStatus:
            PropTypes.shape({
                description: PropTypes.string.isRequired,
            }),
        orderDate: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        orderItems: PropTypes.arrayOf(
            PropTypes.shape({
                itemId: PropTypes.number,
                bookHeader:
                    PropTypes.shape({
                        bookTitle: PropTypes.string,
                    }),
                quantity: PropTypes.number,
                price: PropTypes.number,
            }),
        ).isRequired
    }).isRequired
}