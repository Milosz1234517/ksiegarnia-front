import Typography from "@mui/material/Typography";
import {Box} from "@mui/system";
import * as React from "react";

export default function CartTitle({show, showEmpty}){
    return(
        <Box sx={{display: "grid"}}>
            <Typography variant="h2"
                        component="a"
                        sx={{
                            margin: 4,
                        }}>
                Basket
            </Typography>

            {(show && showEmpty) && <Typography
                gutterBottom
                variant="h4"
                component="a"
                sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    marginLeft: 4,
                }}>
                is empty!
            </Typography>}
        </Box>
    );
}