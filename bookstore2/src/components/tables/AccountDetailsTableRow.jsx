import {TableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {TableRowStyle} from "../../App";


export default function AccountDetailsTableRow({text, value}){

    return(
        <TableRow
            key={0}
            sx={TableRowStyle}>

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