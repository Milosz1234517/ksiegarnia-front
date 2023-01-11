import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import Context from "../../store/context";
import {config} from "../../config";


export default function ChangeAccountDetailsDialog({user, userChange, setUserChange, setOpen, open}){

    const ctx = useContext(Context)

    const changeUserDetails = async (data) => {
        try {
            ctx.setIsLoading(true)
            const response = await fetch(`${config.serverAddress}/api/bookstore/changeUserDetails`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                },
                body: JSON.stringify({
                    login: data.login,
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    surname: data.surname
                }),
            });

            const resp = await response.json();

            if (response.ok) {
                const oldLogin = user.login
                if (data.login !== oldLogin.login)
                    window.location.reload()
            } else {
                setUserChange(JSON.parse(JSON.stringify(user)))
                ctx.showErrorAlert("Action canceled because:" + resp.message);
            }

        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
        ctx.setIsLoading(false)
    };

    const handleClose = () => {
        setOpen(false);
        setUserChange(JSON.parse(JSON.stringify(user)))
    };

    function handleConfirm() {
        changeUserDetails(userChange).then(()=>{
            setOpen(false);
        })

    }

    function handleChangeEmail(event) {
        userChange.login = event.target.value
    }

    function handleChangeName(event) {
        userChange.name = event.target.value
    }

    function handleChangeSurname(event) {
        userChange.surname = event.target.value
    }

    function handleChangePhone(event) {
        userChange.phoneNumber = event.target.value
    }

    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Profile</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    defaultValue={user.login}
                    variant="standard"
                    onChange={handleChangeEmail}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    fullWidth
                    defaultValue={user.name}
                    variant="standard"
                    onChange={handleChangeName}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Surname"
                    fullWidth
                    defaultValue={user.surname}
                    variant="standard"
                    onChange={handleChangeSurname}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Phone"
                    type="number"
                    fullWidth
                    defaultValue={user.phoneNumber}
                    variant="standard"
                    onChange={handleChangePhone}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}