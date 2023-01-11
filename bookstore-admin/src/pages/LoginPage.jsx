import {LockOutlined} from "@mui/icons-material";
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
} from "@mui/material";
import {Box} from "@mui/system";
import {useContext} from "react";
import Context from "../store/context";
import * as React from "react";
import HomePageMenu from "../components/other/HomePageMenu";
import {ContainerStyle} from "../App";

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

const Login = () => {
    const ctx = useContext(Context);

    const onSubmit = (event) => {
        event.preventDefault(true);

        ctx.login(
            {
                username: event.target[0].value,
                password: event.target[2].value,
            },
        ).then(() => {});
    };

    return (
        <Box sx={{backgroundColor: "white"}}>
            <HomePageMenu/>

            <Container
                component="main"
                maxWidth="xs"
                sx={ContainerStyle}>

                <CssBaseline/>

                <Box
                    sx={BoxStyle}>

                    <Avatar sx={AvatarStyle}>
                        <LockOutlined/>
                    </Avatar>

                    <Typography component="h1" variant="h4" alignSelf="center">
                        Login
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
                        id="password"
                        autoComplete="current-password"/>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={ButtonStyle}>
                        Sign in
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
