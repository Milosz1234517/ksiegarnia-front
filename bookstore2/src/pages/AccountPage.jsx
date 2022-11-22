import HomePageMenu from "../components/HomePageMenu";
import Typography from "@mui/material/Typography";
import * as React from "react";
import PropTypes from "prop-types";
import {Box} from "@mui/system";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../store/context";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function AccountPage() {
    const ctx = useContext(Context);
    const [value, setValue] = React.useState(0);
    const [user, setUser] = useState({})

    const [userChange, setUserChange] = useState({})

    const [open, setOpen] = React.useState(false);
    const [openPass, setOpenPass] = React.useState(false);

    const [oldPass, setOldPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    let [oldPassC, setOldPassC] = React.useState('');
    let [newPassC, setNewPassC] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    const handleClickOpen = () => {
        setOpen(true);
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

    function handleNewPass(event) {
        newPassC = event.target.value
    }

    function handleClickOpenPass() {
        setOpenPass(true);
    }

    function handleClosePass() {
        setOpenPass(false);
        setNewPass('')
        setOldPass('')
        setNewPassC('')
        setOldPassC('')
    }

    function handleOldPass(event) {
        oldPassC = event.target.value
    }

    function handleConfirmPass() {
        changePassword({newPass: newPassC, oldPass: oldPassC})
        setOpenPass(false);
        setNewPass('')
        setOldPass('')
        setNewPassC('')
        setOldPassC('')
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
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Account Details" {...a11yProps(0)} />
                        <Tab label="Orders" {...a11yProps(1)} />
                        <Tab label="Reviews" {...a11yProps(2)} />
                    </Tabs>
                </Box>
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

                    <Button variant="outlined" sx={{margin: 3}} onClick={handleClickOpenPass}>
                        Change Password
                    </Button>

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

                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        </div>
    );
}