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
import Context from "../../store/context";
import {Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledMenuBox = styled(Box)(() => ({
    display: "grid",

}));

const StyledRegisterButton = styled(Button)(() => ({
    display: "inline-block",
    color: "black",
    backgroundColor: "yellow"
}));

const StyledLogo = styled(Typography)(() => ({
    color: 'yellow',
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

    return (
        <StyledMenuBox>
            <AppBar position="static">
                <Toolbar>

                    <StyledLogo
                        variant="h6"
                        noWrap
                        component="a"
                        href="/">
                        Books
                    </StyledLogo>

                    {!ctx.isLoggedIn && (
                        <Box>

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={handleLoginOpen}
                                color="inherit">
                                <LoginIcon/>
                            </IconButton>

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

                            <IconButton
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
        </StyledMenuBox>
    );
}