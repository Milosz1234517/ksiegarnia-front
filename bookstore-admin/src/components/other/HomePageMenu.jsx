import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {ButtonBase} from "@mui/material";
import {styled} from "@mui/material/styles";
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from "@mui/material/Grid";
import {useWindowResize} from "./WindowResizer";
import Context from "../../store/context";
import {config} from "../../config";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const StyledAppBar = {
    backgroundColor: "#81c784"
}

const StyledToolBar = styled(Toolbar)(() => ({
    flexDirection:"column"
}));

const StyledIconButton = {
    margin: 1
}

export default function HomePageMenu() {

    const navigate = useNavigate();
    const size = useWindowResize()
    const ctx = useContext(Context);

    const StyledButtonBase = {
        height: size[0] < size[1] ? size[0] * config.logoY : size[1] * config.logoY,
        width: size[0] < size[1] ? size[1] * config.logoX : size[0] * config.logoX,
        maxHeight: window.innerHeight,
        maxWidth: window.innerWidth
    }

    const handleProfileOpen = () => {
        navigate("/profile")
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

            <StyledToolBar sx={{marginTop: 1}}>

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