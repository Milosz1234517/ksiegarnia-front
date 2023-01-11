import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import * as React from "react";

const TextFieldStyle = {
    width: "100%",
    maxWidth: "100%",
}

export default function ChangeBookDetailsDialog({onConfirm, book, setBook, publishingHouseCopy, bookCopy, setOpen, open}) {

    const handleClose = () => {
        setOpen(false);
        setBook({
            bookHeaderId: bookCopy.bookHeaderId,
            bookAuthors: bookCopy.bookAuthors,
            bookTitle: bookCopy.bookTitle,
            description: bookCopy.description,
            edition: bookCopy.edition,
            icon: bookCopy.icon,
            price: bookCopy.price,
            publishingHouse: publishingHouseCopy,
            quantity: bookCopy.quantity,
            releaseDate: bookCopy.releaseDate,
            bookCategories: bookCopy.bookCategories
        })
    };

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

    function changeIcon(event) {
        book.icon = event.target.value
    }

    function handleDescriptionChange(event) {
        book.description = event.target.value
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
                    required={true}
                    defaultValue={book.bookTitle}
                    variant="standard"
                    onChange={changeTitle}
                />
                <TextField
                    autoFocus
                    required={true}
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
                    required={true}
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
                    required={true}
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
                    required={true}
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
                    required={true}
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

                <TextField
                    multiline
                    required={true}
                    aria-label="desc"
                    minRows={5}
                    placeholder="Description"
                    defaultValue={book.description}
                    onChange={handleDescriptionChange}
                    style={TextFieldStyle}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onConfirm}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}