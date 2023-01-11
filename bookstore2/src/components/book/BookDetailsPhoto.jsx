import * as React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/system";
import {useWindowResize} from "../WindowResizer";
import Grid from "@mui/material/Grid";

const Img = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
});

const scale = 0.6
const sizes = [document.innerWidth * scale, document.innerHeight * scale]

export default function BookDetailsPhoto({icon}) {

    const size = useWindowResize()

    const BoxStyle = {
        height: size[0] > size[1] ? size[0] * scale : size[1] * scale,
        width: size[0] > size[1] ? size[1] * scale : size[0] * scale,
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