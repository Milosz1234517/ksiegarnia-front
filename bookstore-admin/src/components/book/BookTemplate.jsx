import {ButtonBase, Paper, Typography} from "@mui/material";
import {Box} from "@mui/system";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {useState} from "react";

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

export default function BookTemplate() {

    const [bookTemplate] = useState({
        bookAuthors: [],
        bookTitle: "Click to Create",
        description: "Enter some description",
        edition: 0,
        icon: "https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-07-300x300.png",
        price: 0,
        publishingHouse: "",
        quantity: 0,
        releaseDate: "2000-01-01",
        bookCategories: []
    })

    const {bookAuthors, bookHeaderId, icon, bookTitle, price, quantity} = bookTemplate;

    return (
        <StyledMainGrid container>
            <StyledMainBox>

                <Paper key={bookHeaderId} sx={{
                    flexGrow: 1, p: 4, display: "grid",
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
                                                href={`/createBook`}>
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
        </StyledMainGrid>
    );
}