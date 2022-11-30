import {Button, ButtonBase, Pagination, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
import * as React from "react";
import HomePageMenu from "../components/HomePageMenu";
import {Box, Stack} from "@mui/system";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import {useCallback, useContext, useEffect} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Context from "../store/context";

import {useState, useLayoutEffect} from "react";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    alignSelf: "center",
});

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const useWindowResize = () => {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
};

export default function BookDetails() {

    let {bookHeaderId} = useParams();

    const [value, setValue] = React.useState(0);
    const [book, setBook] = React.useState([]);
    const [marks, setMarks] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [count, setCount] = React.useState(1);
    const [size] = useWindowResize();

    const ctx = useContext(Context);

    const getBooksSearch = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.response;

                obj = JSON.parse(json);
                setBook(obj)

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

    const getBookCount = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.response;

                obj = JSON.parse(json);
                setCount(Math.ceil(obj / 20));

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getReviewsForBookCount?bookHeaderId=${bookHeaderId}`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [bookHeaderId]);

    useEffect(() => {
        getBookCount();
    }, [getBookCount]);

    const getMarks = useCallback(() => {
        const xhttp = new XMLHttpRequest();
        let json;
        let obj;

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                json = xhttp.response;

                obj = JSON.parse(json);
                setMarks(obj)

            }
            if (this.readyState === 4 && this.status === 400) {
                console.log("No access.");
            }
        };

        xhttp.open(
            "GET",
            `http://localhost:8080/api/bookstore/getReviewsForBook?bookHeaderId=${bookHeaderId}&page=${page}`,
            true,
            null,
            null
        );
        xhttp.send();

    }, [bookHeaderId, page]);

    useEffect(() => {
        getMarks();
    }, [getMarks]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <HomePageMenu/>
            {book.map((book) => {
                const {
                    authors,
                    publishingHouse,
                    bookTitle,
                    price,
                    quantity,
                    edition,
                    releaseDate,
                    icon,
                    bookCategories
                } = book;

                function handleAddToCart() {
                    ctx.addItemToCart(bookHeaderId)
                }

                return (
                    <div>


                            <Box sx={{display: "grid"}}>

                                <Grid container spacing={2}>

                                    <Grid item>
                                        <ButtonBase
                                            sx={{
                                                display: "inline-block",
                                                scale: "90%",
                                                width: size[0],
                                                height: size[1],
                                                maxWidth: 700,
                                                maxHeight: 700
                                            }}>
                                            <Img alt="complex"
                                                 src={icon}/>
                                        </ButtonBase>
                                    </Grid>

                                    <Grid item xs sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>

                                                    <Typography sx={{margin: 2, marginTop: 4}} variant="h2">
                                                        {bookTitle}
                                                    </Typography>

                                                    <Typography sx={{margin: 2}} variant="h5">
                                                        Authors: {authors.map((author) => {
                                                        return (
                                                            <Typography Typography variant="body2"
                                                                        color="text.secondary"
                                                                        align={"left"}>
                                                                {author.name} {author.surname}
                                                            </Typography>)
                                                    })}
                                                    </Typography>

                                                    <Typography sx={{margin: 2}} variant="h5">
                                                        Publishing-house:
                                                        <Typography Typography variant="body2"
                                                                    color="text.secondary"
                                                                    align={"left"}>
                                                            {publishingHouse.name}
                                                        </Typography>
                                                    </Typography>

                                                    <Typography sx={{margin: 2}} variant="h5">
                                                        Quantity:
                                                        <Typography Typography variant="body2"
                                                                    color="text.secondary"
                                                                    align={"left"}>
                                                            {quantity}
                                                        </Typography>
                                                    </Typography>

                                                    <Typography sx={{margin: 2}} variant="h5">
                                                        Price:
                                                        <Typography Typography variant="body2"
                                                                    color="text.secondary"
                                                                    align={"left"}>
                                                            {price} zł
                                                        </Typography>
                                                    </Typography>

                                                    <Button sx={{margin: 2}} size="medium" variant="outlined" onClick={handleAddToCart}>Add to
                                                        Cart</Button>

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

                        <TabPanel value={value} index={0}>
                            <Box sx={{overflow: "auto", maxWidth: size[0], marginBottom: 10}}>
                                <Typography variant="body2"
                                            color="text.secondary"
                                            align={"left"}>
                                    {book.description}
                                </Typography>
                            </Box>
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <Box sx={{overflow: "auto", maxWidth: size[0]}}>
                                <Typography sx={{margin: 3}} Typography variant="h5">
                                    Authors: {authors.map((author) => {
                                    return (
                                        <Typography Typography variant="body2"
                                                    color="text.secondary"
                                                    align={"left"}>
                                            {author.name} {author.surname}
                                        </Typography>
                                    )
                                })}
                                </Typography>

                                <Typography sx={{margin: 3}} Typography variant="h5">
                                    Publishing-house:
                                    <Typography variant="body2"
                                                color="text.secondary"
                                                align={"left"}>
                                        {publishingHouse.name}
                                    </Typography>
                                </Typography>

                                <Typography sx={{margin: 3}} Typography variant="h5">
                                    Release Date:
                                    <Typography Typography variant="body2"
                                                color="text.secondary"
                                                align={"left"}>
                                        {releaseDate}
                                    </Typography>
                                </Typography>

                                <Typography sx={{margin: 3}} Typography variant="h5">
                                    Edition:
                                    <Typography Typography variant="body2"
                                                color="text.secondary"
                                                align={"left"}>
                                        {edition}
                                    </Typography>
                                </Typography>

                                <Typography sx={{margin: 3}} Typography variant="h5">
                                    Categories: {bookCategories.map((cat) => {
                                    return (
                                        <Typography Typography variant="body2"
                                                    color="text.secondary"
                                                    align={"left"}>
                                            {cat.description}
                                        </Typography>
                                    )
                                })}
                                </Typography>
                            </Box>

                        </TabPanel>

                        <TabPanel value={value} index={2}>

                            <Stack spacing={2}>
                                <Pagination count={count} page={page} onChange={handleChangePage} sx={{
                                    margin: "20px",
                                    alignSelf: "center"
                                }}/>
                            </Stack>

                            {marks.map((review) => {
                                const {description, mark, user} = review;
                                return (
                                    <Grid item>
                                        <Paper
                                            key={bookHeaderId}
                                            sx={{
                                                p: 1,
                                                margin: 4,
                                                gridTemplateRows: "1fr auto",
                                                gridGap: "8px",
                                                height: "100%",
                                                flexGrow: 1,
                                            }}
                                        >
                                            <Box sx={{overflow: "auto", maxWidth: size[0], marginBottom: 5}}>
                                                <Grid container spacing={2}>
                                                    <Grid item container>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h6"
                                                            component="a"
                                                            sx={{
                                                                color: 'inherit',
                                                                textDecoration: 'none',
                                                            }}>
                                                            {user.login}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container>
                                                        <Typography variant="body2" gutterBottom>
                                                            {description}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container>
                                                        <Typography variant="body2" gutterBottom>
                                                            Mark: {mark}/10
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </TabPanel>
                    </div>)
            })}
        </Box>
    );

}