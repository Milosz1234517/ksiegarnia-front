import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {ShoppingBasket} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import Context from "../context/context";
import {Button, ButtonBase} from "@mui/material";
import {styled} from "@mui/material/styles";
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from "@mui/material/Grid";
import {config} from "../config";
import {useWindowResize} from "./WindowResizer";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const StyledButton = {
    display: "inline-block",
    color: "white",
    margin: 1,
    width: 100,
    backgroundColor: "#000"
}

const StyledAppBar = {
    backgroundColor: "#81c784"
}

const StyledToolBar = styled(Toolbar)(() => ({
    flexDirection:"column"
}));

const StyledIconButton = {
    margin: 1
}

const StyledToolBarMain = {
    marginTop: 1
}

export default function HomePageMenu() {

    const navigate = useNavigate();
    const size = useWindowResize()
    const ctx = useContext(Context);

    const StyledButtonBase = {
        height: size[0] < size[1] ? size[0] * config.logoY : size[1] * config.logoY,
        width: size[0] < size[1] ? size[1] * config.logoX : size[0] * config.logoX,
        maxHeight: window.innerWidth < window.innerHeight ? window.innerWidth * config.logoY : window.innerHeight * config.logoY,
        maxWidth: window.innerWidth < window.innerHeight ? window.innerHeight * config.logoX: window.innerWidth * config.logoX,
    }

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
        <AppBar position="static" sx={StyledAppBar}>

            <StyledToolBar>
                    <Grid item>
                        <ButtonBase
                            onClick={()=>{
                                navigate("/")
                            }}
                            sx={StyledButtonBase}>
                            <Img alt="complex"
                                 src={config.logo}/>
                        </ButtonBase>
                    </Grid>
            </StyledToolBar>

            <StyledToolBar sx={StyledToolBarMain}>
                {!ctx.isLoggedIn && (
                    <Box>

                        <Button
                            sx={StyledButton}
                            onClick={handleLoginOpen}
                            size="small"
                            variant="contained">
                            Login
                        </Button>

                        <Button
                            sx={StyledButton}
                            onClick={handleRegisterOpen}
                            size="small"
                            variant="contained">
                            Register
                        </Button>

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