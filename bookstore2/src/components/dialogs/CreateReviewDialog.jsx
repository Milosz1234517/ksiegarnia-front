import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
    TextareaAutosize,
    TextField
} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import Context from "../../store/context";
import {Box, Stack} from "@mui/system";


export default function CreateReviewDialog({openReview, bookHeaderId, setBookHeaderId, setOpenReview, order, value, setValue}){

    const ctx = useContext(Context)
    const [description, setDescription] = useState('')

    const addReview = async (data) => {
        try {
            ctx.setIsLoading(true)
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
                ctx.showSuccessAlert(resp.message)
                setOpenReview(false);
                setValue(2)
                setBookHeaderId('')
                setDescription('')
            }else{
                ctx.showErrorAlert(resp.message);
                setOpenReview(false);
                setValue(2)
                setBookHeaderId('')
                setDescription('')
            }

        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
        ctx.setIsLoading(false)
    };

    const handleCloseReview = () => {

        setBookHeaderId('')
        setDescription('')
        setOpenReview(false);
    };

    function handleConfirmReview() {
        addReview({bookHeaderId: bookHeaderId, mark: value, description: description}).then(()=>{})
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    return(
        <Dialog open={openReview} onClose={handleCloseReview}>
            <DialogTitle>Review</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{
                    marginBottom: 2
                }}>
                <Rating
                    name="simple-controlled"
                    value={value}
                    max={10}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}/>

                <TextField
                    sx={{}}
                    multiline
                    minRows={2}
                    id="standard-basic"
                    variant="outlined"
                    onChange={handleDescriptionChange}
                    placeholder="Review Text"/>
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseReview}>Cancel</Button>
                <Button onClick={handleConfirmReview}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}