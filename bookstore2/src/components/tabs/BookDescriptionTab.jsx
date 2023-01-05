import {Box} from "@mui/system";
import {TextField, Typography} from "@mui/material";
import * as React from "react";
import TabPanel from "./TabPanel";
import {useWindowResize} from "../other/WindowResizer";

export default function BookDescriptionTab({value, book}){
    const size = useWindowResize()

    return(
        <TabPanel value={value} index={0}>
            <Box sx={{overflow: "auto", maxWidth: size[0], marginBottom: 10}}>
                <TextField
                    sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                        },
                        width: size[0]*0.8, backgroundColor: "white"
                    }}
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