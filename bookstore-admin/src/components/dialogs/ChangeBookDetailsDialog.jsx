import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import Context from "../../store/context";


export default function ChangeBookDetailsDialog({book, setBook, bookChange, setBookChange, setOpen, open}){

    const ctx = useContext(Context)

    const changeBookDetails = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/bookstore/updateBook', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                },
                body: JSON.stringify({
                    bookAuthors: data.bookAuthors,
                    bookHeaderId: data.bookHeaderId,
                    bookTitle: data.bookTitle,
                    description: data.description,
                    edition: data.edition,
                    icon: data.icon,
                    price: data.price,
                    publishingHouse: data.publishingHouse,
                    quantity: data.quantity,
                    releaseDate: data.releaseDate,
                    bookCategories: data.bookCategories
                }),
            });
            const resp = await response.json();

            console.log(data)

            if (!response.ok) {
                setBook({
                    bookAuthors: book.bookAuthors,
                    bookHeaderId: book.bookHeaderId,
                    bookTitle: book.bookTitle,
                    description: book.description,
                    edition: book.edition,
                    icon: book.icon,
                    price: book.price,
                    publishingHouse: book.publishingHouse,
                    quantity: book.quantity,
                    releaseDate: book.releaseDate,
                    bookCategories: book.bookCategories
                })
            }
        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const handleClose = () => {
        setOpen(false);
        setBookChange({
            bookAuthors: book.bookAuthors,
            bookHeaderId: book.bookHeaderId,
            bookTitle: book.bookTitle,
            description: book.description,
            edition: book.edition,
            icon: book.icon,
            price: book.price,
            publishingHouse: book.publishingHouse,
            quantity: book.quantity,
            releaseDate: book.releaseDate,
            bookCategories: book.bookCategories
        })
    };

    function handleConfirm() {
        changeBookDetails(bookChange)
        setOpen(false);
    }

    function changeTitle(event) {
        bookChange.bookTitle = event.target.value
    }

    function changeEdition(event) {
        bookChange.edition = event.target.value
    }

    function changePrice(event) {
        bookChange.price = event.target.value
    }
    //
    // function changePublishingHouse(event) {
    //     bookChange.publishingHouse.name = event.target.value
    // }

    function changeQuantity(event) {
        bookChange.quantity = event.target.value
    }

    function changeReleaseDate(event) {
        bookChange.releaseDate = event.target.value
    }

    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="bookTitle"
                    label="Book Title"
                    fullWidth
                    defaultValue={book.bookTitle}
                    variant="standard"
                    onChange={changeTitle}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="edition"
                    label="Edition"
                    fullWidth
                    defaultValue={book.edition}
                    variant="standard"
                    onChange={changeEdition}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    type="number"
                    label="Price"
                    fullWidth
                    defaultValue={book.price}
                    variant="standard"
                    onChange={changePrice}
                />
                {/*<TextField*/}
                {/*    autoFocus*/}
                {/*    margin="dense"*/}
                {/*    id="name"*/}
                {/*    label="Publishing-house"*/}
                {/*    fullWidth*/}
                {/*    defaultValue={book.publishingHouse.name}*/}
                {/*    variant="standard"*/}
                {/*    onChange={changePublishingHouse}*/}
                {/*/>*/}
                <TextField
                    autoFocus
                    margin="dense"
                    id="quantity"
                    label="Quantity"
                    fullWidth
                    defaultValue={book.quantity}
                    variant="standard"
                    onChange={changeQuantity}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="releaseDate"
                    label="Release Date"
                    type="date"
                    fullWidth
                    defaultValue={book.releaseDate}
                    variant="standard"
                    onChange={changeReleaseDate}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}