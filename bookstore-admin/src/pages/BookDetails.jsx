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
import ChangeBookDetailsDialog from "../components/dialogs/ChangeBookDetailsDialog";

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
    const [bookChange, setBookChange] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [size] = useWindowResize();

    const getBooksSearch = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.response;

                obj = JSON.parse(json);
                setBook(obj)
                setBookChange(obj)

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getBookWithDetails?bookHeaderId=${bookHeaderId}`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [bookHeaderId]);

    useEffect(() => {
        getBooksSearch();
    }, [getBooksSearch]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{flexGrow: 1}}>

            <HomePageMenu/>

            {book.map((book) => {

                function handleEdit() {
                    setOpen(true)
                }

                return (
                    <div>
                        <ChangeBookDetailsDialog
                            book={book}
                            bookChange={bookChange}
                            open={open}
                            setBook={setBook}
                            setBookChange={setBookChange}
                            setOpen={setOpen}/>

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

                                            <Button sx={{margin: 2}} size="medium" variant="outlined"
                                                    onClick={handleEdit}>
                                                Edit
                                            </Button>

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

                        <BookMoreDetailsTab value={value} book={book}/>

                        <BookReviewsTab value={value} book={book}/>

                    </div>)
            })}
        </Box>
    );

}