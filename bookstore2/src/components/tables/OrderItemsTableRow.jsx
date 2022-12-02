import {Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import RateReviewIcon from "@mui/icons-material/RateReview";
import * as React from "react";
import CreateReviewDialog from "../dialogs/CreateReviewDialog";
import {useContext, useState} from "react";
import Context from "../../store/context";


export default function OrderItemsTableRow({row, open}) {

    const [openReview, setOpenReview] = useState(false);
    const [bookHeaderId, setBookHeaderId] = useState('')
    const ctx = useContext(Context)

    const getReview = async (data) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookstore/getReviewsForBookAndUser?bookHeaderId=${data}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                }
            });
            const resp = await response.json();
            if (response.ok) {
                if (!resp) {
                    setOpenReview(true)
                    setBookHeaderId(data)
                }
            }
        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    function handleCreateReview(bookHeaderId) {
        getReview(bookHeaderId)
    }

    return (
        <TableRow>
            <CreateReviewDialog
                bookHeaderId={bookHeaderId}
                openReview={openReview}
                setBookHeaderId={setBookHeaderId}
                setOpenReview={setOpenReview}/>

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
                                        <TableCell align="left">
                                            <Button
                                                onClick={() => handleCreateReview(item.bookHeader.bookHeaderId)}><RateReviewIcon/></Button>
                                        </TableCell>
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