import {useContext, useState} from "react";
import Context from "../../store/context";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, InputLabel,
    MenuItem, Select,
} from "@mui/material";
import * as React from "react";
import {config} from "../../config";

const FormControlStyle = {
    m: 2,
    minWidth: 150
}

export default function ChangeOrderStatusDialog({orderId, setStatus, open, setOpen, statuses}) {

    const ctx = useContext(Context)
    const [statusChange, setStatusChange] = useState('')

    const bookOrder = async () => {
        try {
            const response = await fetch(`${config.serverAddress}/api/bookstore/bookOrder?orderId=${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                }
            });

            const resp = await response.json();

            if(!response.ok){
                ctx.showErrorAlert(resp.message);
            }

            return response;

        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
    };

    const cancelOrder = async () => {
        try {
            const response = await fetch(`${config.serverAddress}/api/bookstore/cancelOrder?orderId=${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                }
            });

            const resp = await response.json();

            if(!response.ok){
                ctx.showErrorAlert(resp.message);
            }

            return response;

        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
    };

    const finalizeOrder = async () => {
        try {
            const response = await fetch(`${config.serverAddress}/api/bookstore/finalizeOrder?orderId=${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                }
            });

            const resp = await response.json();

            if(!response.ok){
                ctx.showErrorAlert(resp.message);
            }

            return response;

        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
    };

    function handleClose() {
        setOpen(false)
    }

    function handleConfirm() {
        setOpen(false)
        switch (statusChange) {
            case 2:
                cancelOrder().then(
                    function (response) {
                        if (response.ok) {
                            setStatus(statuses.find((s) => s.statusId === 2))
                        }
                    }
                )
                break;
            case 3:
                finalizeOrder().then(
                    function (response) {
                        if (response.ok) {
                            setStatus(statuses.find((s) => s.statusId === 3))
                        }
                    }
                )
                break;
            case 4:
                bookOrder().then(
                    function (response) {
                        if (response.ok) {
                            setStatus(statuses.find((s) => s.statusId === 4))
                        }
                    },
                )
                break;
            default:
                    break;
        }
        setStatusChange(undefined)
    }

    function handleChangeStatus(event) {
        setStatusChange(event.target.value)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Set Status</DialogTitle>
            <DialogContent>
                <FormControl variant="standard" sx={FormControlStyle}>
                    <InputLabel id="status-label">Chose Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        value={statusChange || ''}
                        onChange={handleChangeStatus}>
                        {statuses.map((option) => (
                            <MenuItem key={option.statusId} value={option.statusId}>
                                {option.description}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}