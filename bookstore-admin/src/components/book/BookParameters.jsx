import {Typography} from "@mui/material";
import * as React from "react";

export default function BookParameters({book}) {

    return (
        <div>

            <Typography sx={{margin: 2}} variant="h5">
                Publishing-house:
                <Typography Typography variant="body2"
                            color="text.secondary"
                            align={"left"}>
                    {book.publishingHouse?.name}
                </Typography>
            </Typography>

            <Typography sx={{margin: 2}} variant="h5">
                Quantity:
                <Typography Typography variant="body2"
                            color="text.secondary"
                            align={"left"}>
                    {book.quantity}
                </Typography>
            </Typography>

            <Typography sx={{margin: 2}} variant="h5">
                Price:
                <Typography Typography variant="body2"
                            color="text.secondary"
                            align={"left"}>
                    {book.price} zł
                </Typography>
            </Typography>
        </div>
    );
}