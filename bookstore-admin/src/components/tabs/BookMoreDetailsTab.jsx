import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import * as React from "react";
import TabPanel from "./TabPanel";
import BookParameters from "../book/BookParameters";
import {useWindowResize} from "../other/WindowResizer";


export default function BookMoreDetailsTab({value, book}){
    const size = useWindowResize()

    return(
        <TabPanel value={value} index={1}>
            <Box sx={{overflow: "auto", maxWidth: size[0]}}>

                <BookParameters book={book}/>

                <Typography sx={{margin: 2}} Typography variant="h5">
                    Release Date:
                    <Typography Typography variant="body2"
                                color="text.secondary"
                                align={"left"}>
                        {book.releaseDate}
                    </Typography>
                </Typography>

                <Typography sx={{margin: 2}} Typography variant="h5">
                    Edition:
                    <Typography Typography variant="body2"
                                color="text.secondary"
                                align={"left"}>
                        {book.edition}
                    </Typography>
                </Typography>

                <Typography sx={{margin: 2}} Typography variant="h5">
                    Categories: {book.bookCategories.map((cat) => {
                    return (
                        <Typography Typography variant="body2"
                                    color="text.secondary"
                                    align={"left"}>
                            {cat.description}
                        </Typography>
                    )
                })}
                </Typography>
            </Box>

        </TabPanel>
    );
}