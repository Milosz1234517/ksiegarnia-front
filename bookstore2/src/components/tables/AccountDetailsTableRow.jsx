import {TableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";


export default function AccountDetailsTableRow({text, value}){

    return(
        <TableRow
            key={0}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}>

            <TableCell align="left">
                <Typography variant="h5">
                    {text}
                </Typography>
            </TableCell>

            <TableCell align="left">
                <Typography variant="h5">
                    {value}
                </Typography>
            </TableCell>

        </TableRow>
    )
}