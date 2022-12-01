import {ButtonBase} from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from "@mui/material/styles";

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
            <ButtonBase
                sx={{
                    display: "inline-block",
                    scale: "90%",
                    width: size[0],
                    height: size[1],
                    maxWidth: 700,
                    maxHeight: 700
                }}>
                <Img alt="complex"
                     src={icon}/>
            </ButtonBase>
        </Grid>
    );
}