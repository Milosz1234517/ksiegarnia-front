import Typography from "@mui/material/Typography";
import {Box} from "@mui/system";
import * as React from "react";

export default function PageTitle({title}){

    const BoxStyle = {
        display: "grid"
    }

    const TypographyStyle = {
        margin: 4,
    }

    return(
        <Box sx={BoxStyle}>
            <Typography variant="h2"
                        component="a"
                        sx={TypographyStyle}>
                {title}
            </Typography>
        </Box>
    );
}