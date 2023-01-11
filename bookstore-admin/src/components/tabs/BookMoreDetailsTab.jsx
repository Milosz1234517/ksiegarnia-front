import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import TabPanel from "./TabPanel";
import BookParameters from "../book/BookParameters";

const BoxStyle = {
    overflow: "auto",
    backgroundColor: "white"
}

const TypographyStyle = {
    margin: 2
}

const GridStyle = {
    flexDirection:"column",
    alignContent:"center"
}

export default function BookMoreDetailsTab({value, book}) {

    return (
        <Box sx={BoxStyle}>
            <TabPanel sx={BoxStyle} value={value} index={1}>
                <Grid container item sx={GridStyle}>
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
                            <Typography key={cat.categoryId} variant="body2"
                                        color="text.secondary"
                                        align={"left"}>
                                {cat.description}
                            </Typography>
                        )
                    })}
                    </Typography>
                </Grid>
            </TabPanel>
        </Box>
    )
}