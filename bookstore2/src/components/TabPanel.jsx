import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import * as React from "react";

export default function TabPanel(props) {
    const {children, value, index, ...other} = props;

    const BoxStyle = {
        p: 3
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={BoxStyle}>
                    <Typography component={"span"}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}