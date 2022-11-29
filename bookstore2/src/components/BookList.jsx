import Grid from "@mui/material/Grid";
import {Button, ButtonBase, Paper, Typography} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {useContext} from "react";
import Context from "../store/context";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    alignSelf: "center",
});

export default function BookList({cards}){

    const ctx = useContext(Context)

    return(
        <Grid container spacing={1} sx={{
            display: "grid",
            margin: "auto",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "20px",
        }}>
            {cards.map((cards) => {
                const {authors, bookHeaderId, bookTitle, price, quantity} = cards;

                function handleAddToCart() {
                    ctx.addItemToCart(bookHeaderId)
                }

                return (
                    <Grid item>
                        <Paper
                            key={bookHeaderId}
                            sx={{
                                p: 1,
                                margin: 'auto',
                                maxWidth: 300,
                                gridTemplateRows: "1fr auto",
                                gridGap: "8px",
                                height: "100%",
                                minHeight: 150,
                                flexGrow: 1,
                            }}
                        >
                            <Grid container spacing={6}>
                                <Grid item>
                                    <ButtonBase sx={{width: 128, height: 128}}>
                                        <Img alt="complex"
                                             src="https://as2.ftcdn.net/v2/jpg/04/70/29/97/1000_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"/>
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}
                                          sx={{maxHeight: 10, height: "100%"}}>
                                        <Grid item xs>
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="a"
                                                href={`/product/${bookHeaderId}`}
                                                sx={{
                                                    color: 'inherit',
                                                    textDecoration: 'none',
                                                }}>
                                                {bookTitle}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {authors.map((author) => {
                                                    return (
                                                        <Typography Typography variant="body2"
                                                                    color="text.secondary"
                                                                    align={"left"}>
                                                            {author.name} {author.surname}
                                                        </Typography>
                                                    )
                                                })}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align={"left"} sx={{marginLeft: 1}} variant="subtitle1" component="div">
                                    Price: {price} zł
                                </Typography>

                                <Typography align={"left"} variant="body2" sx={{marginLeft: 1, marginBottom: 5}}
                                            color="text.secondary">
                                    Available: {quantity}
                                </Typography>
                                <Button size="medium" variant="outlined" onClick={handleAddToCart}>Add to
                                    Cart</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    )
}