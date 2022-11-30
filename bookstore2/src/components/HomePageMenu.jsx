import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {ShoppingBasket} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import Context from "../store/context";
import {Button} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledMenuBox = styled(Box)(() => ({
    display: "grid",

}));

const StyledLoginButton = styled(Button)(() => ({
    display: "inline-block",
}));

const StyledRegisterButton = styled(Button)(() => ({
    display: "inline-block"
}));

const StyledLogo = styled(Typography)(() => ({
    color: 'inherit',
    textDecoration: 'none',
    minWidth: 110,
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
        ctx.logout().then(() => navigate("/"));
    }

    return (
        <StyledMenuBox>
            <AppBar position="static">
                <Toolbar>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer">
                        <MenuIcon/>
                    </IconButton>

                    <StyledLogo
                        variant="h6"
                        noWrap
                        component="a"
                        href="/">
                        Book Store
                    </StyledLogo>

                    {!ctx.isLoggedIn && (
                        <Box>

                            <StyledLoginButton
                                color="primary"
                                onClick={handleLoginOpen}
                                variant="contained">
                                Login
                            </StyledLoginButton>

                            <StyledRegisterButton
                                color="primary"
                                onClick={handleRegisterOpen}
                                variant="contained">
                                Register
                            </StyledRegisterButton>

                        </Box>
                    )}

                    {ctx.isLoggedIn && (
                        <Box>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={handleProfileOpen}
                                color="inherit">
                                <AccountCircle/>
                            </IconButton>

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={handleBasketOpen}
                                color="inherit">
                                <ShoppingBasket/>
                            </IconButton>

                            <Button
                                color="primary"
                                onClick={handleLogoutOpen}
                                variant="contained">
                                Logout
                            </Button>
                        </Box>
                    )}

                </Toolbar>
            </AppBar>
        </StyledMenuBox>
    );
}