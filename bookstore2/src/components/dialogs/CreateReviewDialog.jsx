import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextareaAutosize} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import Context from "../../store/context";


export default function CreateReviewDialog({openReview, bookHeaderId, setBookHeaderId, setOpenReview, order}){

    const ctx = useContext(Context)
    const [value, setValue] = React.useState(2);
    const [description, setDescription] = useState('')

    const addReview = async (data) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookstore/reviewBook?orderId=${order}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                },
                body: JSON.stringify({
                    bookHeaderId: data.bookHeaderId,
                    mark: data.mark,
                    description: data.description
                }),
            });
            const resp = await response.json();
            if (response.ok) {

            }
        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const handleCloseReview = () => {
        setValue(2)
        setBookHeaderId('')
        setDescription('')
        setOpenReview(false);
    };

    function handleConfirmReview() {
        addReview({bookHeaderId: bookHeaderId, mark: value, description: description})
        setValue(2)
        setBookHeaderId('')
        setDescription('')
        setOpenReview(false);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    return(
        <Dialog open={openReview} onClose={handleCloseReview}>
            <DialogTitle>Review</DialogTitle>
            <DialogContent>
                <Rating
                    name="simple-controlled"
                    value={value}
                    max={10}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />

                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Description"
                    onChange={handleDescriptionChange}
                    style={{
                        width: 400,
                        maxWidth: 400,
                        margin: 25,

                    }}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseReview}>Cancel</Button>
                <Button onClick={handleConfirmReview}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}