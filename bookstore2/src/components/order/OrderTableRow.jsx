import {useState} from "react";
import * as React from "react";
import {TableCell, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OrderItemsTableRow from "./OrderItemsTableRow";


export default function OrderTableRow(props) {
    const {row} = props;
    const [open, setOpen] = useState(false);

    const TableRowStyle = {
        backgroundColor: "white"
    }

    return (
        <React.Fragment>

            <TableRow sx={TableRowStyle}>
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