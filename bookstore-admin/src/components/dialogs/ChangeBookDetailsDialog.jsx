import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import Context from "../../store/context";
import ChangePasswordDialog from "./ChangePasswordDialog";
import AddAuthorDialog from "./AddAuthorDialog";
import Box from "@mui/material/Box";


export default function ChangeBookDetailsDialog({book, setBook, setOpen, open}) {

    const ctx = useContext(Context)
    const [openAuthor, setOpenAuthor] = useState(false)

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
            await response.json();

        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload()
    };

    function handleConfirm() {
        changeBookDetails(book)
        setOpen(false);
    }

    function changeTitle(event) {
        book.bookTitle = event.target.value
    }

    function changeEdition(event) {
        book.edition = event.target.value
    }

    function changePrice(event) {
        book.price = event.target.value
    }

    function changePublishingHouse(event) {
        book.publishingHouse.name = event.target.value
    }

    function changeQuantity(event) {
        book.quantity = event.target.value
    }

    function changeReleaseDate(event) {
        book.releaseDate = event.target.value
    }

    function handleAddAuthor(event) {
        setOpenAuthor(true)
    }

    function changeIcon(event) {
        book.icon = event.target.value
    }

    return (
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
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Publishing-house"
                    fullWidth
                    defaultValue={book.publishingHouse?.name}
                    variant="standard"
                    onChange={changePublishingHouse}
                />
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

                {book.bookAuthors?.map((author) => {

                    function changeAuthorName(event) {
                        book.bookAuthors.find((a) => a.authorId === author.authorId).name = event.target.value
                    }

                    function changeAuthorSurame(event) {
                        book.bookAuthors.find((a) => a.authorId === author.authorId).surname = event.target.value
                    }

                    return (
                        <Box>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="releaseDate"
                                label="Author Name"
                                fullWidth
                                defaultValue={author.name}
                                variant="standard"
                                onChange={changeAuthorName}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="releaseDate"
                                label="Author Surname"
                                fullWidth
                                defaultValue={author.surname}
                                variant="standard"
                                onChange={changeAuthorSurame}
                            />
                        </Box>
                    )
                })}
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

                <TextField
                    autoFocus
                    margin="dense"
                    id="icon"
                    label="Icon"
                    fullWidth
                    defaultValue={book.icon}
                    variant="standard"
                    onChange={changeIcon}
                />

                <AddAuthorDialog open={openAuthor} setOpen={setOpenAuthor} bookChange={book}
                                 setBookChange={setBook}/>
                <Button onClick={handleAddAuthor}>Add Author</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}