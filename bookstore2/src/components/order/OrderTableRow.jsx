import {useState} from "react";
import * as React from "react";
import {TableCell, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OrderItemsTableRow from "./OrderItemsTableRow";
import {config} from "../../config";

const TableRowStyle = {
    backgroundColor: "white"
}

export default function OrderTableRow(props) {
    const {row} = props;
    const [open, setOpen] = useState(false);

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
                <TableCell align="center">{row.orderId}</TableCell>
                <TableCell align="center">{row.orderStatus.description}</TableCell>
                <TableCell align="center">{new Date(row.orderDate).toDateString()}</TableCell>
                <TableCell align="center">{row.totalPrice.toFixed(2)}{config.currency}</TableCell>
            </TableRow>

            <OrderItemsTableRow open={open} row={row} order={row.orderId}/>

        </React.Fragment>
    );
}