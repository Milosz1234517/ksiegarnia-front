import Grid from "@mui/material/Grid";
import {Paper, Typography} from "@mui/material";
import {Box} from "@mui/system";
import * as React from "react";
import {useWindowResize} from "./WindowResizer";


export default function ReviewBox({review, title, user}){

    const size = useWindowResize()

    return(
        <Grid item>
            <Paper
                key={review.reviewId}
                sx={{
                    p: 1,
                    margin: 4,
                    gridTemplateRows: "1fr auto",
                    gridGap: "8px",
                    height: "100%",
                    flexGrow: 1,
                }}>
                <Box sx={{overflow: "auto", maxWidth: size[0], marginBottom: 5}}>
                    <Grid container spacing={2}>
                        <Grid item container>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="a"
                                sx={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>
                                {user ? review.user.login : ""}
                            </Typography>
                        </Grid>
                        <Grid item container>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="a"
                                sx={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>
                                {title ? review.bookHeader.bookTitle : ""}
                            </Typography>
                        </Grid>
                        <Grid item container>
                            <Typography variant="body2" gutterBottom>
                                {review.description}
                            </Typography>
                        </Grid>
                        <Grid item container>
                            <Typography variant="body2" gutterBottom>
                                Mark: {review.mark}/10
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    );
}