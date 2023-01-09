import * as React from 'react';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/system";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function StoreInfoMenu() {

    const navigate = useNavigate()

    const MainBoxStyle = {
        backgroundColor: "gray"
    }

    const GridStyle = {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    }

    const TypographyStyle = {
        marginBottom: 3,
        marginTop: 5
    }

    return (
        <Box sx={MainBoxStyle} elevation={3}>
            <BottomNavigation showLabels>
                <BottomNavigationAction label="About Us" onClick={() => {
                    navigate("/about")
                }}/>
                <BottomNavigationAction label="Contact Us" onClick={() => {
                    navigate("/contact")
                }}/>
                <BottomNavigationAction label="Policies" onClick={() => {
                    navigate("/policies")
                }}/>
            </BottomNavigation>

            <Grid container sx={GridStyle}>
                <Typography sx={TypographyStyle}>
                    BookStore
                </Typography>
                <Typography sx={TypographyStyle}>
                    <CopyrightIcon/>
                </Typography>
            </Grid>
        </Box>
    );
}