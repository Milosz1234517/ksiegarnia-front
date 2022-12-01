import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import Context from "../../store/context";


export default function ChangePasswordDialog({openPass, setOpenPass}){

    let [oldPassC, setOldPassC] = React.useState('');
    let [newPassC, setNewPassC] = React.useState('');
    const ctx = useContext(Context)

    function handleClosePass() {
        setOpenPass(false);
        setNewPassC('')
        setOldPassC('')
    }

    function handleOldPass(event) {
        oldPassC = event.target.value
    }

    function handleConfirmPass() {
        changePassword({newPass: newPassC, oldPass: oldPassC})
        setOpenPass(false);
        setNewPassC('')
        setOldPassC('')
    }

    function handleNewPass(event) {
        newPassC = event.target.value
    }

    const changePassword = async (data) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookstore/changePassword?newPass=${data.newPass}&oldPass=${data.oldPass}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                },
            });
            if (response.ok) {
                // await ctx.logout()
            }
        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    return(
        <Dialog open={openPass} onClose={handleClosePass}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Old Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={handleOldPass}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={handleNewPass}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClosePass}>Cancel</Button>
                <Button onClick={handleConfirmPass}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}