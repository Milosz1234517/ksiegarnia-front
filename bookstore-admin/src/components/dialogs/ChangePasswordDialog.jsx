import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import Context from "../../store/context";


export default function ChangePasswordDialog({openPass, setOpenPass}){

    let [oldPassC, setOldPassC] = React.useState('');
    let [newPassC, setNewPassC] = React.useState('');
    const ctx = useContext(Context)

    function handleClose() {
        setOpenPass(false);
        setNewPassC('')
        setOldPassC('')
    }

    function handleEnterOldPass(event) {
        oldPassC = event.target.value
    }

    function handleConfirm() {
        changePassword({newPass: newPassC, oldPass: oldPassC}).then(()=>{
            setOpenPass(false);
            setNewPassC('')
            setOldPassC('')
        })
    }

    function handleEnterNewPass(event) {
        newPassC = event.target.value
    }

    const changePassword = async (data) => {
        try {
            ctx.setIsLoading(true)
            const response = await fetch(`http://localhost:8080/api/bookstore/changePassword?newPass=${data.newPass}&oldPass=${data.oldPass}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                },
            });
            const resp = await response.json()

            if (response.ok) {
                ctx.showSuccessAlert(resp.message)
            }else{
                ctx.showErrorAlert(resp.message);
            }
        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
        ctx.setIsLoading(false)
    };

    return(
        <Dialog open={openPass} onClose={handleClose}>
            <DialogTitle>Password</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="pass"
                    label="Old Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={handleEnterOldPass}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="passold"
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={handleEnterNewPass}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}