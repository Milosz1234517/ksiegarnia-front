import Grid from "@mui/material/Grid";
import {Button, ButtonBase, Card, Typography} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {useContext} from "react";
import Context from "../../context/context";
import {Box} from "@mui/system";
import {useWindowResize} from "../WindowResizer";
import {BlackButton} from "../../App";
import {useNavigate} from "react-router-dom";

export default function BookList({cards}) {

    const ctx = useContext(Context)
    const size = useWindowResize()
    const navigate = useNavigate()

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
        width: "100%",
    }));

    const StyledTitle = styled(Typography)(() => ({
        color: 'inherit',
        marginLeft: 10,
        justifyContent:"left",
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

    const CardStyle = {
        flexGrow: 1, p: 4, display: "grid",
        transition: "0.3s",
        backgroundColor: "#e8f5e9",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    }

    const CardBoxStyle = {
        display: "grid"
    }

    const ButtonBaseStyle = {
        height: size[1] * 0.4,
        width: size[0] * 0.4
    }

    return (
        <StyledMainGrid container>

            {cards.map((cards) => {
                const {bookAuthors, bookHeaderId, icon, bookTitle, price, quantity} = cards;

                function handleAddToCart() {
                    ctx.checkTokenExpiration()
                    if (ctx.isLoggedIn)
                        ctx.addItemToCart(bookHeaderId).then(() => {
                        })
                    else
                        ctx.showErrorAlert("Login or Register to proceed this action")
                }

                return (
                    <StyledMainBox key={bookHeaderId}>

                        <Card sx={CardStyle}>

                            <Box sx={CardBoxStyle}>

                                <Grid container spacing={2}>

                                    <Grid item>
                                        <ButtonBase onClick={() => {
                                            navigate(`/product/${bookHeaderId}`)
                                        }}
                                                    sx={ButtonBaseStyle}>
                                            <Img alt="complex"
                                                 src={icon}/>
                                        </ButtonBase>
                                    </Grid>

                                    <Grid item xs sm container>
                                        <Grid item xs sx={{flexDirection: "row-reverse", alignContent: "center"}} container spacing={2}>
                                            <Grid item xs>
                                                <Box>
                                                    <StyledTitle
                                                        gutterBottom
                                                        variant="h4"
                                                        component={"a"}>
                                                        {bookTitle}
                                                    </StyledTitle>
                                                </Box>

                                                <Typography component={'span'} variant="body1" gutterBottom>
                                                    {bookAuthors.map((author) => {
                                                        return (
                                                            <StyledAuthor key={"author" + author.authorId} variant="h6"
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
                                    <StyledPrice align={"left"} variant="h6" component="span">
                                        Price: {price}
                                    </StyledPrice>

                                    <StyledAvailable component={'span'} align={"left"} variant="body1"
                                                     color="text.secondary">
                                        Available: {quantity}
                                    </StyledAvailable>

                                    <Button sx={BlackButton} size="medium" variant="outlined" onClick={handleAddToCart}>
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