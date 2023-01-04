import Grid from "@mui/material/Grid";
import {Button, ButtonBase, Card, Paper, Typography} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {useContext, useEffect} from "react";
import Context from "../../store/context";
import {Box} from "@mui/system";
import {useWindowResize} from "../other/WindowResizer";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
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
    width: "80%",
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
    maxWidth: window.innerWidth * 0.4,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

const StyledAuthor = styled(Typography)(() => ({
    marginLeft: 10,
    display: "block",
    maxWidth: window.innerWidth * 0.4,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

const StyledAvailable = styled(Typography)(() => ({
    marginLeft: 10,
    marginBottom: 50,
    display: "block",
    maxWidth: window.innerWidth * 0.4,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

const StyledPrice = styled(Typography)(() => ({
    marginLeft: 10,
    marginTop: 20,
    display: "block",
    maxWidth: window.innerWidth * 0.4,
    textOverflow: "ellipsis",
    overflow: "hidden"
}));

export default function BookList({cards}) {

    const ctx = useContext(Context)

    const size = useWindowResize()

    useEffect(() => {
        ctx.checkTokenExpiration()
    });

    return (
        <StyledMainGrid container>

            {cards.map((cards) => {
                const {bookAuthors, bookHeaderId, icon, bookTitle, price, quantity} = cards;

                function handleAddToCart() {
                    if(ctx.isLoggedIn)
                        ctx.addItemToCart(bookHeaderId).then(() => {})
                    else
                        ctx.showErrorAlert("Login or Register to proceed this action")
                }

                return (
                    <StyledMainBox>

                        <Card key={bookHeaderId} sx={{
                            flexGrow: 1, p:4, display: "grid",
                            transition: "0.3s",
                            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                            "&:hover": {
                                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"}
                        }}>

                            <Box sx={{display: "grid"}}>

                                <Grid container spacing={2}>

                                    <Grid item>
                                        <ButtonBase sx={{height: size[1] * 0.3, width: size[0] * 0.3}} >
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


                                <Grid item xs>

                                    <StyledPrice align={"left"} variant="subtitle1" component="div">
                                        Price: {price}
                                    </StyledPrice>

                                    <StyledAvailable align={"left"} variant="body2" color="text.secondary">
                                        Available: {quantity}
                                    </StyledAvailable>

                                    <Button size="medium" variant="outlined" onClick={handleAddToCart}>
                                        Add to Cart
                                    </Button>

                                </Grid>
                            </Box>
                        </Card>
                    </StyledMainBox>
                );
            })}
        </StyledMainGrid>
    )
}