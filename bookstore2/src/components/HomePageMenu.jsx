import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {ShoppingBasket} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import Context from "../store/context";
import {Autocomplete, Button, TextField} from "@mui/material";
import {Stack} from "@mui/system";

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
        ctx.logout().then(() => navigate("/"));
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Book Store
                    </Typography>

                    <Box sx={{flexGrow: 1}} flexGrow={true}/>

                    {!ctx.isLoggedIn && (
                        <div>
                            <Button
                                color="primary"
                                onClick={handleLoginOpen}
                                variant="contained"
                            >
                                Log in
                            </Button>

                            <Button
                                color="primary"
                                onClick={handleRegisterOpen}
                                variant="contained"
                            >
                                Register
                            </Button>
                        </div>
                    )}

                    {ctx.isLoggedIn && (
                        <div>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={handleProfileOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={handleBasketOpen}
                                color="inherit"
                            >
                                <ShoppingBasket/>
                            </IconButton>

                            <Button
                                color="primary"
                                onClick={handleLogoutOpen}
                                variant="contained"
                            >
                                Logout
                            </Button>

                        </div>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    );
}