import Grid from "@mui/material/Grid";
import {Paper, Rating, Typography} from "@mui/material";
import * as React from "react";

const StyledPaper = {
    p: 3,
    flexGrow: 1,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
    overflow: "auto",
    marginBottom: 5
}

const GridItem = {
    marginBottom: 3
}

export default function ReviewBox({review, title, user}) {

    return (
        <Grid container>
            <Paper
                key={review.reviewId}
                sx={StyledPaper}>

                <Grid item sx={GridItem}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="a">
                        {user ? review.user.login : ""}
                    </Typography>
                </Grid>

                <Grid item sx={GridItem}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="a">
                        {title ? review.bookHeader.bookTitle : review.user.name}
                    </Typography>
                </Grid>

                <Grid item sx={GridItem}>
                    <Typography variant="body2" gutterBottom>
                        {review.description}
                    </Typography>
                </Grid>

                <Grid item container sx={{flexDirection: "row-reverse"}}>
                    <Rating name="read-only" value={1} max={1} readOnly/> {review.mark}/10
                </Grid>

            </Paper>
        </Grid>
    );
}