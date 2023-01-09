import * as React from "react";
import {Button, Container, Table, TableBody, TableContainer} from "@mui/material";
import ChangeDetailsDialog from "../components/dialogs/ChangeDetailsDialog";
import ChangePasswordDialog from "../components/dialogs/ChangePasswordDialog";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../store/context";
import AccountDetailsTableRow from "../components/other/AccountDetailsTableRow";
import {PaperWithShadow} from "../App";
import {Box} from "@mui/system";
import HomePageMenu from "../components/other/HomePageMenu";
import PageTitle from "../components/other/PageTitle";


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

    useEffect(() => {
        ctx.checkTokenExpiration()
    });

    const ButtonStyle = {
        marginTop: 3,
        marginRight: 3,
        color: "white",
        backgroundColor: "#000"
    }

    return (
        <Box>
            <HomePageMenu/>
            <Container>
                <PageTitle title="Account" center={false}/>
                <TableContainer component={PaperWithShadow}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <AccountDetailsTableRow text={"Username: "} value={user.login}/>
                            <AccountDetailsTableRow text={"Name: "} value={user.name}/>
                            <AccountDetailsTableRow text={"Surname: "} value={user.surname}/>
                            <AccountDetailsTableRow text={"Phone: "} value={user.phoneNumber}/>
                        </TableBody>
                    </Table>
                </TableContainer>


                <Button variant="outlined" sx={ButtonStyle} onClick={handleClickOpen}>
                    Modify Profile Data
                </Button>

                <Button variant="outlined" sx={ButtonStyle} onClick={handleClickOpenPass}>
                    Change Password
                </Button>

                <ChangeDetailsDialog
                    open={open} user={user}
                    userChange={userChange}
                    setOpen={setOpen}
                    setUserChange={setUserChange}/>

                <ChangePasswordDialog openPass={openPass} setOpenPass={setOpenPass}/>

            </Container>
        </Box>
    );
}