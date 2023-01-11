import * as React from "react";
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {useWindowResize} from "../other/WindowResizer";

const Img = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
});

const scale = 0.6

export default function BookDetailsPhoto({icon}) {

    const size = useWindowResize()

    const BoxStyle = {
        height: size[0] > size[1] ? size[0] * scale : size[1] * scale,
        width: size[0] > size[1] ? size[1] * scale : size[0] * scale,
        maxHeight: window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight,
        maxWidth: window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth,
        alignItems: "center",
        justifyContent: "center"
    }

    return (
        <Grid container
              sx={BoxStyle}>
            <Img alt="complex"
                 src={icon}/>
        </Grid>
    );
}