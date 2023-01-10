import {Typography} from "@mui/material";
import * as React from "react";
import {Box} from "@mui/system";
import {config} from "../../config";

const TypographyStyle = {
    margin: 2
}

export default function BookParameters({book}) {



    return (
        <Box>
            <Typography sx={TypographyStyle} variant="h5">
                Authors: {book.bookAuthors?.map((author) => {
                return (
                    <Typography key={author.authorId} variant="body2"
                                color="text.secondary"
                                align={"left"}>
                        {author.name} {author.surname}
                    </Typography>)
            })}
            </Typography>

            <Typography sx={TypographyStyle} variant="h5">
                Publishing-house:
                <Typography variant="body2"
                            color="text.secondary"
                            align={"left"}>
                    {book.publishingHouse?.name}
                </Typography>
            </Typography>

            <Typography sx={TypographyStyle} variant="h5">
                Quantity:
                <Typography variant="body2"
                            color="text.secondary"
                            align={"left"}>
                    {book.quantity}
                </Typography>
            </Typography>

            <Typography sx={TypographyStyle} variant="h5">
                Price:
                <Typography variant="body2"
                            color="text.secondary"
                            align={"left"}>
                    {book.price}{config.currency}
                </Typography>
            </Typography>
        </Box>
    );
}