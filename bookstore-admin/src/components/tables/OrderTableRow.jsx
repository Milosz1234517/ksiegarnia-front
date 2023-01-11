import {useContext, useEffect, useState} from "react";
import * as React from "react";
import {TableCell, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OrderItemsTableRow from "./OrderItemsTableRow";
import EditIcon from '@mui/icons-material/Edit';
import ChangeOrderStatusDialog from "../dialogs/ChangeOrderStatusDialog";
import Context from "../../store/context";
import {config} from "../../config";


export default function OrderTableRow({props, statuses}) {
    const row = props;
    const [open, setOpen] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [status, setStatus] = useState()
    const ctx = useContext(Context)

    function handleStatusChange() {
        ctx.checkTokenExpiration()
        setOpenStatus(true)
    }

    useEffect(()=>{
        setStatus(row.orderStatus)
    }, [row.orderStatus])

    const TableRowStyle = {
        backgroundColor: "white"
    }

    return (
        <React.Fragment>

            <ChangeOrderStatusDialog
                statuses={statuses}
                orderId={row.orderId}
                open={openStatus}
                setOpen={setOpenStatus}
                setStatus={setStatus}/>

            <TableRow sx={TableRowStyle}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                            ctx.checkTokenExpiration()
                            setOpen(!open)
                        }}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell align={"center"}>{row.orderId}</TableCell>
                <TableCell align="center">
                    {status?.description}
                    <IconButton
                        onClick={handleStatusChange}
                        size="small">
                        <EditIcon/>
                    </IconButton>
                </TableCell>
                <TableCell align="center">{new Date(row.orderDate).toDateString()}</TableCell>
                <TableCell align="center">{row.totalPrice.toFixed(2)}{config.currency}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
            </TableRow>

            <OrderItemsTableRow open={open} row={row} order={row.orderId}/>

        </React.Fragment>
    );
}