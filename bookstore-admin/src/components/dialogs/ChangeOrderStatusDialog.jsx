import {useCallback, useContext, useEffect, useState} from "react";
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


export default function ChangeOrderStatusDialog({orderId, setStatus, open, setOpen}) {

    const ctx = useContext(Context)
    const [statuses, setStatuses] = useState([])
    const [statusChange, setStatusChange] = useState()

    const bookOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookstore/bookOrder?orderId=${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                }
            });
            await response.json();
            return response;

        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const cancelOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookstore/cancelOrder?orderId=${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                }
            });
            await response.json();
            return response;

        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const finalizeOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookstore/finalizeOrder?orderId=${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                }
            });
            await response.json();
            return response;

        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const getStatuses = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;

                obj = JSON.parse(json);
                setStatuses(obj.filter((s) => s.statusId !== 1))
            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getStatuses`,
            true,
            null,
            null
        );
        xHttp.send();

    }, []);

    useEffect(() => {
        getStatuses();
    }, [getStatuses]);


    function handleClose() {
        setOpen(false)
    }

    function handleConfirm() {
        setOpen(false)
        console.log(statusChange)
        switch (statusChange) {
            case 2:
                cancelOrder().then(
                    function (response) {
                        console.log(response)
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
                <FormControl variant="standard" sx={{m: 2, minWidth: 150}}>
                    <InputLabel id="status-label">Chose Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        value={statusChange}
                        onChange={handleChangeStatus}
                    >
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