import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import * as React from "react";
import TabPanel from "./TabPanel";
import {useWindowResize} from "./WindowResizer";


export default function BookDescriptionTab({value, book}){
    const size = useWindowResize()

    return(
        <TabPanel value={value} index={0}>
            <Box sx={{overflow: "auto", maxWidth: size[0], marginBottom: 10}}>
                <Typography variant="body2"
                            color="text.secondary"
                            align={"left"}>
                    {book.description}
                </Typography>
            </Box>
        </TabPanel>
    );
}