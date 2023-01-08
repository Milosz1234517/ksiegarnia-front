import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import * as React from "react";
import TabPanel from "./TabPanel";
import BookParameters from "../book/BookParameters";
import {useWindowResize} from "../other/WindowResizer";


export default function BookMoreDetailsTab({value, book}){
    const size = useWindowResize()

    const BoxStyle = {
        overflow: "auto",
        maxWidth: size[0]
    }

    const TypographyStyle = {
        margin: 2
    }

    return(

        <TabPanel value={value} index={1}>
            <Box sx={BoxStyle}>

                <BookParameters book={book}/>

                <Typography sx={TypographyStyle} variant="h5">
                    Release Date:
                    <Typography variant="body2"
                                color="text.secondary"
                                align={"left"}>
                        {book.releaseDate}
                    </Typography>
                </Typography>

                <Typography sx={TypographyStyle} variant="h5">
                    Edition:
                    <Typography variant="body2"
                                color="text.secondary"
                                align={"left"}>
                        {book.edition}
                    </Typography>
                </Typography>

                <Typography sx={TypographyStyle} variant="h5">
                    Categories: {book.bookCategories?.map((cat) => {
                    return (
                        <Typography key = {cat.categoryId} variant="body2"
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