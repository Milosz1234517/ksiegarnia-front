import {Box} from "@mui/system";
import {TextField} from "@mui/material";
import * as React from "react";
import {useWindowResize} from "../other/WindowResizer";
import TabPanel from "./TabPanel";

export default function BookDescriptionTab({value, book}) {
    const size = useWindowResize()

    const BoxStyle = {
        overflow: "auto",
        maxWidth: size[0],
        marginBottom: 10
    }

    const TextFieldStyle = {
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#000000",
        },
        width: "100%",
        backgroundColor: "white"
    }

    return (
        <TabPanel component={"span"} value={value} index={0}>
            <Box sx={BoxStyle}>
                <TextField
                    sx={TextFieldStyle}
                    multiline
                    disabled
                    id="standard-basic"
                    variant="outlined"
                    defaultValue={book.description}
                />
            </Box>
        </TabPanel>
    );
}