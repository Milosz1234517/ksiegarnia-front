import Grid from "@mui/material/Grid";
import {ButtonBase, Paper, Typography} from "@mui/material";
import * as React from "react";
import {Box} from "@mui/system";
import {styled} from "@mui/material/styles";

export const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    alignSelf: "center",
});

export const StyledMainGrid = styled(Grid)(() => ({
    display: "grid",
    margin: "auto",
    spacing: [1],
}));

export const StyledMainBox = styled(Box)(() => ({
    margin: "auto",
    marginBottom: 20,
    marginTop: 20,
    display: "grid",
    width: "90%"
}));

export const StyledTitleWrap = styled(Typography)(() => ({
    color: 'inherit',
    textDecoration: 'none',
    marginLeft: 10,
}));

export const StyledTitle = styled(Typography)(() => ({
    color: 'inherit',
    textDecoration: 'none',
    display: "block",
    maxWidth: window.innerWidth * 0.7,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

export const StyledAuthor = styled(Typography)(() => ({
    marginLeft: 10,
    display: "block",
    maxWidth: window.innerWidth * 0.7,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

export const StyledAvailable = styled(Typography)(() => ({
    marginLeft: 10,
    marginBottom: 50,
    display: "block",
    maxWidth: window.innerWidth * 0.7,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

export const StyledPrice = styled(Typography)(() => ({
    marginLeft: 10,
    marginTop: 20,
    display: "block",
    maxWidth: window.innerWidth * 0.7,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

export default function BookList({cards}) {

    return (
        <StyledMainGrid container>

            {cards.map((cards) => {
                const {bookAuthors, bookHeaderId, icon, bookTitle, price, quantity} = cards;

                return (
                    <StyledMainBox>

                        <Paper key={bookHeaderId} sx={{
                            flexGrow: 1, p:4, display: "grid",
                        }}>

                            <Box sx={{display: "grid"}}>

                                <Grid container spacing={2}>

                                    <Grid item>
                                        <ButtonBase sx={{width: 200, height: 200}}>
                                            <Img alt="complex"
                                                 src={icon}/>
                                        </ButtonBase>
                                    </Grid>

                                    <Grid item xs sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <StyledTitleWrap>
                                                    <StyledTitle
                                                        gutterBottom
                                                        variant="h6"
                                                        component={"a"}
                                                        href={`/product/${bookHeaderId}`}>
                                                        {bookTitle}
                                                    </StyledTitle>
                                                </StyledTitleWrap>

                                                <Typography variant="body2" gutterBottom>
                                                    {bookAuthors.map((author) => {
                                                        return (
                                                            <StyledAuthor variant="body2"
                                                                          color="text.secondary"
                                                                          align={"left"}>
                                                                {author.name} {author.surname}
                                                            </StyledAuthor>
                                                        )
                                                    })}
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>


                                <Grid item xs={6}>

                                    <StyledPrice align={"left"} variant="subtitle1" component="div">
                                        Price: {price}
                                    </StyledPrice>

                                    <StyledAvailable align={"left"} variant="body2" color="text.secondary">
                                        Available: {quantity}
                                    </StyledAvailable>

                                </Grid>
                            </Box>
                        </Paper>
                    </StyledMainBox>
                );
            })}
        </StyledMainGrid>
    )
}