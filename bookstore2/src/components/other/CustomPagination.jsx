import {Stack} from "@mui/system";
import {Pagination, Typography} from "@mui/material";
import * as React from "react";

export default function CustomPagination({maxPage, page, handleChange}){

    return(
        <Stack spacing={2} sx={{
            marginBottom: 2
        }}>
            <Pagination count={maxPage} page={page} onChange={handleChange} sx={{
                margin: "20px",
                alignSelf: "center"
            }}/>
            <Typography sx={{
                alignSelf: "center"
            }}>
                Page: {page}
            </Typography>
        </Stack>
    )
}