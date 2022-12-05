import HomePageMenu from "../components/other/HomePageMenu";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box} from "@mui/system";
import {Button} from "@mui/material";
import ChangeDetailsDialog from "../components/dialogs/ChangeDetailsDialog";
import ChangePasswordDialog from "../components/dialogs/ChangePasswordDialog";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../store/context";


export default function AccountPage() {
    const [openPass, setOpenPass] = React.useState(false);
    const [user, setUser] = useState({})
    const [userChange, setUserChange] = useState({})
    const [open, setOpen] = React.useState(false);
    const ctx = useContext(Context)

    const getUser = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;
        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.responseText;
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

        xHttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getUserDetails`,
            true,
            null,
            null
        );
        xHttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xHttp.send();

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

    return (
        <div>
            <HomePageMenu/>
            <Typography variant="h2"
                        component="a"
                        sx={{
                            margin: 4,
                        }}>
                Account
            </Typography>

            <Box sx={{width: '100%'}}>

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

            </Box>
        </div>
    );
}