import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import Context from "../../store/context";
import {styled} from "@mui/material/styles";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledMenuBox = styled(Box)(() => ({
    display: "grid",

}));

const StyledLogo = styled(Typography)(() => ({
    color: 'inherit',
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

    const handleLoginOpen = () => {
        navigate("/login")
    };

    function handleLogoutOpen() {
        ctx.logout().then(() => navigate("/"));
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
                        Books Admin
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