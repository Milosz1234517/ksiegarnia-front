import {Button, Tab, Tabs, Typography} from "@mui/material";
import * as React from "react";
import HomePageMenu from "../components/other/HomePageMenu";
import {Box} from "@mui/system";
import {useCallback, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Context from "../store/context";
import BookDescriptionTab from "../components/tabs/BookDescriptionTab";
import BookMoreDetailsTab from "../components/tabs/BookMoreDetailsTab";
import BookReviewsTab from "../components/tabs/BookReviewsTab";
import BookDetailsPhoto from "../components/book/BookDetailsPhoto";
import BookParameters from "../components/book/BookParameters";
import {useWindowResize} from "../components/other/WindowResizer";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tab panel-${index}`,
    };
}

export default function BookDetails() {

    let {bookHeaderId} = useParams();

    const [value, setValue] = React.useState(0);
    const [book, setBook] = React.useState([]);
    const [size] = useWindowResize();

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
            `http://localhost:8080/api/bookstore/getBookWithDetails?bookHeaderId=${bookHeaderId}`,
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
        ctx.addItemToCart(bookHeaderId).then(()=>{})
    }

    return (
        <Box sx={{flexGrow: 1, backgroundColor: "#e8f5e9"}}>
            <HomePageMenu/>

            <div>

                <Box sx={{display: "grid"}}>

                    <Grid container spacing={2}>

                        <BookDetailsPhoto size={size} icon={book.icon}/>

                        <Grid item xs sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>

                                    <Typography sx={{margin: 2, marginTop: 4}} variant="h2">
                                        {book.bookTitle}
                                    </Typography>

                                    <BookParameters book={book}/>

                                    <Button sx={{margin: 2, backgroundColor:"#000", color:"white"}} size="medium" variant="outlined"
                                            onClick={handleAddToCart}>Add to Cart</Button>

                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>


                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs scrollButtons="auto" variant="scrollable" value={value} onChange={handleChange}
                          aria-label="basic tabs example">
                        <Tab label="Description" {...a11yProps(0)} />
                        <Tab label="Details" {...a11yProps(1)} />
                        <Tab label="Marks" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <BookDescriptionTab value={value} book={book}/>

                <Box sx={{backgroundColor:"white"}}>
                    <BookMoreDetailsTab value={value} book={book}/>
                </Box>

                <BookReviewsTab value={value} book={book}/>

            </div>
        </Box>
    );

}