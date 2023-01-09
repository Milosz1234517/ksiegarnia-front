import Typography from "@mui/material/Typography";
import {Box} from "@mui/system";
import * as React from "react";

export default function PageTitle({title, center}){

    const BoxStyleCenter = {
        display: "grid",
        justifyContent: "center"
    }

    const BoxStyleLeft = {
        display: "grid",
        justifyContent: "left"
    }

    const TypographyStyle = {
        marginTop: 4,
        marginBottom: 4,
    }

    return(
        <Box sx={center ? BoxStyleCenter : BoxStyleLeft}>
            <Typography variant="h2"
                        component="a"
                        sx={TypographyStyle}>
                {title}
            </Typography>
        </Box>
    );
}