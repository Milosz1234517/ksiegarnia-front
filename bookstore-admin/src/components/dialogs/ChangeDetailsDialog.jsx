import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import Context from "../../store/context";


export default function ChangeDetailsDialog({user, setUser, userChange, setUserChange, setOpen, open}){

    const ctx = useContext(Context)

    const changeUserDetails = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/bookstore/changeUserDetails', {
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
                setUser(data)

                if (data.login !== oldLogin.login)
                    window.location.reload()
            } else {
                setUserChange({
                    login: user.login,
                    name: user.name,
                    surname: user.surname,
                    phoneNumber: user.phoneNumber
                })
            }
        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const handleClose = () => {
        setOpen(false);
        setUserChange({
            login: user.login,
            name: user.name,
            surname: user.surname,
            phoneNumber: user.phoneNumber
        })
    };

    function handleConfirm() {
        changeUserDetails(userChange)
        setOpen(false);
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
            <DialogTitle>Subscribe</DialogTitle>
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