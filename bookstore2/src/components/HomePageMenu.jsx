import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {ShoppingBasket} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import Context from "../context/context";
import {Button, ButtonBase} from "@mui/material";
import {styled} from "@mui/material/styles";
import LogoutIcon from '@mui/icons-material/Logout';
import {useWindowResize} from "./WindowResizer";
import Grid from "@mui/material/Grid";


export default function HomePageMenu() {

    const navigate = useNavigate();

    const ctx = useContext(Context);

    const handleProfileOpen = () => {
        navigate("/profile")
    };

    const handleBasketOpen = () => {
        navigate("/basket")
    };

    const handleLoginOpen = () => {
        navigate("/login")
    };

    const handleRegisterOpen = () => {
        navigate("/register")
    };

    function handleLogoutOpen() {
        ctx.logout()
    }

    const size = useWindowResize()

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        alignSelf: "center",
    });

    const StyledButton = styled(Button)(() => ({
        display: "inline-block",
        color: "white",
        margin: 10,
        backgroundColor: "#000000"
    }));

    const StyledLogo = styled(Typography)(() => ({
        color: 'white',
        textDecoration: 'none',
        minWidth: 60,
        flexGrow: 2
    }));

    const StyledAppBar = {
        backgroundColor: "#81c784"
    }

    const StyledToolBar = styled(Toolbar)(() => ({
        flexDirection:"column"
    }));

    const StyledButtonBase = {
        display: "inline-block",
        scale: "90%",
        width: size[0] * 0.4,
        height: size[1] * 0.15,
        overflow: "auto"
    }

    const StyledIconButton = {
        margin: 1
    }

    return (
        <AppBar position="static" sx={StyledAppBar}>

            <StyledToolBar>
                <StyledLogo
                    variant="h4"
                    noWrap
                    component="a"
                    href="/">
                    <Grid item>
                        <ButtonBase
                            sx={StyledButtonBase}>
                            <Img alt="complex"
                                 src={"https://i.imgur.com/XaC69PJ.png"}/>
                        </ButtonBase>
                    </Grid>
                </StyledLogo>
            </StyledToolBar>

            <StyledToolBar sx={{marginTop: 5}}>
                {!ctx.isLoggedIn && (
                    <Box>

                        <StyledButton
                            onClick={handleLoginOpen}
                            size="small"
                            variant="contained">
                            Login
                        </StyledButton>

                        <StyledButton
                            onClick={handleRegisterOpen}
                            size="small"
                            variant="contained">
                            Register
                        </StyledButton>

                    </Box>
                )}

                {ctx.isLoggedIn && (
                    <Box>
                        <IconButton
                            sx={StyledIconButton}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleProfileOpen}
                            color="inherit">
                            <AccountCircle/>
                        </IconButton>

                        <IconButton
                            sx={StyledIconButton}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleBasketOpen}
                            color="inherit">
                            <ShoppingBasket/>
                        </IconButton>

                        <IconButton
                            sx={StyledIconButton}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleLogoutOpen}
                            color="inherit">
                            <LogoutIcon/>
                        </IconButton>
                    </Box>
                )}
            </StyledToolBar>

        </AppBar>

    );
}