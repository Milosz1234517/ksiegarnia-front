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

            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.orderId}
                </TableCell>
                <TableCell align="right">{row.orderStatus.description}</TableCell>
                <TableCell align="right">{row.orderDate}</TableCell>
                <TableCell align="right">{row.totalPrice}</TableCell>
            </TableRow>

            <OrderItemsTableRow open={open} row={row} order={row.orderId}/>

        </React.Fragment>
    );
}

OrderTableRow.propTypes = {
    row: PropTypes.shape({
        orderId: PropTypes.number.isRequired,
        orderStatus: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.string.isRequired,
            }),
        ).isRequired,
        orderDate: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        orderItems: PropTypes.arrayOf(
            PropTypes.shape({
                itemId: PropTypes.number.isRequired,
                bookHeader: PropTypes.arrayOf(
                    PropTypes.shape({
                        bookTitle: PropTypes.string.isRequired,
                    }),
                ).isRequired,
                quantity: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
            }),
        ).isRequired
    }).isRequired
}