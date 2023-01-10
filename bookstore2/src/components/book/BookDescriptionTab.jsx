import {Box} from "@mui/system";
import {TextField} from "@mui/material";
import * as React from "react";
import TabPanel from "../TabPanel";

const TextFieldStyle = {
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000",
    },
    width: "100%",
    backgroundColor: "white"
}

const BoxStyle = {
    overflow: "auto",
    marginBottom: 10
}

export default function BookDescriptionTab({value, book}) {

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