import { LockOutlined } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
} from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import { useContext } from "react";
import { theme } from "../App";
import Context from "../store/context";
import HomePageMenu from "../components/other/HomePageMenu";


const Register = () => {
    const ctx = useContext(Context);

    const onSubmit = (event) => {
        event.preventDefault(true);

        ctx.register(
            {
                username: event.target[0].value,
                password: event.target[2].value,
                name: event.target[4].value,
                sname: event.target[6].value,
                phone: event.target[8].value,
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
                    height: "100vh",
                }}>

                <CssBaseline />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "right",
                        textAlign: "center",
                    }}>

                    <Avatar sx={{ m: 1, color: "primary.main" }}>
                        <LockOutlined />
                    </Avatar>

                    <Typography component="h1" variant="h4" alignSelf="center">
                        Register
                    </Typography>

                </Box>

                <Box
                    component="form"
                    sx={{ mt: 1 }}
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

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="surname"
                        label="Surname"
                        id="surname"
                        autoComplete="surname"/>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="Phone"
                        id="phone"
                        autoComplete="phone"/>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Register
                    </Button>

                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;