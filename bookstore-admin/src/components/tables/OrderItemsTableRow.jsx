import {Collapse, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import * as React from "react";


export default function OrderItemsTableRow({row, open}) {

    return (
        <TableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{margin: 1}}>
                        <Typography align="left" variant="h6" gutterBottom component="div">
                            Order Items
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Book Title</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell align="right">Price(zł)</TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.orderItems.map((item) => (
                                    <TableRow key={item.itemId}>
                                        <TableCell component="th" scope="row">
                                            {item.bookHeader.bookTitle}
                                        </TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell align="right">{item.price}</TableCell>
                                        <TableCell/>
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