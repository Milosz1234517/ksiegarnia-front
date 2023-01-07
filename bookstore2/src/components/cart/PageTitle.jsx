import Typography from "@mui/material/Typography";
import {Box} from "@mui/system";
import * as React from "react";

export default function PageTitle({title}){

    return(
        <Box sx={{display: "grid"}}>
            <Typography variant="h2"
                        component="a"
                        sx={{
                            margin: 4,
                        }}>
                {title}
            </Typography>
        </Box>
    );
}