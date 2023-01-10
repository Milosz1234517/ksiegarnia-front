import * as React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/system";

const Img = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
});

const BoxStyle = {
    scale: "90%",
    maxWidth: 700,
    maxHeight: 1200,
    overflow: "auto"
}

export default function BookDetailsPhoto({icon}) {

    return (
        <Box
            sx={BoxStyle}>
            <Img alt="complex"
                 src={icon}/>
        </Box>
    );
}