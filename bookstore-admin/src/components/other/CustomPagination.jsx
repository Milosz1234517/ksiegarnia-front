import {Stack} from "@mui/system";
import {Pagination, Typography} from "@mui/material";
import * as React from "react";

const StackStyle = {
    marginBottom: 2
}

const PaginationStyle = {
    margin: 3,
    alignSelf: "center"
}

const TypographyStyle = {
    alignSelf: "center"
}

export default function CustomPagination({maxPage, page, handleChange}){

    return(
        <Stack spacing={2} sx={StackStyle}>
            <Pagination count={maxPage} page={page} onChange={handleChange} sx={PaginationStyle}/>
            <Typography sx={TypographyStyle}>
                Page: {page}
            </Typography>
        </Stack>
    )
}