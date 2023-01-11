import {Button, Collapse, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import RateReviewIcon from "@mui/icons-material/RateReview";
import * as React from "react";
import CreateReviewDialog from "../dialogs/CreateReviewDialog";
import {useContext, useState} from "react";
import Context from "../../context/context";
import {config} from "../../config";

const TableCellStyle = {
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: "#e8f5e9"
}

const BoxStyle = {
    margin: 1
}

const TableHeadStyle = {
    backgroundColor: "#e8f5e9"
}

export default function OrderItemsTableRow({row, open, order}) {

    const [openReview, setOpenReview] = useState(false);
    const [value, setValue] = React.useState(2);
    const [description, setDescription] = useState('')
    const [bookHeaderId, setBookHeaderId] = useState('')
    const ctx = useContext(Context)

    const checkReview = async (data) => {
        try {
            const response = await fetch(`${config.serverAddress}/api/bookstore/checkReviewPossibility?bookHeaderId=${data}&orderId=${order}`, {
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
                    setValue(2)
                    setBookHeaderId(data)
                    setDescription('')
                } else {
                    ctx.showErrorAlert("Can't create review for this book because it's already has been created or order is not completed yet");
                }
            } else {
                ctx.showErrorAlert("Can't create review for this book");
            }
        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
    };

    function handleCreateReview(bookHeaderId) {
        checkReview(bookHeaderId).then(() => {
        })
    }

    return (
        <TableRow>
            <CreateReviewDialog
                bookHeaderId={bookHeaderId}
                openReview={openReview}
                value={value}
                order={order}
                description={description}
                setOpenReview={setOpenReview}
                setValue={setValue}
                setDescription={setDescription}/>

            <TableCell style={TableCellStyle} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={BoxStyle}>
                        <Typography align="left" variant="h6" gutterBottom component="div">
                            Order Items
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead sx={TableHeadStyle}>
                                <TableRow>
                                    <TableCell align="left">Book Title:</TableCell>
                                    <TableCell align="left">Quantity:</TableCell>
                                    <TableCell align="left">Price:</TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={TableHeadStyle}>
                                {row.orderItems.map((item) => (
                                    <TableRow key={item.orderId}>
                                        <TableCell align="left">{item.bookHeader.bookTitle}</TableCell>
                                        <TableCell align="left">{item.quantity}</TableCell>
                                        <TableCell align="left">{item.price.toFixed(2)}{config.currency}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleCreateReview(item.bookHeader.bookHeaderId)}>
                                                <RateReviewIcon/>
                                            </Button>
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