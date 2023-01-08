import {Stack} from "@mui/system";
import {Pagination, Typography} from "@mui/material";
import * as React from "react";

export default function CustomPagination({maxPage, page, handleChange}){

    const StackStyle = {
        marginBottom: 2
    }

    const PaginationStyle = {
        margin: "20px",
        alignSelf: "center"
    }

    const TypographyStyle = {
        alignSelf: "center"
    }

    return(
        <Stack spacing={2} sx={StackStyle}>
            <Pagination count={maxPage} page={page} onChange={handleChange} sx={PaginationStyle}/>
            <Typography sx={TypographyStyle}>
                Page: {page}
            </Typography>
        </Stack>
    )
}