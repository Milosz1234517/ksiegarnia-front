import {LockOutlined} from "@mui/icons-material";
import {
    Avatar,
    Button, ButtonBase,
    Container,
    CssBaseline, FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import {Box} from "@mui/system";
import {useContext, useState} from "react";
import {ContainerStyle} from "../App";
import Context from "../context/context";
import HomePageMenu from "../components/HomePageMenu";
import {config} from "../config";
import Checkbox from '@mui/material/Checkbox';
import {useNavigate} from "react-router-dom";


const Register = () => {
    const ctx = useContext(Context);
    const [phoneDigits, setPhoneDigits] = useState(9)
    const [change, setChange] = useState(false)
    const navigate = useNavigate()

    const register = async (data) => {
        const url = `${config.serverAddress}/api/auth/register`;
        try {
            ctx.setIsLoading(true);
            const response = await fetch(`${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    password: data.password,
                    phone: data.phone,
                    sname: data.sname,
                    username: data.username,
                }),
            });
            const resp = await response.json();
            console.log(response)
            if (response.ok) {
                navigate("/login");
            } else {
                ctx.showErrorAlert("Registration problems: " + resp.message);
            }
        } catch (e) {
            ctx.showErrorAlert("Connection lost");
        }
        ctx.setIsLoading(false);
    }

    function onChangePhone(event) {
        setPhoneDigits(9 - event.target.value.length)
    }

    const onSubmit = (event) => {
        event.preventDefault(true);

        if (change === true) {

            register(
                {
                    username: event.target[0].value,
                    password: event.target[2].value,
                    name: event.target[4].value,
                    sname: event.target[6].value,
                    phone: event.target[8].value,
                },
            ).then(() => {
            });
        } else {
            ctx.showErrorAlert("You must accept Store Policies")
        }
    };

    function handleChange() {
        setChange(!change)
    }

    const BoxStyle = {
        display: "flex",
        alignItems: "right",
        textAlign: "center",
    }

    const AvatarStyle = {
        m: 1,
        color: "primary.main"
    }

    const ButtonStyle = {
        mt: 3,
        mb: 2
    }

    return (
        <Box>
            <HomePageMenu/>

            <CssBaseline/>

            <Container
                component="main"
                maxWidth="xs"
                sx={ContainerStyle}>

                <Box
                    sx={BoxStyle}>

                    <Avatar sx={AvatarStyle}>
                        <LockOutlined/>
                    </Avatar>

                    <Typography component="h1" variant="h4" alignSelf="center">
                        Register
                    </Typography>

                </Box>

                <Box
                    component="form"
                    sx={{mt: 1}}
                    onSubmit={onSubmit}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus/>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        helperText={"Password must contain at least one digit [0-9], one lowercase Latin character [a-z], one uppercase Latin character [A-Z], one special character like ! @ # & ( ), length of at least 8 characters and a maximum of 20 characters"}
                        id="password"
                        autoComplete="current-password"/>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        helperText={"Max length: 15"}
                        autoComplete="name"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="surname"
                        label="Surname"
                        id="surname"
                        helperText={"Max length: 15"}
                        autoComplete="surname"/>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="Phone"
                        id="phone"
                        onChange={onChangePhone}
                        helperText={phoneDigits > 0 ? "Digits left: " + phoneDigits : ''}
                        autoComplete="phone"/>

                    <FormControlLabel
                        label={""}
                        control={
                            <Box sx={BoxStyle}>
                                <Checkbox checked={change} onChange={handleChange}/>
                                <Typography m={1}>
                                    I accept the terms of the
                                </Typography>
                                <ButtonBase onClick={() => {navigate("/policies")}}>
                                    Store Policies
                                </ButtonBase>
                            </Box>
                        }/>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={ButtonStyle}>
                        Register
                    </Button>

                </Box>
            </Container>
        </Box>
    );
};

export default Register;