import Grid from "@mui/material/Grid";
import {Button, ButtonBase, Paper, Typography} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {useContext} from "react";
import Context from "../../store/context";
import {Box} from "@mui/system";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    alignSelf: "center",
});

const StyledMainGrid = styled(Grid)(() => ({
    display: "grid",
    margin: "auto",
    spacing: [1],
}));

const StyledMainBox = styled(Box)(() => ({
    margin: "auto",
    marginBottom: 20,
    marginTop: 20,
    display: "grid",
    width: "90%"
}));

const StyledTitleWrap = styled(Typography)(() => ({
    color: 'inherit',
    textDecoration: 'none',
    marginLeft: 10,
}));

const StyledTitle = styled(Typography)(() => ({
    color: 'inherit',
    textDecoration: 'none',
    display: "block",
    maxWidth: window.innerWidth * 0.7,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

const StyledAuthor = styled(Typography)(() => ({
    marginLeft: 10,
    display: "block",
    maxWidth: window.innerWidth * 0.7,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

const StyledAvailable = styled(Typography)(() => ({
    marginLeft: 10,
    marginBottom: 50,
    display: "block",
    maxWidth: window.innerWidth * 0.7,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

const StyledPrice = styled(Typography)(() => ({
    marginLeft: 10,
    marginTop: 20,
    display: "block",
    maxWidth: window.innerWidth * 0.7,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

export default function BookList({cards}) {

    const ctx = useContext(Context)

    return (
        <StyledMainGrid container>

            {cards.map((cards) => {
                const {authors, bookHeaderId, bookTitle, price, quantity} = cards;

                function handleAddToCart() {
                    ctx.addItemToCart(bookHeaderId)
                }

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
                                                 src="https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"/>
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
                                                    {authors.map((author) => {
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

                                    <Button size="medium" variant="outlined" onClick={handleAddToCart}>Add to
                                        Cart</Button>

                                </Grid>
                            </Box>
                        </Paper>
                    </StyledMainBox>
                );
            })}
        </StyledMainGrid>
    )
}