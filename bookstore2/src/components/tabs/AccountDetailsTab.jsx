import TabPanel from "./TabPanel";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import * as React from "react";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../../store/context";
import ChangeDetailsDialog from "../dialogs/ChangeDetailsDialog";
import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";


export default function AccountDetailsTab({value}){

    const [openPass, setOpenPass] = React.useState(false);
    const [user, setUser] = useState({})
    const [userChange, setUserChange] = useState({})
    const [open, setOpen] = React.useState(false);
    const ctx = useContext(Context)

    const getUser = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;
                obj = JSON.parse(json);
                setUser(obj)
                setUserChange({
                    login: obj.login,
                    name: obj.name,
                    surname: obj.surname,
                    phoneNumber: obj.phoneNumber
                })
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getUserDetails`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken]);

    useEffect(() => {
        getUser()
    }, [getUser]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    function handleClickOpenPass() {
        setOpenPass(true);
    }

    return(
        <TabPanel value={value} index={0}>

            <Typography sx={{margin: 3}} Typography variant="h5">
                Username: {user.login}
            </Typography>

            <Typography sx={{margin: 3}} Typography variant="h5">
                Name: {user.name}
            </Typography>

            <Typography sx={{margin: 3}} Typography variant="h5">
                Surname: {user.surname}
            </Typography>

            <Typography sx={{margin: 3}} Typography variant="h5">
                Phone: {user.phoneNumber}
            </Typography>

            <Button variant="outlined" sx={{margin: 3}} onClick={handleClickOpen}>
                Modify Profile Data
            </Button>

            <Button variant="outlined" sx={{margin: 3}} onClick={handleClickOpenPass}>
                Change Password
            </Button>

            <ChangeDetailsDialog
                open={open} user={user}
                userChange={userChange}
                setOpen={setOpen}
                setUser={setUser}
                setUserChange={setUserChange}/>

            <ChangePasswordDialog openPass={openPass} setOpenPass={setOpenPass}/>

        </TabPanel>
    );
}