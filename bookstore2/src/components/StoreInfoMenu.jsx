import * as React from 'react';
import {BottomNavigation, BottomNavigationAction, ButtonBase} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/system";
import CopyrightIcon from "@mui/icons-material/Copyright";


export default function StoreInfoMenu() {

    const navigate = useNavigate()

    return (
        <Box sx={{backgroundColor: "gray"}} elevation={3}>
            <BottomNavigation showLabels>
                <BottomNavigationAction label="About Us" onClick={()=>{
                    navigate("/about")
                }}/>
                <BottomNavigationAction label="Contact Us" onClick={()=>{
                    navigate("/contact")
                }}/>
                <BottomNavigationAction label="Policies" onClick={()=>{
                    navigate("/policies")
                }}/>
            </BottomNavigation>
            <BottomNavigation>
                <BottomNavigationAction showLabel label={"BookStore"} icon={<CopyrightIcon/>}/>
            </BottomNavigation>
        </Box>
    );
}