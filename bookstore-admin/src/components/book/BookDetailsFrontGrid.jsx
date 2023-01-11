import Grid from "@mui/material/Grid";
import BookDetailsPhoto from "./BookDetailsPhoto";
import {Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Box} from "@mui/system";
import * as React from "react";

const BoxStyle = {
    display: "grid",
    marginTop: 15
}

const TypographyStyle = {
    margin: 2,
    marginTop: 4
}

export default function BookDetailsFrontGrid({book, authors, categories, handleDeleteAuthor, handleDeleteCategory}){

    return(
        <Box sx={BoxStyle}>

            <Grid container sx={{alignItems: "center", justifyContent: "space-around"}} spacing={2}>

                <BookDetailsPhoto icon={book.icon}/>

                <Grid item>

                    <Typography sx={TypographyStyle} variant="h2">
                        {book.bookTitle}
                    </Typography>

                    <Typography sx={{margin: 2}} variant="h5">
                        Authors:
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableBody>
                                    {authors?.map((author) => (
                                        <TableRow key={author.authorId}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                                            <TableCell align="left">
                                                <Typography variant="body2"
                                                            color="text.secondary"
                                                            align={"left"}>
                                                    {author.name} {author.surname}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="left">
                                                <IconButton onClick={() => handleDeleteAuthor(author)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Typography>

                    <Typography sx={{margin: 2}} variant="h5">
                        Categories:
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableBody>
                                    {categories?.map((cat) => (
                                        <TableRow key={cat.categoryId}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                                            <TableCell align="left">
                                                <Typography variant="body2"
                                                            color="text.secondary"
                                                            align={"left"}>
                                                    {cat.description}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="left">
                                                <IconButton onClick={() => handleDeleteCategory(cat)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Typography>

                </Grid>
            </Grid>

        </Box>
    )
}