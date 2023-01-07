import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {ShoppingBasket} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import Context from "../../store/context";
import {Avatar, Button, ButtonBase, MenuItem, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {useWindowResize} from "./WindowResizer";
import Grid from "@mui/material/Grid";
import {Menu, Tooltip} from "@mui/joy";

const StyledMenuBox = styled(Box)(() => ({
    display: "grid",

}));

const StyledRegisterButton = styled(Button)(() => ({
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

    return (
        <AppBar position="static" sx={{backgroundColor: "#81c784"}}>
            <Toolbar sx={{flexDirection:"column"}}>

                <StyledLogo
                    variant="h4"
                    noWrap
                    component="a"
                    href="/">
                    <Grid item>
                        <ButtonBase
                            sx={{
                                display: "inline-block",
                                scale: "90%",
                                width: size[0] * 0.4,
                                height: size[1] * 0.15,
                                overflow: "auto"
                            }}>
                            <Img alt="complex"
                                 src={"https://i.imgur.com/XaC69PJ.png"}/>
                        </ButtonBase>
                    </Grid>
                </StyledLogo>

            </Toolbar>
            <Toolbar sx={{flexDirection:"column", marginTop: 5}}>

                {!ctx.isLoggedIn && (
                    <Box>

                        <StyledRegisterButton
                            onClick={handleLoginOpen}
                            size="small"
                            variant="contained">
                            Login
                        </StyledRegisterButton>

                        <StyledRegisterButton
                            onClick={handleRegisterOpen}
                            size="small"
                            variant="contained">
                            Register
                        </StyledRegisterButton>

                    </Box>
                )}

                {ctx.isLoggedIn && (
                    <Box>
                        <IconButton
                            sx={{margin: 1}}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleProfileOpen}
                            color="inherit">
                            <AccountCircle/>
                        </IconButton>

                        <IconButton
                            sx={{margin: 1}}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleBasketOpen}
                            color="inherit">
                            <ShoppingBasket/>
                        </IconButton>

                        <IconButton
                            sx={{margin: 1}}
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

            </Toolbar>
        </AppBar>

    );
}