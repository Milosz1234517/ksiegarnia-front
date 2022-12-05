import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";


export default function AddCategoryDialog({bookChange, setOpen, open, setCategories, handeChange}) {

    const [catChange, setCatChange] = useState({})

    function addCat(data) {
        const book = JSON.parse(JSON.stringify(bookChange));
        book.bookCategories = [...bookChange.bookCategories, data]

        if (handeChange) {
            handeChange(book).then((resp) => {
                setCatChange({})
                if(resp) {
                    if(resp.ok) {
                        bookChange.bookCategories = book.bookCategories
                        setCategories(bookChange.bookCategories)
                    }
                }
            })
        } else {
            setCatChange({})
            bookChange.bookCategories = book.bookCategories
            setCategories(bookChange.bookCategories)
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    function handleConfirm() {
        addCat(catChange)
        setOpen(false);
    }

    function handleAddCat(event) {
        setCatChange({description: event.target.value})
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="cat"
                    label="Category"
                    fullWidth
                    variant="standard"
                    onChange={handleAddCat}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}