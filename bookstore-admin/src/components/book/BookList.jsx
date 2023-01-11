import Grid from "@mui/material/Grid";
import {ButtonBase, Card, Typography} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/system";
import {useNavigate} from "react-router-dom";
import {config} from "../../config";
import {useWindowResize} from "../other/WindowResizer";

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
    justifyContent: "left",
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

const GridStyle = {
    margin: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "flex-start"
}

const GridStyleSketch = {
    margin: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "sketch"
}

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function BookList({cards}) {

    const navigate = useNavigate()
    const size = useWindowResize()

    const ButtonBaseStyle = {
        height: size[1] * 0.3,
        width: size[0] * 0.3,
        maxWidth: window.innerWidth * 0.3,
        maxHeight: window.innerHeight * 0.3
    }

    return (
        <StyledMainGrid container>

            {cards.map((cards) => {
                const {bookAuthors, bookHeaderId, icon, bookTitle, price, quantity} = cards;

                return (
                    <StyledMainBox key={bookHeaderId}>

                        <Card sx={CardStyle}>

                            <Grid container spacing={2}>

                                <Grid item xs sx={GridStyle} container spacing={2}>
                                    <ButtonBase onClick={() => {
                                        navigate(`/product/${bookHeaderId}`)
                                    }}
                                                sx={ButtonBaseStyle}>
                                        <Img alt="complex"
                                             src={icon}/>
                                    </ButtonBase>
                                </Grid>

                                <Grid item xs sx={GridStyleSketch} container spacing={2}>
                                    <StyledTitle
                                        gutterBottom
                                        variant="h4"
                                        component={"a"}>
                                        {bookTitle}
                                    </StyledTitle>

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

                                    <StyledPrice align={"left"} variant="h6" component="span">
                                        Price: {price.toFixed(2)}{config.currency}
                                    </StyledPrice>

                                    <StyledAvailable component={'span'} align={"left"} variant="body1"
                                                     color="text.secondary">
                                        Available: {quantity}
                                    </StyledAvailable>

                                </Grid>

                            </Grid>

                        </Card>
                    </StyledMainBox>
                );
            })}
        </StyledMainGrid>
    )
}