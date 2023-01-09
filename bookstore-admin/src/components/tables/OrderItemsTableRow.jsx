import {Collapse, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {config} from "../../config";


export default function OrderItemsTableRow({row, open}) {

    const TableCellStyle = {
        paddingBottom: 0,
        paddingTop: 0,
        backgroundColor: "#e8f5e9"
    }

    const BoxStyle = {
        margin: 1
    }

    const TableHeadStyle = {
        backgroundColor:"#e8f5e9"
    }

    return (
        <TableRow>

            <TableCell style={TableCellStyle} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={BoxStyle}>
                        <Typography align="left" variant="h6" gutterBottom component="div">
                            Order Items
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead sx={{backgroundColor:"#e8f5e9"}}>
                                <TableRow>
                                    <TableCell>Book Title:</TableCell>
                                    <TableCell>Quantity:</TableCell>
                                    <TableCell align="left">Price:</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={TableHeadStyle}>
                                {row.orderItems.map((item) => (
                                    <TableRow key={item.orderId}>
                                        <TableCell component="th" scope="row">
                                            {item.bookHeader.bookTitle}
                                        </TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell align="left">{item.price.toFixed(2)}{config.currency}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}