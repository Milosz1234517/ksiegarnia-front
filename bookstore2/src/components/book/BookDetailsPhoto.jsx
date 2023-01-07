import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/system";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    alignSelf: "center",
});

export default function BookDetailsPhoto({icon, size}){
    return(
        <Grid item>
            <Box
                sx={{
                    display: "inline-block",
                    scale: "90%",
                    width: size[0],
                    height: size[1],
                    maxWidth: 700,
                    maxHeight: 700,
                    overflow:"auto"
                }}>
                <Img alt="complex"
                     src={icon}/>
            </Box>
        </Grid>
    );
}