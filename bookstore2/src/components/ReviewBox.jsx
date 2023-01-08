import Grid from "@mui/material/Grid";
import {Paper, Rating, Typography} from "@mui/material";
import {Box} from "@mui/system";
import * as React from "react";
import {useWindowResize} from "./WindowResizer";


export default function ReviewBox({review, title}){

    const size = useWindowResize()

    const StyledPaper = {
        p: 1,
        margin: 4,
        gridTemplateRows: "1fr auto",
        gridGap: "8px",
        height: "100%",
        flexGrow: 1,
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"}
    }

    const StyledBox = {
        overflow: "auto",
        maxWidth: size[0],
        marginBottom: 5
    }

    const StyledTypography = {
        color: 'inherit',
        textDecoration: 'none',
    }

    return(
        <Grid item>
            <Paper
                key={review.reviewId}
                sx={StyledPaper}>
                <Box sx={StyledBox}>
                    <Grid container spacing={2}>
                        <Grid item container>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="a"
                                sx={StyledTypography}>
                                {title ? review.bookHeader.bookTitle  : review.user.name}
                            </Typography>
                        </Grid>
                        <Grid item container>
                            <Typography variant="body2" gutterBottom>
                                {review.description}
                            </Typography>
                        </Grid>
                        <Grid item container>
                            <Rating name="read-only" value={review.mark} max={10} readOnly/>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    );
}