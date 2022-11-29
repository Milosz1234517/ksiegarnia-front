import HomePageMenu from "../components/HomePageMenu";
import Typography from "@mui/material/Typography";
import * as React from "react";
import PropTypes from "prop-types";
import {Box, Stack} from "@mui/system";
import {
    Button, Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Pagination, Paper, Rating,
    Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Tabs, TextareaAutosize,
    TextField
} from "@mui/material";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../store/context";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useSearchParams} from "react-router-dom";
import Grid from "@mui/material/Grid";

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
    const [page, setPage] = React.useState(1);
    const [pageReview, setPageReview] = React.useState(1);
    const [count, setCount] = React.useState(1);
    const [countReview, setCountReview] = React.useState(1);
    const [marks, setMarks] = React.useState([]);

    let [oldPassC, setOldPassC] = React.useState('');
    let [newPassC, setNewPassC] = React.useState('');

    const [orders, setOrders] = React.useState([]);

    const getBookCount = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.response;

                obj = JSON.parse(json);
                setCountReview(Math.ceil(obj / 2));

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getReviewsForUserCount`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken]);

    useEffect(() => {
        getBookCount();
    }, [getBookCount]);

    const getMarks = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.response;

                obj = JSON.parse(json);
                setMarks(obj)

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getReviewsForUser?page=${pageReview}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken, pageReview]);

    useEffect(() => {
        if(value === 2)
            getMarks();
    }, [getMarks, value]);

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

    const getOrders = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;
                obj = JSON.parse(json);
                setOrders(obj)
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getOrdersFilterUser?page=${page}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken, page]);

    const getOrdersCount = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.responseText;
                obj = JSON.parse(json);
                setCount(Math.ceil(obj / 2));
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getOrdersFilterUserCount?page=${page}`,
            true,
            null,
            null
        );
        xhttp.setRequestHeader('Authorization', 'Bearer ' + ctx.authToken)
        xhttp.send();

    }, [ctx.authToken, page]);

    useEffect(() => {
        getOrdersCount()
    }, [getOrdersCount]);

    useEffect(() => {
        getOrders()
    }, [getOrders]);

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

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangePageReview(event, value) {
        setPageReview(value);
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

                    <Pagination count={count} page={page} onChange={handleChangePage} sx={{
                        margin: "20px",
                        alignSelf: "center"
                    }}/>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order Number</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Total Price(zł)</TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((row) => (
                                    <Row key={row.name} row={row}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Stack spacing={2}>
                        <Pagination count={countReview} page={pageReview} onChange={handleChangePageReview} sx={{
                            margin: "20px",
                            alignSelf: "center"
                        }}/>
                    </Stack>
                    {marks.map((review) => {
                        const {description, mark, user} = review;
                        return (
                            <Grid item>
                                <Paper
                                    sx={{
                                        p: 1,
                                        margin: 4,
                                        gridTemplateRows: "1fr auto",
                                        gridGap: "8px",
                                        height: "100%",
                                        flexGrow: 1,
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item container>
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="a"
                                                sx={{
                                                    color: 'inherit',
                                                    textDecoration: 'none',
                                                }}>
                                                {user.login}
                                            </Typography>
                                        </Grid>
                                        <Grid item container>
                                            <Typography variant="body2" gutterBottom>
                                                {description}
                                            </Typography>
                                        </Grid>
                                        <Grid item container>
                                            <Typography variant="body2" gutterBottom>
                                                Mark: {mark}/10
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        );
                    })}
                </TabPanel>
            </Box>
        </div>
    );
}
function Row(props) {
    const {row} = props;
    const [open, setOpen] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [bookHeaderId, setBookHeaderId] = useState('')
    const [value, setValue] = React.useState(2);
    const [description, setDescription] = useState('')

    const ctx = useContext(Context);

    const addReview = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/bookstore/reviewBook', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                },
                body: JSON.stringify({
                    bookHeaderId: data.bookHeaderId,
                    mark: data.mark,
                    description: data.description
                }),
            });
            const resp = await response.json();
            if (response.ok) {

            }
        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    const getReview = async (data) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookstore/getReviewsForBookAndUser?bookHeaderId=${data}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + ctx.authToken
                }
            });
            const resp = await response.json();
            if (response.ok) {
                if(!resp){
                    setOpenReview(true)
                    setBookHeaderId(data)
                }
            }
        } catch (e) {
            // showErrorAlert("Nie można było uzyskać połączenia z serwerem.");
        }
    };

    function handleCreateReview(bookHeaderId) {
        getReview(bookHeaderId)
    }

    const handleCloseReview = () => {
        setValue(2)
        setBookHeaderId('')
        setDescription('')
        setOpenReview(false);
    };

    function handleConfirmReview() {
        addReview({bookHeaderId: bookHeaderId, mark: value, description: description})
        setValue(2)
        setBookHeaderId('')
        setDescription('')
        setOpenReview(false);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }


    return (
        <React.Fragment>

            <Dialog open={openReview} onClose={handleCloseReview}>
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        max={10}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />

                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Description"
                        onChange={handleDescriptionChange}
                        style={{
                            width: 400,
                            maxWidth: 400,
                            margin: 25,

                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReview}>Cancel</Button>
                    <Button onClick={handleConfirmReview}>Apply</Button>
                </DialogActions>
            </Dialog>

            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell component="th" scope="row">
                    {row.orderId}
                </TableCell>
                <TableCell align="right">{row.orderStatus.description}</TableCell>
                <TableCell align="right">{row.orderDate}</TableCell>
                <TableCell align="right">{row.totalPrice}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Order Items
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Book Title</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell align="right">Price(zł)</TableCell>
                                        <TableCell/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.orderItems.map((item) => (
                                        <TableRow key={item.itemId}>
                                            <TableCell component="th" scope="row">
                                                {item.bookHeader.bookTitle}
                                            </TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell align="right">{item.price}</TableCell>
                                            <TableCell align="right">
                                                <Button onClick={() => handleCreateReview(item.bookHeader.bookHeaderId)}>Add Review</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        orderId: PropTypes.number.isRequired,
        orderStatus: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.string.isRequired,
            }),
        ).isRequired,
        orderDate: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        orderItems: PropTypes.arrayOf(
            PropTypes.shape({
                itemId: PropTypes.number.isRequired,
                bookHeader:PropTypes.arrayOf(
                    PropTypes.shape({
                        bookTitle: PropTypes.string.isRequired,
                    }),
                ).isRequired,
                quantity: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
            }),
        ).isRequired
    }).isRequired
}