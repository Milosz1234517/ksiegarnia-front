import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";


export default function AddAuthorDialog({bookChange, setBookChange, setOpen, open}) {

    const [authorChange, setAuthorChange] = useState({})

    function addAuthor(data) {
        const authors = [...bookChange.bookAuthors, data]
        setBookChange({
            bookAuthors: authors,
            bookHeaderId: bookChange.bookHeaderId,
            bookTitle: bookChange.bookTitle,
            description: bookChange.description,
            edition: bookChange.edition,
            icon: bookChange.icon,
            price: bookChange.price,
            publishingHouse: bookChange.publishingHouse,
            quantity: bookChange.quantity,
            releaseDate: bookChange.releaseDate,
            bookCategories: bookChange.bookCategories
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    function handleConfirm() {
        addAuthor(authorChange)
        setOpen(false);
    }

    function handleAddAuthor(event) {
        setAuthorChange({name: event.target.value, surname: authorChange.surname})
    }

    function handleAddAuthorSurname(event) {
        setAuthorChange({name: authorChange.name, surname: event.target.value})
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="releaseDate"
                    label="Author Name"
                    fullWidth
                    variant="standard"
                    onChange={handleAddAuthor}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="releaseDate"
                    label="Author Name"
                    fullWidth
                    variant="standard"
                    onChange={handleAddAuthorSurname}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}