import * as React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/system";
import {useWindowResize} from "../WindowResizer";
import Grid from "@mui/material/Grid";

const Img = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
});

const sizes = [document.innerWidth * 0.6, document.innerHeight * 0.6]

export default function BookDetailsPhoto({icon}) {

    const size = useWindowResize()

    const BoxStyle = {
        height: size[0] > size[1] ? size[0] * 0.6 : size[1] * 0.6,
        width: size[0] > size[1] ? size[1] * 0.6 : size[0] * 0.6,
        maxWidth: sizes[0] > sizes[1] ? sizes[1] : sizes[0],
        maxHeight: sizes[0] > sizes[1] ? sizes[0] : sizes[1],
        alignItems: "center"
    }

    return (
        <Grid container
            sx={BoxStyle}>
            <Img alt="complex"
                 src={icon}/>
        </Grid>
    );
}