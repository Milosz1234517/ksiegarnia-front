import {LockOutlined} from "@mui/icons-material";
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import {Box, Stack, ThemeProvider} from "@mui/system";
import {useContext} from "react";
import {Link as ReactLink} from "react-router-dom";
import {theme} from "../App";
import Context from "../store/context";
import * as React from "react";
import HomePageMenu from "../components/HomePageMenu";


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
        <ThemeProvider theme={theme}>
            <HomePageMenu/>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "80vh",
                }}>

                <CssBaseline/>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "right",
                        textAlign: "center",
                    }}>

                    <Avatar sx={{m: 1, bgcolor: "primary.main"}}>
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
                        sx={{ mt: 3, mb: 2 }}>
                        Sign in
                    </Button>

                    {/*<Box sx={{p: '10px 0px'}}>*/}
                    {/*    <Typography align='right'>*/}
                    {/*        <Link*/}
                    {/*            to="/register"*/}
                    {/*            bottom={true}*/}
                    {/*            variant="body1"*/}
                    {/*            component={ReactLink}>*/}
                    {/*            {"Register"}*/}
                    {/*        </Link>*/}
                    {/*    </Typography>*/}
                    {/*</Box>*/}

                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
