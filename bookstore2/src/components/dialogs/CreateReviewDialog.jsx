import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
    TextField
} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import Context from "../../context/context";
import {Stack} from "@mui/system";
import {config} from "../../config";
import Typography from "@mui/material/Typography";

const StackStyle = {
    marginBottom: 2
}

export default function CreateReviewDialog({bookHeaderId, openReview, value, order, description, setValue, setOpenReview, setDescription
                                           }) {
    const ctx = useContext(Context)

    const addReview = async (data) => {
        try {
            ctx.setIsLoading(true)
            const response = await fetch(`${config.serverAddress}/api/bookstore/reviewBook?orderId=${order}`, {
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
            } else {
                ctx.showErrorAlert(resp.message);
                setOpenReview(false);
            }

        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
        ctx.setIsLoading(false)
    };

    const handleCloseReview = () => {
        setOpenReview(false);
    };

    function handleConfirmReview() {
        addReview({bookHeaderId: bookHeaderId, mark: value, description: description}).then(() => {
        })
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    return (
        <Dialog open={openReview} onClose={handleCloseReview}>
            <DialogTitle>Review</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={StackStyle}>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        max={10}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}/>

                    <TextField
                        multiline
                        minRows={2}
                        id="standard-basic"
                        variant="outlined"
                        onChange={handleDescriptionChange}
                        placeholder="Review Text"/>

                    <Typography>
                        {description.length}/30000
                    </Typography>
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseReview}>Cancel</Button>
                <Button onClick={handleConfirmReview}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}