import {Button, Container, Tab, Tabs, Typography} from "@mui/material";
import * as React from "react";
import HomePageMenu from "../components/HomePageMenu";
import {Box} from "@mui/system";
import {useCallback, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Context from "../context/context";
import BookDescriptionTab from "../components/book/BookDescriptionTab";
import BookMoreDetailsTab from "../components/book/BookMoreDetailsTab";
import BookReviewsTab from "../components/book/BookReviewsTab";
import BookDetailsPhoto from "../components/book/BookDetailsPhoto";
import BookParameters from "../components/book/BookParameters";
import {config} from "../config";
import {GlobalStyles} from "@mui/joy";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tab panel-${index}`,
    };
}

const MainBoxStyle = {
    flexGrow: 1,
}

const BoxStyle = {
    display: "grid",
    marginTop: 15
}

const TypographyStyle = {
    margin: 2,
    marginTop: 4
}

const ButtonStyle = {
    margin: 2,
    backgroundColor: "#000",
    color: "white"
}

const TabBoxStyle = {
    borderBottom: 1,
    borderColor: 'divider'
}

export default function BookDetails() {

    let {bookHeaderId} = useParams();

    const [value, setValue] = React.useState(0);
    const [book, setBook] = React.useState([]);

    const ctx = useContext(Context);

    const getBooksSearch = useCallback(() => {
        const xHttp = new XMLHttpRequest();
        let json;
        let obj;

        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xHttp.response;

                obj = JSON.parse(json);
                setBook(obj)

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xHttp.open(
            "GET",
            `${config.serverAddress}/api/bookstore/getBookWithDetails?bookHeaderId=${bookHeaderId}`,
            true,
            null,
            null
        );
        xHttp.send();

    }, [bookHeaderId]);

    useEffect(() => {
        getBooksSearch();
    }, [getBooksSearch]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleAddToCart() {
        ctx.checkTokenExpiration()
        if (ctx.isLoggedIn)
            ctx.addItemToCart(bookHeaderId).then(() => {
            })
        else
            ctx.showErrorAlert("Login or Register to proceed this action")
    }

    return (
        <Box sx={MainBoxStyle}>

            <GlobalStyles
                styles={{
                    body: { backgroundColor: "#e8f5e9" },
                }}
            />

            <HomePageMenu/>

            <Container>

                <Box sx={BoxStyle}>

                    <Grid container sx={{alignItems: "center", justifyContent: "space-around"}} spacing={2}>

                        <BookDetailsPhoto icon={book.icon}/>

                        <Grid item>

                            <Typography sx={TypographyStyle} variant="h2">
                                {book.bookTitle}
                            </Typography>

                            <BookParameters book={book}/>

                            <Button sx={ButtonStyle} size="medium"
                                    variant="outlined"
                                    onClick={handleAddToCart}>Add to Cart</Button>

                        </Grid>
                    </Grid>

                </Box>


                <Box sx={TabBoxStyle}>
                    <Tabs scrollButtons="auto" variant="scrollable" value={value} onChange={handleChange}
                          aria-label="basic tabs example">
                        <Tab label="Description" {...a11yProps(0)} />
                        <Tab label="Details" {...a11yProps(1)} />
                        <Tab label="Marks" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <BookDescriptionTab value={value} book={book}/>

                <BookMoreDetailsTab value={value} book={book}/>

                <BookReviewsTab value={value} book={book}/>

            </Container>
        </Box>
    );

}