import {Typography} from "@mui/material";
import * as React from "react";

export default function BookParameters({book}) {

    return (
        <div>
            <Typography sx={{margin: 2}} variant="h5">
                Authors: {book.bookAuthors?.map((author) => {
                return (
                    <Typography key={author.authorId} variant="body2"
                                color="text.secondary"
                                align={"left"}>
                        {author.name} {author.surname}
                    </Typography>)
            })}
            </Typography>

            <Typography sx={{margin: 2}} variant="h5">
                Publishing-house:
                <Typography variant="body2"
                            color="text.secondary"
                            align={"left"}>
                    {book.publishingHouse?.name}
                </Typography>
            </Typography>

            <Typography sx={{margin: 2}} variant="h5">
                Quantity:
                <Typography variant="body2"
                            color="text.secondary"
                            align={"left"}>
                    {book.quantity}
                </Typography>
            </Typography>

            <Typography sx={{margin: 2}} variant="h5">
                Price:
                <Typography variant="body2"
                            color="text.secondary"
                            align={"left"}>
                    {book.price} zł
                </Typography>
            </Typography>
        </div>
    );
}